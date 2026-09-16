import type {
    ComputedPosition,
    ComputePositionOptions,
    PositionAlign,
    PositionPlacement,
    PositionSide,
    RectLike,
} from "../../types";

const OPPOSITE: Record<PositionSide, PositionSide> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
};

const ALL_SIDES: PositionSide[] = ["right", "left", "bottom", "top"];

export function parsePlacement(placement: PositionPlacement = "bottom start") {
    const [rawSide, rawAlign] = String(placement)
        .replace(/-/g, " ")
        .trim()
        .split(/\s+/);
    const side = (
        ["top", "bottom", "left", "right"].includes(rawSide)
            ? rawSide
            : "bottom"
    ) as PositionSide;
    let align = (rawAlign || "center") as PositionAlign;

    if (side === "top" || side === "bottom") {
        if (align === "left") align = "start";
        if (align === "right") align = "end";
        if (!["start", "center", "end"].includes(align)) align = "center";
    } else {
        if (align === "start") align = "top";
        if (align === "end") align = "bottom";
        if (!["top", "center", "bottom"].includes(align)) align = "center";
    }

    return { side, align };
}

function viewportRect(): RectLike {
    const vv = window.visualViewport;
    if (!vv) {
        return {
            top: 0,
            left: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    return {
        top: vv.offsetTop,
        left: vv.offsetLeft,
        right: vv.offsetLeft + vv.width,
        bottom: vv.offsetTop + vv.height,
        width: vv.width,
        height: vv.height,
    };
}

export function getBoundaryRect(boundary?: HTMLElement | null): RectLike {
    if (!boundary) return viewportRect();
    const rect = boundary.getBoundingClientRect();
    const left = rect.left + boundary.clientLeft;
    const top = rect.top + boundary.clientTop;
    return {
        top,
        left,
        right: left + boundary.clientWidth,
        bottom: top + boundary.clientHeight,
        width: boundary.clientWidth,
        height: boundary.clientHeight,
    };
}

function inset(rect: RectLike, padding: number): RectLike {
    const left = rect.left + padding;
    const top = rect.top + padding;
    const right = Math.max(left + 1, rect.right - padding);
    const bottom = Math.max(top + 1, rect.bottom - padding);
    return {
        top,
        left,
        right,
        bottom,
        width: right - left,
        height: bottom - top,
    };
}

function sizeOf(node: HTMLElement) {
    const rect = node.getBoundingClientRect();
    return {
        width: Math.max(1, node.offsetWidth || rect.width),
        height: Math.max(1, node.offsetHeight || rect.height),
    };
}

function parsePixel(value: string | undefined) {
    const parsed = Number.parseFloat(value ?? "");
    return Number.isFinite(parsed) ? parsed : 0;
}

function getAnchorRect(anchorNode: { getBoundingClientRect: () => DOMRect }) {
    const rect = anchorNode.getBoundingClientRect();

    if (
        typeof HTMLElement === "undefined" ||
        !(anchorNode instanceof HTMLElement)
    ) {
        return rect;
    }

    const transform = getComputedStyle(anchorNode).transform;
    if (!transform || transform === "none") return rect;

    const matrix = transform.match(/^matrix\(([^)]+)\)$/);
    if (!matrix) return rect;

    const [a = 1, b = 0, c = 0, d = 1, e = 0, f = 0] = matrix[1]
        .split(",")
        .map((value) => Number.parseFloat(value.trim()));
    if (
        Math.abs(b) > 0.001 ||
        Math.abs(c) > 0.001 ||
        Math.abs(e) > 0.001 ||
        Math.abs(f) > 0.001 ||
        a <= 0 ||
        d <= 0
    ) {
        return rect;
    }

    const width = anchorNode.offsetWidth;
    const height = anchorNode.offsetHeight;
    if (width <= 0 || height <= 0) return rect;

    const scaleX = a;
    const scaleY = d;
    const hasScale =
        Number.isFinite(scaleX) &&
        Number.isFinite(scaleY) &&
        (Math.abs(scaleX - 1) > 0.001 || Math.abs(scaleY - 1) > 0.001);

    if (!hasScale) return rect;

    const [originXValue, originYValue] =
        getComputedStyle(anchorNode).transformOrigin.split(" ");
    const originX = parsePixel(originXValue);
    const originY = parsePixel(originYValue);
    const left = rect.left - originX * (1 - scaleX);
    const top = rect.top - originY * (1 - scaleY);

    return new DOMRect(left, top, width, height);
}

function available(anchor: DOMRect, rect: RectLike, gap: number) {
    return {
        top: Math.max(0, anchor.top - rect.top - gap),
        bottom: Math.max(0, rect.bottom - anchor.bottom - gap),
        left: Math.max(0, anchor.left - rect.left - gap),
        right: Math.max(0, rect.right - anchor.right - gap),
    } satisfies Record<PositionSide, number>;
}

function sideOrder(preferred: PositionSide, fallbackSides?: PositionSide[]) {
    const result: PositionSide[] = [preferred];
    [...(fallbackSides ?? []), OPPOSITE[preferred], ...ALL_SIDES].forEach(
        (side) => {
            if (!result.includes(side)) result.push(side);
        },
    );
    return result;
}

function crossAxisMax(
    side: PositionSide,
    align: PositionAlign,
    anchor: DOMRect,
    rect: RectLike,
) {
    if (side === "top" || side === "bottom") {
        if (align === "start") return rect.right - anchor.left;
        if (align === "end") return anchor.right - rect.left;
        return rect.width;
    }

    if (align === "top") return rect.bottom - anchor.top;
    if (align === "bottom") return anchor.bottom - rect.top;
    return rect.height;
}

function sizeCaps(
    side: PositionSide,
    align: PositionAlign,
    anchor: DOMRect,
    rect: RectLike,
    avail: Record<PositionSide, number>,
) {
    if (side === "top" || side === "bottom") {
        return {
            maxWidth: Math.max(1, crossAxisMax(side, align, anchor, rect)),
            maxHeight: Math.max(1, avail[side]),
        };
    }

    return {
        maxWidth: Math.max(1, avail[side]),
        maxHeight: Math.max(1, crossAxisMax(side, align, anchor, rect)),
    };
}

function coords(
    anchor: DOMRect,
    width: number,
    height: number,
    side: PositionSide,
    align: PositionAlign,
    gap: number,
    crossOffset: number,
) {
    let top = 0;
    let left = 0;
    if (side === "bottom") top = anchor.bottom + gap;
    if (side === "top") top = anchor.top - height - gap;
    if (side === "right") left = anchor.right + gap;
    if (side === "left") left = anchor.left - width - gap;

    if (side === "top" || side === "bottom") {
        if (align === "start") left = anchor.left;
        else if (align === "end") left = anchor.right - width;
        else left = anchor.left + anchor.width / 2 - width / 2;
        left += crossOffset;
    } else {
        if (align === "top") top = anchor.top;
        else if (align === "bottom") top = anchor.bottom - height;
        else top = anchor.top + anchor.height / 2 - height / 2;
        top += crossOffset;
    }

    return { top, left };
}

function clamp(value: number, min: number, max: number) {
    if (max < min) return min;
    return Math.min(Math.max(value, min), max);
}

function areaVisible(
    point: { top: number; left: number },
    width: number,
    height: number,
    rect: RectLike,
) {
    const left = Math.max(point.left, rect.left);
    const top = Math.max(point.top, rect.top);
    const right = Math.min(point.left + width, rect.right);
    const bottom = Math.min(point.top + height, rect.bottom);
    return Math.max(0, right - left) * Math.max(0, bottom - top);
}

function mainSizeForSide(
    side: PositionSide,
    natural: { width: number; height: number },
) {
    return side === "top" || side === "bottom" ? natural.height : natural.width;
}

function alignForSide(side: PositionSide, align: PositionAlign): PositionAlign {
    if (side === "left" || side === "right") {
        if (align === "start" || align === "left") return "top";
        if (align === "end" || align === "right") return "bottom";
        if (align !== "top" && align !== "bottom") return "center";
        return align;
    }

    if (align === "top" || align === "left") return "start";
    if (align === "bottom" || align === "right") return "end";
    if (align !== "start" && align !== "end") return "center";
    return align;
}

function chooseSide(
    preferred: PositionSide,
    natural: { width: number; height: number },
    anchor: DOMRect,
    rect: RectLike,
    gap: number,
    shouldFlip: boolean,
    fallbackSides?: PositionSide[],
) {
    const avail = available(anchor, rect, gap);
    if (!shouldFlip) return { side: preferred, avail };

    const order = sideOrder(preferred, fallbackSides);
    const fitsNaturalSize = (side: PositionSide) =>
        avail[side] >= mainSizeForSide(side, natural);

    if (fitsNaturalSize(preferred)) return { side: preferred, avail };

    const fit = order.slice(1).find(fitsNaturalSize);
    if (fit) return { side: fit, avail };

    return {
        side: order.reduce((best, side) => {
            const bestSpace = avail[best];
            const sideSpace = avail[side];
            return sideSpace > bestSpace ? side : best;
        }, order[0]!),
        avail,
    };
}

export function computePosition(
    anchorNode: { getBoundingClientRect: () => DOMRect },
    floatingNode: HTMLElement,
    options: ComputePositionOptions = {},
): ComputedPosition {
    const {
        placement = "bottom start",
        gap = 8,
        crossOffset = 0,
        containerPadding = 8,
        shouldFlip = true,
        boundary = null,
        fallbackSides,
        arrowSize = 10,
        arrowGap = 0,
        showArrow = false,
    } = options;
    const parsed = parsePlacement(placement);
    const anchor = getAnchorRect(anchorNode);
    const boundaryRect = inset(getBoundaryRect(boundary), containerPadding);
    const arrowOffset = showArrow ? arrowSize / 2 + arrowGap : 0;
    const totalGap = gap + arrowOffset;
    const natural = sizeOf(floatingNode);
    const { side, avail } = chooseSide(
        parsed.side,
        natural,
        anchor,
        boundaryRect,
        totalGap,
        shouldFlip,
        fallbackSides,
    );
    const align = alignForSide(side, parsed.align);
    const caps = sizeCaps(side, align, anchor, boundaryRect, avail);
    const width = natural.width;
    const height = natural.height;
    const raw = coords(
        anchor,
        width,
        height,
        side,
        align,
        totalGap,
        crossOffset,
    );
    const shifted = shouldFlip
        ? {
              left: clamp(
                  raw.left,
                  boundaryRect.left,
                  boundaryRect.right - width,
              ),
              top: clamp(
                  raw.top,
                  boundaryRect.top,
                  boundaryRect.bottom - height,
              ),
          }
        : {
              left:
                  side === "top" || side === "bottom"
                      ? clamp(
                            raw.left,
                            boundaryRect.left,
                            boundaryRect.right - width,
                        )
                      : raw.left,
              top:
                  side === "left" || side === "right"
                      ? clamp(
                            raw.top,
                            boundaryRect.top,
                            boundaryRect.bottom - height,
                        )
                      : raw.top,
          };

    const visible = areaVisible(shifted, width, height, boundaryRect);
    const visibleRatio = visible / Math.max(1, width * height);
    const anchorCenterX = anchor.left + anchor.width / 2;
    const anchorCenterY = anchor.top + anchor.height / 2;
    const originX =
        side === "right"
            ? "0%"
            : side === "left"
              ? "100%"
              : `${clamp(((anchorCenterX - shifted.left) / width) * 100, 0, 100)}%`;
    const originY =
        side === "bottom"
            ? "0%"
            : side === "top"
              ? "100%"
              : `${clamp(((anchorCenterY - shifted.top) / height) * 100, 0, 100)}%`;

    return {
        top: shifted.top,
        left: shifted.left,
        side,
        align,
        maxWidth: caps.maxWidth,
        maxHeight: caps.maxHeight,
        originX,
        originY,
        arrowX: clamp(
            anchorCenterX - shifted.left,
            arrowSize + 6,
            width - arrowSize - 6,
        ),
        arrowY: clamp(
            anchorCenterY - shifted.top,
            arrowSize + 6,
            height - arrowSize - 6,
        ),
        arrowVisible: visibleRatio > 0.65,
    };
}

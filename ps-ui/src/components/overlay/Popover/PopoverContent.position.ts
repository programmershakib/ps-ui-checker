"use client";

import { type PositionPlacement, type PositionSide } from "../../../types";
import type { PopoverContextValue } from "./Popover.context";
import { computePosition } from "../../../utils/positioning";
import { useRafCallback } from "../../../hooks";
import {
    createVirtualAnchor,
    cssSize,
    px,
    resolveElement,
} from "./Popover.utils";
import {
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type RefObject,
} from "react";

interface UsePopoverContentPositionOptions {
    localRef: RefObject<HTMLElement | null>;
    popover: PopoverContextValue;
    mounted: boolean;
    placement: PositionPlacement;
    gap: number;
    crossOffset: number;
    arrowGap: number;
    arrowSize: number;
    showArrow: boolean;
    shouldFlip: boolean;
    fallbackSides?: PositionSide[];
    containerPadding: number;
    width?: number | string;
    matchTriggerWidth: boolean;
    minWidth?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    trackLayoutShift: boolean;
}

function initialSide(placement: PositionPlacement) {
    return (String(placement).split(/[ -]/)[0] as PositionSide) || "bottom";
}

function isScrollable(node: HTMLElement) {
    const style = getComputedStyle(node);
    return /(auto|scroll|overlay)/.test(
        `${style.overflow}${style.overflowX}${style.overflowY}`,
    );
}

function scrollParents(node: HTMLElement | null) {
    const parents = new Set<HTMLElement>();
    let current = node;

    while (current && current !== document.body) {
        if (isScrollable(current)) parents.add(current);
        current = current.parentElement;
    }

    const scrollingElement = document.scrollingElement;
    if (scrollingElement instanceof HTMLElement) {
        parents.add(scrollingElement);
    }

    return parents;
}

export function usePopoverContentPosition({
    localRef,
    popover,
    mounted,
    placement,
    gap,
    crossOffset,
    arrowGap,
    arrowSize,
    showArrow,
    shouldFlip,
    fallbackSides,
    containerPadding,
    width,
    matchTriggerWidth,
    minWidth,
    maxWidth,
    maxHeight,
    trackLayoutShift,
}: UsePopoverContentPositionOptions) {
    const [side, setSide] = useState<PositionSide>(() =>
        initialSide(placement),
    );
    const [positioned, setPositioned] = useState(false);
    const [positionStyle, setPositionStyle] = useState<CSSProperties>({});
    const sideRef = useRef(side);
    const positionedRef = useRef(false);
    const styleSignatureRef = useRef("");

    const updatePosition = useCallback(() => {
        if (!popover.open && positionedRef.current) return;

        const node = localRef.current;
        if (!node) return;

        const anchor = popover.contextPointRef.current
            ? createVirtualAnchor(popover.contextPointRef.current)
            : popover.triggerRef.current;
        if (!anchor) return;

        const previous = {
            display: node.style.display,
            visibility: node.style.visibility,
            width: node.style.width,
            minWidth: node.style.minWidth,
            maxWidth: node.style.maxWidth,
            maxHeight: node.style.maxHeight,
        };

        node.style.display = "block";
        node.style.visibility = "hidden";

        const anchorRect = anchor.getBoundingClientRect();
        const resolvedWidth = matchTriggerWidth ? anchorRect.width : width;

        node.style.width =
            resolvedWidth !== undefined ? (cssSize(resolvedWidth) ?? "") : "";
        node.style.minWidth = matchTriggerWidth
            ? (cssSize(resolvedWidth) ?? "")
            : minWidth !== undefined
              ? (cssSize(minWidth) ?? "")
              : "";
        node.style.maxWidth =
            maxWidth !== undefined ? (cssSize(maxWidth) ?? "") : "";
        node.style.maxHeight =
            maxHeight !== undefined ? (cssSize(maxHeight) ?? "") : "";

        const next = computePosition(anchor, node, {
            placement,
            gap,
            crossOffset,
            arrowGap,
            arrowSize,
            showArrow,
            shouldFlip,
            fallbackSides,
            containerPadding,
            boundary: resolveElement(popover.positioningRoot),
        });

        Object.assign(node.style, previous);

        const top = px(next.top);
        const left = px(next.left);
        const nextWidth = cssSize(resolvedWidth);
        const nextMinWidth = cssSize(
            matchTriggerWidth ? resolvedWidth : minWidth,
        );
        const nextMaxWidth = cssSize(maxWidth);
        const nextMaxHeight = cssSize(maxHeight);
        const origin = `${next.originX} ${next.originY}`;
        const resolvedArrowSize = `${arrowSize}px`;
        const resolvedArrowGap = `${arrowGap}px`;
        const arrowX = px(next.arrowX);
        const arrowY = px(next.arrowY);
        const nextStyle = {
            top,
            left,
            width: nextWidth,
            minWidth: nextMinWidth,
            maxWidth: nextMaxWidth,
            maxHeight: nextMaxHeight,
            "--ps-popover-origin": origin,
            "--ps-popover-arrow-size": resolvedArrowSize,
            "--ps-popover-arrow-gap": resolvedArrowGap,
            "--ps-popover-arrow-x": arrowX,
            "--ps-popover-arrow-y": arrowY,
        } as CSSProperties;
        const signature = [
            top,
            left,
            nextWidth,
            nextMinWidth,
            nextMaxWidth,
            nextMaxHeight,
            origin,
            resolvedArrowSize,
            resolvedArrowGap,
            arrowX,
            arrowY,
        ].join("|");

        if (sideRef.current !== next.side) {
            sideRef.current = next.side;
            setSide(next.side);
        }
        if (styleSignatureRef.current !== signature) {
            styleSignatureRef.current = signature;
            setPositionStyle(nextStyle);
        }
        if (!positionedRef.current) {
            positionedRef.current = true;
            setPositioned(true);
        }
    }, [
        arrowGap,
        arrowSize,
        containerPadding,
        crossOffset,
        fallbackSides,
        gap,
        localRef,
        matchTriggerWidth,
        maxHeight,
        maxWidth,
        minWidth,
        placement,
        popover.contextPointRef,
        popover.open,
        popover.positioningRoot,
        popover.triggerRef,
        shouldFlip,
        showArrow,
        width,
    ]);

    const { schedule, cancel } = useRafCallback(updatePosition);

    useLayoutEffect(() => {
        if (!mounted) return;

        updatePosition();
        const frame = window.requestAnimationFrame(updatePosition);

        if (!trackLayoutShift) {
            return () => {
                cancel();
                window.cancelAnimationFrame(frame);
            };
        }

        const scheduleUpdate = () => schedule();
        const observer =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(scheduleUpdate)
                : null;
        const boundary = resolveElement(popover.positioningRoot);
        const scrollTargets = new Set<EventTarget>([
            ...scrollParents(popover.triggerRef.current),
            ...scrollParents(boundary),
        ]);

        window.addEventListener("resize", scheduleUpdate, { passive: true });
        window.addEventListener("scroll", scheduleUpdate, {
            passive: true,
            capture: true,
        });
        scrollTargets.forEach((target) => {
            target.addEventListener("scroll", scheduleUpdate, {
                passive: true,
            });
        });
        window.visualViewport?.addEventListener("resize", scheduleUpdate, {
            passive: true,
        });
        window.visualViewport?.addEventListener("scroll", scheduleUpdate, {
            passive: true,
        });

        if (localRef.current) observer?.observe(localRef.current);
        if (popover.triggerRef.current)
            observer?.observe(popover.triggerRef.current);
        if (boundary) observer?.observe(boundary);

        return () => {
            cancel();
            window.cancelAnimationFrame(frame);
            window.removeEventListener("resize", scheduleUpdate);
            window.removeEventListener("scroll", scheduleUpdate, {
                capture: true,
            });
            scrollTargets.forEach((target) => {
                target.removeEventListener("scroll", scheduleUpdate);
            });
            window.visualViewport?.removeEventListener(
                "resize",
                scheduleUpdate,
            );
            window.visualViewport?.removeEventListener(
                "scroll",
                scheduleUpdate,
            );
            observer?.disconnect();
        };
    }, [
        cancel,
        localRef,
        mounted,
        popover.anchorVersion,
        popover.positioningRoot,
        popover.triggerRef,
        schedule,
        trackLayoutShift,
        updatePosition,
    ]);

    return { positioned, positionStyle, side };
}

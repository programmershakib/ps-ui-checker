"use client";

import { scrollShadowRecipe } from "./ScrollShadow.recipe";
import { useComposedRefs } from "../../../hooks";
import { cn } from "../../../utils";
import "./ScrollShadow.css";
import type {
    ScrollShadowProps,
    ScrollShadowSize,
    Visibility,
    VisibilityEdge,
} from "./ScrollShadow.types";
import {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";

const DEFAULT_SIZE = 40;
const DEFAULT_OFFSET = 0;

function resolveSize(value: ScrollShadowSize): string {
    return typeof value === "number" ? `${value}px` : value;
}

function computeEdges(
    el: HTMLElement,
    orientation: "vertical" | "horizontal",
    offset: number,
): Set<VisibilityEdge> {
    const edges = new Set<VisibilityEdge>();
    if (orientation === "vertical") {
        if (el.scrollTop > offset) edges.add("top");
        if (el.scrollTop + el.clientHeight < el.scrollHeight - offset) {
            edges.add("bottom");
        }
    } else {
        if (el.scrollLeft > offset) edges.add("left");
        if (el.scrollLeft + el.clientWidth < el.scrollWidth - offset) {
            edges.add("right");
        }
    }
    return edges;
}

function edgesToVisibility(
    edges: Set<VisibilityEdge>,
    orientation: "vertical" | "horizontal",
): Visibility {
    const [a, b] =
        orientation === "vertical"
            ? (["top", "bottom"] as const)
            : (["left", "right"] as const);
    const hasA = edges.has(a);
    const hasB = edges.has(b);
    if (hasA && hasB) return "both";
    if (hasA) return a;
    if (hasB) return b;
    return "none";
}

function forcedToEdges(
    visibility: Exclude<Visibility, "auto">,
    orientation: "vertical" | "horizontal",
): Set<VisibilityEdge> {
    if (visibility === "none") return new Set();
    if (visibility === "both") {
        return orientation === "vertical"
            ? new Set<VisibilityEdge>(["top", "bottom"])
            : new Set<VisibilityEdge>(["left", "right"]);
    }
    return new Set<VisibilityEdge>([visibility as VisibilityEdge]);
}

function hasSameEdges(a: Set<VisibilityEdge>, b: Set<VisibilityEdge>): boolean {
    if (a.size !== b.size) return false;
    for (const edge of a) {
        if (!b.has(edge)) return false;
    }
    return true;
}

const ScrollShadow = forwardRef<HTMLDivElement, ScrollShadowProps>(
    (
        {
            id,
            style,
            className,
            classNames,
            orientation = "vertical",
            variant = "default",
            size = DEFAULT_SIZE,
            scrollbarSize,
            offset = DEFAULT_OFFSET,
            barColor,
            arrowColor,
            hideScrollBar = false,
            enabled = true,
            visibility = "auto",
            onVisibilityChange,
            children,
            ...rest
        },
        ref,
    ) => {
        const contentRef = useRef<HTMLDivElement>(null);
        const composedRefs = useComposedRefs(ref, contentRef);
        const [edges, setEdges] = useState<Set<VisibilityEdge>>(new Set());
        const rafRef = useRef<number | undefined>(undefined);
        const lastReportedRef = useRef<Visibility | null>(null);
        const lastEdgesRef = useRef<Set<VisibilityEdge>>(new Set());

        const report = useCallback(
            (next: Visibility) => {
                if (lastReportedRef.current === next) return;
                lastReportedRef.current = next;
                onVisibilityChange?.(next);
            },
            [onVisibilityChange],
        );

        const measure = useCallback(() => {
            const el = contentRef.current;
            if (!el) return;
            const next = computeEdges(el, orientation, offset);
            if (!hasSameEdges(lastEdgesRef.current, next)) {
                lastEdgesRef.current = next;
                setEdges(next);
            }
            report(edgesToVisibility(next, orientation));
        }, [orientation, offset, report]);

        useEffect(() => {
            if (!enabled) {
                const reset = new Set<VisibilityEdge>();
                lastEdgesRef.current = reset;
                setEdges(reset);
                report("none");
                return;
            }

            if (visibility !== "auto") {
                const forced = forcedToEdges(visibility, orientation);
                lastEdgesRef.current = forced;
                setEdges(forced);
                report(visibility);
                return;
            }

            const el = contentRef.current;
            if (!el) return;

            const scheduleMeasure = () => {
                if (rafRef.current !== undefined) return;
                rafRef.current = requestAnimationFrame(() => {
                    rafRef.current = undefined;
                    measure();
                });
            };

            const resizeObserver = new ResizeObserver(scheduleMeasure);
            resizeObserver.observe(el);
            for (const child of el.children) {
                resizeObserver.observe(child);
            }
            measure();

            const mutationObserver = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement) {
                            resizeObserver.observe(node);
                        }
                    });
                    mutation.removedNodes.forEach((node) => {
                        if (node instanceof HTMLElement) {
                            resizeObserver.unobserve(node);
                        }
                    });
                }
                scheduleMeasure();
            });
            mutationObserver.observe(el, { childList: true });

            el.addEventListener("scroll", scheduleMeasure, { passive: true });

            return () => {
                el.removeEventListener("scroll", scheduleMeasure);
                resizeObserver.disconnect();
                mutationObserver.disconnect();
                if (rafRef.current !== undefined) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = undefined;
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [enabled, visibility, orientation, offset, measure]);

        const shadowSize = resolveSize(size);

        const resolvedScrollbarSize = hideScrollBar
            ? "0px"
            : resolveSize(scrollbarSize ?? (variant === "minimal" ? 8 : 10));

        const scrollCssVars = {
            "--ps-scroll-shadow-scrollbar-size": resolvedScrollbarSize,
            ...(barColor !== undefined && {
                "--ps-scroll-shadow-thumb": barColor,
            }),
            ...(arrowColor !== undefined && {
                "--ps-scroll-shadow-arrow": arrowColor,
            }),
        } as CSSProperties;

        return (
            <div
                id={id}
                style={{ ...style, ...scrollCssVars }}
                className={cn(
                    scrollShadowRecipe({ orientation, variant }),
                    className,
                    classNames?.base,
                )}
            >
                <div
                    {...rest}
                    ref={composedRefs}
                    className={cn(
                        "ps-scroll-shadow__content",
                        hideScrollBar &&
                            "ps-scroll-shadow__content--hide-scrollbar",
                        classNames?.content,
                    )}
                >
                    {children}
                </div>

                {enabled && orientation === "vertical" && (
                    <>
                        <span
                            aria-hidden="true"
                            data-visible={edges.has("top") || undefined}
                            style={{ height: shadowSize }}
                            className="ps-scroll-shadow__shadow ps-scroll-shadow__shadow--top"
                        />
                        <span
                            aria-hidden="true"
                            data-visible={edges.has("bottom") || undefined}
                            style={{ height: shadowSize }}
                            className="ps-scroll-shadow__shadow ps-scroll-shadow__shadow--bottom"
                        />
                    </>
                )}

                {enabled && orientation === "horizontal" && (
                    <>
                        <span
                            aria-hidden="true"
                            data-visible={edges.has("left") || undefined}
                            style={{ width: shadowSize }}
                            className="ps-scroll-shadow__shadow ps-scroll-shadow__shadow--left"
                        />
                        <span
                            aria-hidden="true"
                            data-visible={edges.has("right") || undefined}
                            style={{ width: shadowSize }}
                            className="ps-scroll-shadow__shadow ps-scroll-shadow__shadow--right"
                        />
                    </>
                )}
            </div>
        );
    },
);

const MemoizedScrollShadow = memo(ScrollShadow);

MemoizedScrollShadow.displayName = "ScrollShadow";

export default MemoizedScrollShadow;

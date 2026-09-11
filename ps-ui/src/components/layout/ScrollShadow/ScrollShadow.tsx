"use client";

import type { ScrollShadowProps } from "./ScrollShadow.types";
import { scrollShadowRecipe } from "./ScrollShadow.recipe";
import { cn } from "../../../utils/class-names/cn";
import "./ScrollShadow.css";
import {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

type Edge = "top" | "bottom" | "left" | "right";
type Visibility =
    | "auto"
    | "both"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "none";

const DEFAULT_SIZE = 40;
const DEFAULT_OFFSET = 0;

function computeEdges(
    el: HTMLElement,
    orientation: "vertical" | "horizontal",
    offset: number,
): Set<Edge> {
    const edges = new Set<Edge>();
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
    edges: Set<Edge>,
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
): Set<Edge> {
    if (visibility === "none") return new Set();
    if (visibility === "both") {
        return orientation === "vertical"
            ? new Set<Edge>(["top", "bottom"])
            : new Set<Edge>(["left", "right"]);
    }
    return new Set<Edge>([visibility as Edge]);
}

const ScrollShadow = forwardRef<HTMLDivElement, ScrollShadowProps>(
    (
        {
            id,
            style,
            className,
            classNames,
            orientation = "vertical",
            size = DEFAULT_SIZE,
            offset = DEFAULT_OFFSET,
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
        const [edges, setEdges] = useState<Set<Edge>>(new Set());
        const rafRef = useRef<number | undefined>(undefined);
        const lastReportedRef = useRef<Visibility | null>(null);

        const setRefs = (node: HTMLDivElement | null) => {
            contentRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
        };

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
            setEdges(next);
            report(edgesToVisibility(next, orientation));
        }, [orientation, offset, report]);

        useEffect(() => {
            if (!enabled) {
                setEdges(new Set());
                return;
            }

            if (visibility !== "auto") {
                const forced = forcedToEdges(visibility, orientation);
                setEdges(forced);
                report(visibility);
                return;
            }

            const el = contentRef.current;
            if (!el) return;

            const handleScroll = () => {
                if (rafRef.current !== undefined) return;
                rafRef.current = requestAnimationFrame(() => {
                    rafRef.current = undefined;
                    measure();
                });
            };

            measure();
            el.addEventListener("scroll", handleScroll, { passive: true });

            const resizeObserver = new ResizeObserver(measure);
            resizeObserver.observe(el);

            return () => {
                el.removeEventListener("scroll", handleScroll);
                resizeObserver.disconnect();
                if (rafRef.current !== undefined) {
                    cancelAnimationFrame(rafRef.current);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [enabled, visibility, orientation, offset, measure]);

        const shadowSize = typeof size === "number" ? `${size}px` : size;

        return (
            <div
                id={id}
                style={style}
                className={cn(
                    scrollShadowRecipe({ orientation }),
                    className,
                    classNames?.base,
                )}
            >
                <div
                    {...rest}
                    ref={setRefs}
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

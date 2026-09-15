"use client";

import type { RippleProps, RippleItem } from "./Ripple.types";
import { cn, resolveColor } from "../../../utils";
import "./Ripple.css";
import {
    memo,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";

const DEFAULT_MAX_RIPPLES = 6;
const DEFAULT_DURATION = 600;
const DEFAULT_OPACITY = 0.35;
const DEFAULT_EASING = "ease-out";
const CLEANUP_BUFFER_MS = 120;
const RIPPLE_HOST_SELECTOR = '[data-ps-ripple-host="true"]';

const TEXT_INPUT_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

function isInteractionDisabled(target: HTMLElement): boolean {
    if ("disabled" in target && (target as HTMLButtonElement).disabled)
        return true;
    if (target.getAttribute("aria-disabled") === "true") return true;
    if (target.closest('[data-ripple-disabled="true"]')) return true;
    return false;
}

const Ripple = ({
    id,
    style,
    className,
    color,
    maxRipples = DEFAULT_MAX_RIPPLES,
    duration = DEFAULT_DURATION,
    opacity = DEFAULT_OPACITY,
    centered = false,
    easing = DEFAULT_EASING,
    containerRef,
    disabled = false,
}: RippleProps) => {
    const hostRef = useRef<HTMLSpanElement>(null);
    const idCounterRef = useRef(0);
    const timersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());
    const ripplesRef = useRef<RippleItem[]>([]);
    const [ripples, setRipples] = useState<RippleItem[]>([]);

    const safeMax =
        Number.isFinite(maxRipples) && maxRipples > 0
            ? Math.floor(maxRipples)
            : DEFAULT_MAX_RIPPLES;
    const safeDuration =
        Number.isFinite(duration) && duration >= 0
            ? duration
            : DEFAULT_DURATION;
    const safeOpacity = Number.isFinite(opacity)
        ? Math.min(Math.max(opacity, 0), 1)
        : DEFAULT_OPACITY;

    const removeRipple = useCallback((rippleId: number) => {
        const timer = timersRef.current.get(rippleId);
        if (timer !== undefined) {
            clearTimeout(timer);
            timersRef.current.delete(rippleId);
        }
        ripplesRef.current = ripplesRef.current.filter(
            (r) => r.id !== rippleId,
        );
        setRipples(ripplesRef.current);
    }, []);

    useLayoutEffect(() => {
        const target =
            containerRef?.current ?? hostRef.current?.parentElement ?? null;
        if (!target || disabled) return undefined;

        if (target.dataset.psRippleHost === "true") {
            return undefined;
        }

        target.dataset.psRippleHost = "true"; // eslint-disable-line react-hooks/immutability -- mutating the host DOM node's dataset is intentional, not React state

        const computedStyle = getComputedStyle(target);
        const originalPosition = target.style.position;
        const originalIsolation = target.style.isolation;
        const patchedPosition = computedStyle.position === "static";
        const patchedIsolation = computedStyle.isolation !== "isolate";

        if (patchedPosition) target.style.position = "relative";
        if (patchedIsolation) target.style.isolation = "isolate";

        if (hostRef.current && target.firstChild !== hostRef.current) {
            target.insertBefore(hostRef.current, target.firstChild);
        }

        const spawnRipple = (localX: number, localY: number, rect: DOMRect) => {
            if (rect.width <= 0 || rect.height <= 0) return;

            const originX = centered ? rect.width / 2 : localX;
            const originY = centered ? rect.height / 2 : localY;
            const radius = Math.hypot(
                Math.max(originX, rect.width - originX),
                Math.max(originY, rect.height - originY),
            );
            const size = radius * 2;
            const rippleId = ++idCounterRef.current;

            let nextRipples = [
                ...ripplesRef.current,
                {
                    id: rippleId,
                    x: originX - radius,
                    y: originY - radius,
                    size,
                },
            ];

            if (nextRipples.length > safeMax) {
                const evicted = nextRipples.slice(
                    0,
                    nextRipples.length - safeMax,
                );

                evicted.forEach((item) => {
                    const evictedTimer = timersRef.current.get(item.id);
                    if (evictedTimer !== undefined) {
                        clearTimeout(evictedTimer);
                        timersRef.current.delete(item.id);
                    }
                });

                nextRipples = nextRipples.slice(nextRipples.length - safeMax);
            }

            ripplesRef.current = nextRipples;
            setRipples(nextRipples);

            const timer = setTimeout(
                () => removeRipple(rippleId),
                safeDuration + CLEANUP_BUFFER_MS,
            );
            timersRef.current.set(rippleId, timer);
        };

        const isHandledByNestedHost = (eventTarget: EventTarget | null) => {
            const nestedHost = (eventTarget as HTMLElement | null)?.closest(
                RIPPLE_HOST_SELECTOR,
            );
            return Boolean(nestedHost) && nestedHost !== target;
        };

        const handlePointerDown = (event: PointerEvent) => {
            if (event.button !== 0) return;
            if (isInteractionDisabled(target)) return;
            if (isHandledByNestedHost(event.target)) return;

            const rect = target.getBoundingClientRect();
            spawnRipple(
                event.clientX - rect.left,
                event.clientY - rect.top,
                rect,
            );
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.repeat) return;
            if (event.key !== "Enter" && event.key !== " ") return;
            if (event.ctrlKey || event.altKey || event.metaKey) return;
            const activeTag = (event.target as HTMLElement | null)?.tagName;
            if (activeTag && TEXT_INPUT_TAGS.has(activeTag)) return;
            if (isInteractionDisabled(target)) return;
            if (isHandledByNestedHost(event.target)) return;

            if (event.key === " ") event.preventDefault();

            const rect = target.getBoundingClientRect();
            spawnRipple(rect.width / 2, rect.height / 2, rect);
        };

        target.addEventListener("pointerdown", handlePointerDown, {
            passive: true,
        });
        target.addEventListener("keydown", handleKeyDown);

        const timers = timersRef.current;

        return () => {
            target.removeEventListener("pointerdown", handlePointerDown);
            target.removeEventListener("keydown", handleKeyDown);
            if (patchedPosition) target.style.position = originalPosition;
            if (patchedIsolation) target.style.isolation = originalIsolation;
            delete target.dataset.psRippleHost;

            timers.forEach((timer) => clearTimeout(timer));
            timers.clear();
            ripplesRef.current = [];
            setRipples([]);
        };
    }, [disabled, safeMax, safeDuration, centered, containerRef, removeRipple]);

    return (
        <span
            id={id}
            ref={hostRef}
            style={style}
            aria-hidden="true"
            className={cn("ps-ripple-container", className)}
        >
            {ripples.map(({ id: rippleId, x, y, size }) => (
                <span
                    key={rippleId}
                    style={
                        {
                            left: x,
                            top: y,
                            width: size,
                            height: size,
                            backgroundColor: color
                                ? resolveColor(color)
                                : "currentColor",
                            opacity: safeOpacity,
                            animationDuration: `${safeDuration}ms`,
                            animationTimingFunction: easing,
                        } as CSSProperties
                    }
                    className="ps-ripple"
                    onAnimationEnd={() => removeRipple(rippleId)}
                />
            ))}
        </span>
    );
};

const MemoizedRipple = memo(Ripple);

MemoizedRipple.displayName = "Ripple";

export default MemoizedRipple;

"use client";

import { memo, useId, type CSSProperties } from "react";
import type { SpinnerProps } from "./Spinner.types";
import { cn, resolveColor } from "../../../utils";
import type { Size } from "../../../types/common";
import { spinnerRecipe } from "./Spinner.recipe";
import "./Spinner.css";

const DEFAULT_SIZE: Size = "md";
const DEFAULT_SPEED = 1;
const MIN_SPEED = 0.1;
const MAX_SPEED = 10;

const BASE_DURATION: Record<string, number> = {
    default: 1.4,
    fade: 1,
    spinner: 0.75,
    swirling: 1.5,
    dots: 1.2,
};
const DOTS_MOVE_BASE_DURATION_S = 1;

const SPINNER_ICON_STROKE_WIDTH = 2;
const SWIRL_STROKE_WIDTH = 64;
const SWIRL_VIEWBOX_HALF = 400;
const SWIRL_EDGE_MARGIN = 4;
const SWIRL_RADIUS =
    SWIRL_VIEWBOX_HALF - SWIRL_STROKE_WIDTH / 2 - SWIRL_EDGE_MARGIN;

const DOT_POSITIONS = ["tl", "tr", "br", "bl"] as const;

const Spinner = ({
    id,
    style,
    className,
    variant = "default",
    color = "current",
    size = DEFAULT_SIZE,
    speed = DEFAULT_SPEED,
    reverse = false,
    label = "Spinner",
    strokeLinecap = "round",
    classNames,
}: SpinnerProps) => {
    const gradientBaseId = useId().replace(/:/g, "");

    const safeSpeed =
        Number.isFinite(speed) && speed > 0
            ? Math.min(Math.max(speed, MIN_SPEED), MAX_SPEED)
            : DEFAULT_SPEED;

    const resolvedColor = resolveColor(color);
    const duration = BASE_DURATION[variant] / safeSpeed;
    const isCustomSize = typeof size === "number";

    return (
        <span
            id={id}
            role="status"
            aria-label={label}
            style={{
                ...style,
                ...(isCustomSize ? { width: size, height: size } : {}),
            }}
            className={cn(
                !isCustomSize
                    ? spinnerRecipe({ size: size as Size })
                    : "ps-spinner",
                className,
            )}
        >
            {variant === "default" && (
                <svg
                    viewBox="0 0 50 50"
                    aria-hidden="true"
                    style={
                        { animationDuration: `${duration}s` } as CSSProperties
                    }
                    className={cn(
                        "ps-spinner__default",
                        reverse && "ps-spinner__default--reverse",
                        classNames?.default,
                    )}
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        style={
                            {
                                stroke: resolvedColor,
                                animationDuration: `${duration}s, ${duration * 3.7}s`,
                            } as CSSProperties
                        }
                        className="ps-spinner__default-circle"
                    />
                </svg>
            )}

            {variant === "fade" && (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    style={
                        {
                            color: resolvedColor,
                            animationDuration: `${duration}s`,
                        } as CSSProperties
                    }
                    className={cn(
                        "ps-spinner__fade",
                        reverse && "ps-spinner__fade--reverse",
                        classNames?.fade,
                    )}
                >
                    <defs>
                        <linearGradient
                            id={`${gradientBaseId}-leading`}
                            x1="50%"
                            x2="50%"
                            y1="5.271%"
                            y2="91.793%"
                        >
                            <stop offset="0%" stopColor="currentColor" />
                            <stop
                                offset="100%"
                                stopColor="currentColor"
                                stopOpacity="0.55"
                            />
                        </linearGradient>
                        <linearGradient
                            id={`${gradientBaseId}-trailing`}
                            x1="50%"
                            x2="50%"
                            y1="15.24%"
                            y2="87.15%"
                        >
                            <stop
                                offset="0%"
                                stopColor="currentColor"
                                stopOpacity="0"
                            />
                            <stop
                                offset="100%"
                                stopColor="currentColor"
                                stopOpacity="0.55"
                            />
                        </linearGradient>
                    </defs>
                    <g fill="none">
                        <path
                            d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
                            fill={`url(#${gradientBaseId}-leading)`}
                            transform="translate(1.5 1.625)"
                        />
                        <path
                            d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
                            fill={`url(#${gradientBaseId}-trailing)`}
                            transform="translate(1.5 1.625)"
                        />
                    </g>
                </svg>
            )}

            {variant === "spinner" && (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={resolvedColor}
                    strokeWidth={SPINNER_ICON_STROKE_WIDTH}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                    style={
                        { animationDuration: `${duration}s` } as CSSProperties
                    }
                    className={cn(
                        "ps-spinner__spinner",
                        reverse && "ps-spinner__spinner--reverse",
                        classNames?.spinner,
                    )}
                >
                    <path d="M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9" />
                </svg>
            )}

            {variant === "swirling" && (
                <svg
                    viewBox="0 0 800 800"
                    aria-hidden="true"
                    focusable="false"
                    style={
                        {
                            "--ps-spinner-swirl-duration": `${duration}s`,
                        } as CSSProperties
                    }
                    className={cn(
                        "ps-spinner__swirling",
                        reverse && "ps-spinner__swirling--reverse",
                        classNames?.swirling,
                    )}
                >
                    <circle
                        cx="400"
                        cy="400"
                        r={SWIRL_RADIUS}
                        fill="none"
                        stroke={resolvedColor}
                        strokeLinecap={strokeLinecap}
                        strokeWidth={SWIRL_STROKE_WIDTH}
                        className="ps-spinner__swirling-circle"
                    />
                </svg>
            )}

            {variant === "dots" && (
                <span
                    aria-hidden="true"
                    style={
                        { animationDuration: `${duration}s` } as CSSProperties
                    }
                    className={cn(
                        "ps-spinner__dots",
                        reverse && "ps-spinner__dots--reverse",
                        classNames?.dots,
                    )}
                >
                    {DOT_POSITIONS.map((position, index) => {
                        const moveDuration =
                            DOTS_MOVE_BASE_DURATION_S / safeSpeed;
                        return (
                            <i
                                key={position}
                                style={
                                    {
                                        backgroundColor: resolvedColor,
                                        animationDuration: `${moveDuration}s`,
                                        animationDelay: `${moveDuration * 0.4 * index}s`,
                                    } as CSSProperties
                                }
                                className={cn(
                                    "ps-spinner__dots-dot",
                                    `ps-spinner__dots-dot--${position}`,
                                )}
                            />
                        );
                    })}
                </span>
            )}
        </span>
    );
};

const MemoizedSpinner = memo(Spinner);

MemoizedSpinner.displayName = "Spinner";

export default MemoizedSpinner;

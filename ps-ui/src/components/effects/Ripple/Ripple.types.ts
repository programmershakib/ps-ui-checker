import type { CSSProperties, RefObject } from "react";
import type { Base, Color } from "../../../types";

export interface RippleItem {
    id: number;
    x: number;
    y: number;
    size: number;
}

export interface RippleProps extends Base {
    color?: Color | "current" | (string & {});

    maxRipples?: number;
    duration?: number;
    opacity?: number;

    centered?: boolean;

    easing?: CSSProperties["animationTimingFunction"];

    containerRef?: RefObject<HTMLElement | null>;

    disabled?: boolean;
}

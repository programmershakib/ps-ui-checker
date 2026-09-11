import type { Base, Color } from "../../../types/common";
import type { CSSProperties, RefObject } from "react";

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

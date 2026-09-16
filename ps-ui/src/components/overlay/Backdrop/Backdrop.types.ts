import type { CSSProperties } from "react";

export type OverlayBackdropVariant = "transparent" | "backdrop" | "opaque";

export interface BackdropProps {
    open?: boolean;
    variant?: OverlayBackdropVariant;
    opacity?: number | string;
    className?: string;
    style?: CSSProperties;
}

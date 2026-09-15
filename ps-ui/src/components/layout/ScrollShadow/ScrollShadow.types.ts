import type { HTMLAttributes, ReactNode } from "react";
import type { Base } from "../../../types";

type Orientation = "vertical" | "horizontal";

export type ScrollShadowVariant = "default" | "minimal";

export type VisibilityEdge = "top" | "bottom" | "left" | "right";

export type Visibility =
    | "auto"
    | "both"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "none";

export type ScrollShadowSize = number | (string & {});

interface ScrollShadowClassNames {
    base?: string;
    content?: string;
}

interface ScrollShadowOwnProps extends Base {
    orientation?: Orientation;

    variant?: ScrollShadowVariant;

    size?: ScrollShadowSize;

    scrollbarSize?: ScrollShadowSize;

    offset?: number;

    hideScrollBar?: boolean;

    enabled?: boolean;

    visibility?: Visibility;

    onVisibilityChange?: (visibility: Visibility) => void;

    barColor?: string;

    arrowColor?: string;

    children?: ReactNode;

    classNames?: ScrollShadowClassNames;
}

export interface ScrollShadowProps
    extends
        ScrollShadowOwnProps,
        Omit<HTMLAttributes<HTMLDivElement>, keyof ScrollShadowOwnProps> {}

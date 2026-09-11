import type { HTMLAttributes, ReactNode } from "react";
import type { Base } from "../../../types/common";

type Orientation = "vertical" | "horizontal";

type Visibility =
    | "auto"
    | "both"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "none";

type ScrollShadowSize = number | (string & {});

interface ScrollShadowClassNames {
    base?: string;
    content?: string;
}

interface ScrollShadowOwnProps extends Base {
    orientation?: Orientation;

    size?: ScrollShadowSize;

    offset?: number;

    hideScrollBar?: boolean;

    enabled?: boolean;

    visibility?: Visibility;

    onVisibilityChange?: (visibility: Visibility) => void;

    children?: ReactNode;

    classNames?: ScrollShadowClassNames;
}

export interface ScrollShadowProps
    extends
        ScrollShadowOwnProps,
        Omit<HTMLAttributes<HTMLDivElement>, keyof ScrollShadowOwnProps> {}

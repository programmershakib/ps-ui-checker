import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { Base, Color } from "../../../types/common";

type Variant = "solid" | "dashed" | "dotted";

type Orientation = "horizontal" | "vertical";

type ChildrenAlign = "start" | "center" | "end";

type Thickness = "thin" | "medium" | "thick" | number | (string & {});

interface DividerClassNames {
    base?: string;
    line?: string;
    label?: string;
}

interface DividerOwnProps extends Base {
    as?: ElementType;

    orientation?: Orientation;
    variant?: Variant;

    color?: Color | "current" | (string & {});
    thickness?: Thickness;

    inset?: boolean;

    children?: ReactNode;
    childrenAlign?: ChildrenAlign;

    classNames?: DividerClassNames;
}

export interface DividerProps
    extends
        DividerOwnProps,
        Omit<HTMLAttributes<HTMLElement>, keyof DividerOwnProps> {}

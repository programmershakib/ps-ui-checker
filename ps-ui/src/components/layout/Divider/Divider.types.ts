import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";
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
    orientation?: Orientation;
    variant?: Variant;

    color?: Color | "current" | (string & {});
    thickness?: Thickness;

    inset?: boolean;

    children?: ReactNode;
    childrenAlign?: ChildrenAlign;

    classNames?: DividerClassNames;
}

export type DividerProps<C extends ElementType = "div"> = DividerOwnProps & {
    as?: C;
} & Omit<ComponentPropsWithRef<C>, keyof DividerOwnProps | "as">;

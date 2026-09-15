import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { Base } from "../../../types";

interface VisuallyHiddenOwnProps extends Base {
    as?: ElementType;
    focusable?: boolean;
    children?: ReactNode;
}

export interface VisuallyHiddenProps
    extends
        VisuallyHiddenOwnProps,
        Omit<HTMLAttributes<HTMLElement>, keyof VisuallyHiddenOwnProps> {}

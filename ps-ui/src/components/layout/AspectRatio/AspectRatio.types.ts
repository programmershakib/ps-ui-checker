import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { Base } from "../../../types/common";

type AspectRatioValue = number | (string & {});

interface AspectRatioOwnProps extends Base {
    as?: ElementType;
    ratio?: AspectRatioValue;
    children?: ReactNode;
}

export interface AspectRatioProps
    extends
        AspectRatioOwnProps,
        Omit<HTMLAttributes<HTMLElement>, keyof AspectRatioOwnProps> {}

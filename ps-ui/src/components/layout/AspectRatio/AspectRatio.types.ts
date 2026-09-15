import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";
import type { Base } from "../../../types";

type AspectRatioValue = number | (string & {});

interface AspectRatioOwnProps extends Base {
    ratio?: AspectRatioValue;
    children?: ReactNode;
}

export type AspectRatioProps<C extends ElementType = "div"> =
    AspectRatioOwnProps & {
        as?: C;
    } & Omit<ComponentPropsWithRef<C>, keyof AspectRatioOwnProps | "as">;

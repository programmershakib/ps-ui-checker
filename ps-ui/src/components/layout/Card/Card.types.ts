import type { Base, RadiusScale, Shadow } from "../../../types";
import type {
    ComponentPropsWithRef,
    ElementType,
    HTMLAttributes,
    ReactNode,
} from "react";

type CardVariant = "transparent" | "default" | "secondary" | "tertiary";

interface CardOwnProps extends Base {
    variant?: CardVariant;

    radius?: RadiusScale | number | (string & {});

    border?: boolean;

    shadow?: Shadow;

    fullWidth?: boolean;

    children?: ReactNode;
}

export type CardProps<C extends ElementType = "div"> = CardOwnProps & {
    as?: C;
} & Omit<ComponentPropsWithRef<C>, keyof CardOwnProps | "as">;

export interface CardHeaderProps extends Base, HTMLAttributes<HTMLDivElement> {
    "data-slot"?: string;
}

export interface CardTitleProps
    extends Base, HTMLAttributes<HTMLHeadingElement> {
    "data-slot"?: string;
}

export interface CardDescriptionProps
    extends Base, HTMLAttributes<HTMLParagraphElement> {
    "data-slot"?: string;
}

export interface CardContentProps extends Base, HTMLAttributes<HTMLDivElement> {
    "data-slot"?: string;
}

export interface CardFooterProps extends Base, HTMLAttributes<HTMLDivElement> {
    "data-slot"?: string;
}

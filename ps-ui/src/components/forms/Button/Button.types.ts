import type { SpinnerVariant } from "../../feedback/Spinner/Spinner.types";
import type { Base, Color, Radius, Size } from "../../../types/common";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
    | "solid"
    | "bordered"
    | "shadow"
    | "text"
    | "flat"
    | "ghost";

type SpinnerPlacement = "start" | "end";

interface ButtonOwnProps extends Base {
    variant?: ButtonVariant;
    color?: Color;
    size?: Size;
    radius?: Radius;

    fullWidth?: boolean;
    iconOnly?: boolean;

    startContent?: ReactNode;
    endContent?: ReactNode;

    spinner?: ReactNode;
    spinnerVariant?: SpinnerVariant;
    spinnerColor?: Color | "current" | (string & {});
    spinnerSize?: Size | number | (string & {});
    spinnerPlacement?: SpinnerPlacement;

    loading?: boolean;

    disableAnimation?: boolean;
    disableRipple?: boolean;

    children?: ReactNode;
}

export interface ButtonProps
    extends
        ButtonOwnProps,
        Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> {}

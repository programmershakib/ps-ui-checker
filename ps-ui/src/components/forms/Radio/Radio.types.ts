import type { InputHTMLAttributes, ReactNode } from "react";
import type { Base, Color, Size } from "../../../types";

interface RadioClassNames {
    base?: string;
    wrapper?: string;
    label?: string;
    description?: string;
}

interface RadioOwnProps extends Base {
    value?: string;

    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;

    color?: Color;
    size?: Size;

    children?: ReactNode;
    childrenPlacement?: "start" | "end";

    description?: ReactNode;
    descriptionLayout?: "stacked" | "row" | "full";

    alignIndicator?: "start" | "center" | "end";

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    invalid?: boolean;

    disableAnimation?: boolean;

    classNames?: RadioClassNames;
}

export interface RadioProps
    extends
        RadioOwnProps,
        Omit<
            InputHTMLAttributes<HTMLInputElement>,
            keyof RadioOwnProps | "type" | "size"
        > {}

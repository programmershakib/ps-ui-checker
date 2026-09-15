import type { Base, Color, Radius, Size } from "../../../types";
import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxClassNames {
    base?: string;
    wrapper?: string;
    icon?: string;
    label?: string;
    description?: string;
}

interface CheckboxOwnProps extends Base {
    value?: string;

    color?: Color;
    size?: Size;
    radius?: Radius;

    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;

    lineThrough?: boolean;

    description?: ReactNode;

    descriptionLayout?: "stacked" | "row" | "full";

    alignIndicator?: "start" | "center" | "end";

    icon?:
        | ReactNode
        | ((state: { checked: boolean; indeterminate: boolean }) => ReactNode);

    children?: ReactNode;
    childrenPlacement?: "start" | "end";

    onChange?: (checked: boolean) => void;

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    invalid?: boolean;

    disableAnimation?: boolean;
    classNames?: CheckboxClassNames;
}

export interface CheckboxProps
    extends
        CheckboxOwnProps,
        Omit<
            InputHTMLAttributes<HTMLInputElement>,
            keyof CheckboxOwnProps | "type" | "size"
        > {}

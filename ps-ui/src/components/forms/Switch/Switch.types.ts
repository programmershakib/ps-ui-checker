import type { Base, Color, Size } from "../../../types/common";
import type { InputHTMLAttributes, ReactNode } from "react";

interface SwitchClassNames {
    base?: string;
    wrapper?: string;
    thumb?: string;
    label?: string;
    description?: string;
}

interface SwitchOwnProps extends Base {
    value?: string;

    color?: Color;
    size?: Size;

    checked?: boolean;
    defaultChecked?: boolean;

    startContent?: ReactNode;
    endContent?: ReactNode;
    thumbContent?: ReactNode | ((checked: boolean) => ReactNode);

    children?: ReactNode;
    childrenPlacement?: "start" | "end";

    description?: ReactNode;
    descriptionLayout?: "stacked" | "row" | "full";

    alignIndicator?: "start" | "center" | "end";

    onChange?: (checked: boolean) => void;

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    invalid?: boolean;

    disableAnimation?: boolean;

    classNames?: SwitchClassNames;
}

export interface SwitchProps
    extends
        SwitchOwnProps,
        Omit<
            InputHTMLAttributes<HTMLInputElement>,
            keyof SwitchOwnProps | "type" | "size"
        > {}

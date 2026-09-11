import type { Base, Color, Size } from "../../../types/common";
import type { HTMLAttributes, ReactNode } from "react";
import type {
    ValidationError,
    ValidationResult,
} from "../../../types/validation";

interface RadioGroupClassNames {
    base?: string;
    wrapper?: string;
    label?: string;
    description?: string;
}

interface RadioGroupOwnProps extends Base {
    name?: string;

    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;

    color?: Color;
    size?: Size;

    orientation?: "horizontal" | "vertical";

    label?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    invalid?: boolean;

    errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);

    validate?: (value: string) => ValidationError | true | null | undefined;

    classNames?: RadioGroupClassNames;
}

export interface RadioGroupContextValue {
    name: string;
    value: string | null;
    onChange: (value: string) => void;

    color: Color;
    size: Size;

    disabled: boolean;
    readOnly: boolean;
    required: boolean;
    invalid: boolean;
}

export interface RadioGroupProps
    extends
        RadioGroupOwnProps,
        Omit<
            HTMLAttributes<HTMLDivElement>,
            keyof RadioGroupOwnProps | "onChange"
        > {}

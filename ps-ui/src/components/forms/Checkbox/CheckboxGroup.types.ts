import type { Base, Color, Size } from "../../../types/common";
import type { HTMLAttributes, ReactNode } from "react";
import type {
    ValidationError,
    ValidationResult,
} from "../../../types/validation";

interface CheckboxGroupClassNames {
    base?: string;
    wrapper?: string;
    label?: string;
    description?: string;
}

interface CheckboxGroupOwnProps extends Base {
    name?: string;

    value?: string[];
    defaultValue?: string[];
    onChange?: (value: string[]) => void;

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

    validate?: (value: string[]) => ValidationError | true | null | undefined;

    classNames?: CheckboxGroupClassNames;
}

export interface CheckboxGroupContextValue {
    value: string[];
    onChange: (value: string[]) => void;

    color: Color;
    size: Size;

    disabled: boolean;
    readOnly: boolean;
    required: boolean;
    invalid: boolean;
}

export interface CheckboxGroupProps
    extends
        CheckboxGroupOwnProps,
        Omit<
            HTMLAttributes<HTMLDivElement>,
            keyof CheckboxGroupOwnProps | "onChange"
        > {}

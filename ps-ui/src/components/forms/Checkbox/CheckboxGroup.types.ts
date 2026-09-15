import type { HTMLAttributes, ReactNode } from "react";
import type {
    Base,
    Color,
    Size,
    ValidationError,
    ValidationResult,
} from "../../../types";

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

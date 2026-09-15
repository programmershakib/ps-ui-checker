import type { ValidationError, ValidationResult } from "../../types";
import type { ReactNode } from "react";
import { useMemo } from "react";

interface UseGroupValidationOptions<T> {
    value: T | null | undefined;
    invalid?: boolean;
    validate?: (value: T) => ValidationError | true | null | undefined;
    errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
}

interface UseGroupValidationResult {
    isInvalid: boolean;
    resolvedErrorMessage: ReactNode | undefined;
}

export function useGroupValidation<T>({
    value,
    invalid = false,
    validate,
    errorMessage,
}: UseGroupValidationOptions<T>): UseGroupValidationResult {
    const validation = useMemo<ValidationResult>(() => {
        if (invalid) return { valid: false };
        if (value === null || value === undefined) return { valid: true };
        if (validate) {
            const result = validate(value);
            if (result === true || result === null || result === undefined) {
                return { valid: true };
            }
            return { valid: false, error: result };
        }
        return { valid: true };
    }, [invalid, validate, value]);

    const resolvedErrorMessage = !validation.valid
        ? typeof errorMessage === "function"
            ? errorMessage(validation)
            : (errorMessage ?? validation.error)
        : undefined;

    return { isInvalid: !validation.valid, resolvedErrorMessage };
}

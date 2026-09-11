import type { ReactNode } from "react";

export type ValidationError = string | ReactNode;

export interface ValidationResult {
    valid: boolean;
    error?: ValidationError;
}

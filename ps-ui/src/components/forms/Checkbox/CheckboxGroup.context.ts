import type { CheckboxGroupContextValue } from "./CheckboxGroup.types";
import { createContext, useContext } from "react";

export const CheckboxGroupContext =
    createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext(): CheckboxGroupContextValue | null {
    return useContext(CheckboxGroupContext);
}

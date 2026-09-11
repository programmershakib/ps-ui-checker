import type { RadioGroupContextValue } from "./RadioGroup.types";
import { createContext, useContext } from "react";

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
    null,
);

export function useRadioGroupContext(): RadioGroupContextValue | null {
    return useContext(RadioGroupContext);
}

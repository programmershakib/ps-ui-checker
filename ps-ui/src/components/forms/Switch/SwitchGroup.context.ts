import type { SwitchGroupContextValue } from "./SwitchGroup.types";
import { createContext, useContext } from "react";

export const SwitchGroupContext = createContext<SwitchGroupContextValue | null>(
    null,
);

export function useSwitchGroupContext(): SwitchGroupContextValue | null {
    return useContext(SwitchGroupContext);
}

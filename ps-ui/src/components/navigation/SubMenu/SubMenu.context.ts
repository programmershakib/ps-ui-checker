import { createContext, useContext } from "react";
import type { TriggerType } from "../../../types";
import type { MutableRefObject } from "react";

export interface SubMenuChildRegistration {
    id: string;
    closeStack: () => number;
}

export interface SubMenuContextValue {
    id: string;
    open: boolean;
    openRef: MutableRefObject<boolean>;
    setOpen: (open: boolean, focus?: boolean) => void;
    trigger: TriggerType;
    openDelay: number;
    closeDelay: number;
    longPressDelay: number;
    longPressMoveThreshold: number;
    gap: number;
    crossOffset: number;
    triggerRef: MutableRefObject<HTMLElement | null>;
    setTriggerNode: (node: HTMLElement | null) => void;
    contentRef: MutableRefObject<HTMLElement | null>;
    focusOnOpenRef: MutableRefObject<boolean>;
    requestHoverOpen: () => void;
    closeStack: () => number;
    scheduleClose: () => void;
    cancelClose: () => void;
    cancelCloseTree: () => void;
    registerChildSubMenu: (submenu: SubMenuChildRegistration) => () => void;
}

export const SubMenuContext = createContext<SubMenuContextValue | null>(null);

export function useSubMenuContext(component: string) {
    const context = useContext(SubMenuContext);
    if (!context) throw new Error(`${component} must be used inside <SubMenu>`);
    return context;
}

export function useOptionalSubMenuContext() {
    return useContext(SubMenuContext);
}

import { createContext, useContext } from "react";
import type { MutableRefObject } from "react";
import type {
    ElementLike,
    NormalizedTriggerMode,
    TriggerType,
    PositionPlacement,
    PositionSide,
} from "../../../types";

export interface PopoverContextValue {
    open: boolean;
    openReason: NormalizedTriggerMode | "manual" | null;
    setOpen: (
        open: boolean,
        reason?: NormalizedTriggerMode | "manual",
        focus?: boolean,
    ) => void;
    openAtPoint: (point: { x: number; y: number }) => void;
    close: () => void;
    closeTree: () => void;
    trigger: TriggerType;
    openDelay: number;
    closeDelay: number;
    longPressDelay: number;
    longPressMoveThreshold: number;
    requestHoverOpen: () => void;
    scheduleHoverClose: () => void;
    cancelHoverClose: () => void;
    triggerRef: MutableRefObject<HTMLElement | null>;
    setTriggerNode: (node: HTMLElement | null) => void;
    contentRef: MutableRefObject<HTMLElement | null>;
    contextPointRef: MutableRefObject<{ x: number; y: number } | null>;
    anchorVersion: number;
    motionVersion: number;
    focusRequest: number;
    getLayerContainers: () => HTMLElement[];
    positioningRoot?: ElementLike;
    portalContainer?: ElementLike;
    registerLayer: (node: HTMLElement) => () => void;
    registerContentLayer: (node: HTMLElement) => () => void;
    isInside: (target: Node | null) => boolean;
}

export interface PopoverLayerContextValue {
    placement: PositionPlacement;
    side: PositionSide;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);
export const PopoverLayerContext =
    createContext<PopoverLayerContextValue | null>(null);

export function usePopoverContext(component: string) {
    const context = useContext(PopoverContext);
    if (!context) throw new Error(`${component} must be used inside <Popover>`);
    return context;
}

export function useOptionalPopoverContext() {
    return useContext(PopoverContext);
}

export function usePopoverLayerContext() {
    return useContext(PopoverLayerContext);
}

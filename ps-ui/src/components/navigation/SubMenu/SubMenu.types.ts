import type { Base, TriggerType, PositionPlacement } from "../../../types";
import type { PopoverContentProps } from "../../overlay/Popover";
import type { HTMLAttributes, ReactNode } from "react";

export interface SubMenuProps extends Omit<
    HTMLAttributes<HTMLSpanElement>,
    "children"
> {
    children: ReactNode;
    isOpen?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: TriggerType;
    openDelay?: number;
    closeDelay?: number;
    longPressDelay?: number;
    longPressMoveThreshold?: number;
    closeOnHoverLeave?: boolean;
    gap?: number;
    crossOffset?: number;
}

export interface SubMenuTriggerProps extends Base {
    children: ReactNode;
}

export interface SubMenuContentProps extends Omit<
    PopoverContentProps,
    "children"
> {
    children: ReactNode;
    placement?: PositionPlacement;
    gap?: number;
}

export interface SubMenuIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
    icon?: ReactNode;
}

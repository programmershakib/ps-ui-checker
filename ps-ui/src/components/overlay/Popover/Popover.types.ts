import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { OverlayBackdropVariant } from "../Backdrop";
import type {
    Base,
    ElementLike,
    RadiusScale,
    Shadow,
    Space,
    TriggerType,
    PositionPlacement,
    PositionSide,
} from "../../../types";

export type BackdropVariant = OverlayBackdropVariant;

export type PopoverPadding = Space | number | (string & {});

export interface PopoverProps extends Omit<
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
    closeOnInteractOutside?: boolean;
    closeOnEscape?: boolean;
    closeOnHoverLeave?: boolean;
    restoreFocusOnClose?: boolean;
    positioningRoot?: ElementLike;
    portalContainer?: ElementLike;
    backdrop?: boolean | BackdropVariant;
    backdropOpacity?: number | string;
}

export interface PopoverTriggerProps extends Base {
    children: ReactNode;
}

export interface PopoverContentProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
> {
    children: ReactNode;
    placement?: PositionPlacement;
    gap?: number;
    crossOffset?: number;
    arrowGap?: number;
    arrowSize?: number;
    showArrow?: boolean;
    shouldFlip?: boolean;
    fallbackSides?: PositionSide[];
    containerPadding?: number;
    width?: number | string;
    matchTriggerWidth?: boolean;
    minWidth?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    padding: PopoverPadding;
    background?: string;
    radius?: RadiusScale | number | (string & {});
    shadow?: Shadow | (string & {});
    forceMount?: boolean;
    focusScope?: boolean;
    autoFocusOnOpen?: boolean;
    trackLayoutShift?: boolean;
    arrowClassName?: string;
    style?: CSSProperties;
}

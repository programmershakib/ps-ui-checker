export type PositionSide = "top" | "bottom" | "left" | "right";

export type PositionAlign =
    | "start"
    | "center"
    | "end"
    | "top"
    | "bottom"
    | "left"
    | "right";

export type PositionPlacement =
    | PositionSide
    | `${PositionSide} ${PositionAlign}`
    | `${PositionSide}-${PositionAlign}`;

export interface RectLike {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
}

export interface ComputePositionOptions {
    placement?: PositionPlacement;
    gap?: number;
    crossOffset?: number;
    containerPadding?: number;
    shouldFlip?: boolean;
    boundary?: HTMLElement | null;
    fallbackSides?: PositionSide[];
    arrowSize?: number;
    arrowGap?: number;
    showArrow?: boolean;
}

export interface ComputedPosition {
    top: number;
    left: number;
    side: PositionSide;
    align: PositionAlign;
    maxWidth: number;
    maxHeight: number;
    originX: string;
    originY: string;
    arrowX: number;
    arrowY: number;
    arrowVisible: boolean;
}

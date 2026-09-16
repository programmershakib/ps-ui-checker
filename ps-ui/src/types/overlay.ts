import type { RefObject } from "react";

export type TriggerMode =
    | "click"
    | "hover"
    | "longPress"
    | "context"
    | "contextMenu"
    | "rightClick"
    | "right-click"
    | "manual";

export type TriggerType = TriggerMode | "both" | readonly TriggerMode[];

export type NormalizedTriggerMode = "click" | "hover" | "longPress" | "context";

export type ElementLike =
    | HTMLElement
    | RefObject<HTMLElement | null>
    | (() => HTMLElement | null)
    | null
    | undefined;

import type { TriggerType } from "../../../types";
import type { ReactNode } from "react";
import type {
    PopoverContentProps,
    PopoverProps,
    PopoverTriggerProps,
} from "../Popover";

export interface TooltipProps extends Omit<PopoverProps, "trigger"> {
    trigger?: TriggerType;
}

export type TooltipTriggerProps = PopoverTriggerProps;

export interface TooltipContentProps extends Omit<
    PopoverContentProps,
    "children"
> {
    children: ReactNode;
}

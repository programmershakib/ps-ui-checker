import type { PopoverContentProps, PopoverProps } from "../Popover";
import type { TriggerType } from "../../../types";

export interface ContextMenuProps extends Omit<PopoverProps, "trigger"> {
    trigger?: TriggerType;
}

export type ContextMenuContentProps = Omit<PopoverContentProps, "role">;

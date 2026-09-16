import type { TriggerType } from "../../../types";
import type { PopoverProps } from "../Popover";

export interface DropdownProps extends Omit<PopoverProps, "trigger"> {
    trigger?: TriggerType;
}

"use client";

/* eslint-disable react-refresh/only-export-components */
import type { TooltipContentProps, TooltipProps } from "./Tooltip.types";
import { Popover } from "../Popover";
import { cn } from "../../../utils";
import "./Tooltip.css";

function TooltipRoot({
    trigger = "hover",
    openDelay = 450,
    closeDelay = 80,
    closeOnHoverLeave = true,
    children,
    ...props
}: TooltipProps) {
    return (
        <Popover
            {...props}
            trigger={trigger}
            openDelay={openDelay}
            closeDelay={closeDelay}
            closeOnHoverLeave={closeOnHoverLeave}
        >
            {children}
        </Popover>
    );
}

function TooltipContent({
    placement = "top",
    gap = 6,
    maxWidth = 280,
    className,
    role = "tooltip",
    focusScope = false,
    autoFocusOnOpen = false,
    children,
    ...props
}: TooltipContentProps) {
    return (
        <Popover.Content
            {...props}
            role={role}
            placement={placement}
            gap={gap}
            maxWidth={maxWidth}
            focusScope={focusScope}
            autoFocusOnOpen={autoFocusOnOpen}
            className={cn("ps-tooltip__content", className)}
        >
            {children}
        </Popover.Content>
    );
}

export const Tooltip = Object.assign(TooltipRoot, {
    Trigger: Popover.Trigger,
    Content: TooltipContent,
});

export default Tooltip;

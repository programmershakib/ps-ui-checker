"use client";

import { useMenuContext, useOptionalMenuItemContext } from "./Menu.context";
import type { MenuIndicatorProps, MenuItemRenderState } from "./Menu.types";
import { renderCustomIndicator } from "./Menu.utils";
import { CheckIcon, DotIcon } from "./Menu.icons";
import { cn } from "../../../utils";
import { forwardRef } from "react";

const fallbackState: MenuItemRenderState = {
    isSelected: false,
    isFocused: false,
    isDisabled: false,
    isPressed: false,
    isActive: false,
    hasSubmenu: false,
};

export const MenuIndicator = forwardRef<HTMLSpanElement, MenuIndicatorProps>(
    ({ className, variant, visible, children, ...props }, ref) => {
        const menu = useMenuContext("Menu.Indicator");
        const itemState = useOptionalMenuItemContext() ?? fallbackState;
        const indicatorVariant = variant ?? menu.selectionIndicator;
        if (indicatorVariant === "none") return null;

        const customIndicator = renderCustomIndicator(
            children ?? menu.selectionIndicatorIcon,
            itemState,
        );
        const isVisible = visible ?? itemState.isSelected;
        const content =
            customIndicator ??
            (indicatorVariant === "dot" ? <DotIcon /> : <CheckIcon />);

        return (
            <span
                {...props}
                ref={ref}
                className={cn("ps-menu__indicator", className)}
                data-slot="menu-indicator"
                data-visible={isVisible || undefined}
                aria-hidden="true"
            >
                {content}
            </span>
        );
    },
);

MenuIndicator.displayName = "Menu.Indicator";

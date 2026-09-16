"use client";

import type { MenuSeparatorProps } from "./Menu.types";
import { Divider } from "../../layout/Divider";
import { cn } from "../../../utils";
import { forwardRef } from "react";

export const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
    ({ id, className, style }, ref) => (
        <Divider
            id={id}
            ref={ref}
            orientation="horizontal"
            thickness={0.5}
            className={cn("ps-menu__separator", className)}
            style={style}
            role="separator"
            data-slot="menu-separator"
        />
    ),
);

MenuSeparator.displayName = "Menu.Separator";

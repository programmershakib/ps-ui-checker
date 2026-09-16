"use client";

import type { MenuHeaderProps } from "./Menu.types";
import { forwardRef } from "react";

export const MenuHeader = forwardRef<HTMLDivElement, MenuHeaderProps>(
    ({ children, id, className, style }, ref) => (
        <div
            id={id}
            ref={ref}
            className={className}
            style={style}
            role="presentation"
            data-slot="menu-header"
        >
            {children}
        </div>
    ),
);

MenuHeader.displayName = "Menu.Header";

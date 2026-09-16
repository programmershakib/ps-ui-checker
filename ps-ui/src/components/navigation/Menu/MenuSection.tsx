"use client";

import type { MenuSectionProps } from "./Menu.types";
import { MenuHeader } from "./MenuHeader";
import { forwardRef } from "react";

export const MenuSection = forwardRef<HTMLDivElement, MenuSectionProps>(
    ({ children, title, id, className, style }, ref) => (
        <div id={id} ref={ref} className={className} style={style} role="group">
            {title && <MenuHeader>{title}</MenuHeader>}
            {children}
        </div>
    ),
);

MenuSection.displayName = "Menu.Section";

"use client";

import type { SubMenuIndicatorProps } from "./SubMenu.types";
import { ChevronIcon } from "./SubMenu.icons";
import { cn } from "../../../utils";
import { forwardRef } from "react";

export const SubMenuIndicator = forwardRef<
    HTMLSpanElement,
    SubMenuIndicatorProps
>(({ icon, className, ...props }, ref) => (
    <span
        {...props}
        ref={ref}
        className={cn("ps-submenu__indicator", className)}
    >
        {icon ?? <ChevronIcon />}
    </span>
));

SubMenuIndicator.displayName = "SubMenu.Indicator";

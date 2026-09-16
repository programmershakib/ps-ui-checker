"use client";

/* eslint-disable react-refresh/only-export-components */
import { SubMenuIndicator } from "./SubMenuIndicator";
import { SubMenuContent } from "./SubMenuContent";
import { SubMenuTrigger } from "./SubMenuTrigger";
import { SubMenuRoot } from "./SubMenuRoot";
import "./SubMenu.css";

export { SubMenuContent, SubMenuIndicator, SubMenuRoot, SubMenuTrigger };

export const SubMenu = Object.assign(SubMenuRoot, {
    Trigger: SubMenuTrigger,
    Content: SubMenuContent,
    Indicator: SubMenuIndicator,
});

export default SubMenu;

"use client";

/* eslint-disable react-refresh/only-export-components */
import { MenuSeparator } from "./MenuSeparator";
import { MenuIndicator } from "./MenuIndicator";
import { MenuSection } from "./MenuSection";
import { MenuHeader } from "./MenuHeader";
import { MenuItem } from "./MenuItem";
import { MenuRoot } from "./MenuRoot";
import "./Menu.css";

export {
    MenuHeader,
    MenuIndicator,
    MenuItem,
    MenuRoot,
    MenuSection,
    MenuSeparator,
};

export const Menu = Object.assign(MenuRoot, {
    Item: MenuItem,
    Indicator: MenuIndicator,
    Section: MenuSection,
    Header: MenuHeader,
    Separator: MenuSeparator,
});

export default Menu;

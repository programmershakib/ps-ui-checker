"use client";

/* eslint-disable react-refresh/only-export-components */
import type { DropdownProps } from "./Dropdown.types";
import { SubMenu } from "../../navigation/SubMenu";
import { Menu } from "../../navigation/Menu";
import { Popover } from "../Popover";

function DropdownRoot({
    trigger = "click",
    children,
    ...props
}: DropdownProps) {
    return (
        <Popover {...props} trigger={trigger}>
            {children}
        </Popover>
    );
}

export const Dropdown = Object.assign(DropdownRoot, {
    Trigger: Popover.Trigger,
    Content: Popover.Content,
    Menu,
    Item: Menu.Item,
    Indicator: Menu.Indicator,
    Section: Menu.Section,
    Header: Menu.Header,
    Separator: Menu.Separator,
    SubMenu,
    SubMenuTrigger: SubMenu.Trigger,
    SubMenuContent: SubMenu.Content,
    SubMenuIndicator: SubMenu.Indicator,
});

export default Dropdown;

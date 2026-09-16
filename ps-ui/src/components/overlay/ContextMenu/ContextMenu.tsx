"use client";

/* eslint-disable react-refresh/only-export-components */
import { SubMenu } from "../../navigation/SubMenu";
import { Menu } from "../../navigation/Menu";
import { Popover } from "../Popover";
import type {
    ContextMenuContentProps,
    ContextMenuProps,
} from "./ContextMenu.types";

function ContextMenuRoot({
    trigger = "context",
    closeDelay = 120,
    children,
    ...props
}: ContextMenuProps) {
    return (
        <Popover {...props} trigger={trigger} closeDelay={closeDelay}>
            {children}
        </Popover>
    );
}

function ContextMenuContent({
    placement = "bottom start",
    gap = 4,
    children,
    ...props
}: ContextMenuContentProps) {
    return (
        <Popover.Content {...props} placement={placement} gap={gap}>
            {children}
        </Popover.Content>
    );
}

export const ContextMenu = Object.assign(ContextMenuRoot, {
    Trigger: Popover.Trigger,
    Content: ContextMenuContent,
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

export default ContextMenu;

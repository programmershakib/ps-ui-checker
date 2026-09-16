import { createContext, useContext } from "react";
import type { RefObject } from "react";
import type {
    MenuIndicatorRenderer,
    MenuItemAlign,
    MenuItemJustify,
    MenuItemRenderState,
    Selection,
    SelectionIndicator,
    SelectionKey,
    SelectionMode,
} from "./Menu.types";

export interface MenuItemRegistration {
    key: SelectionKey;
    textValue: string;
    disabled: boolean;
    ref: RefObject<HTMLElement | null>;
}

export interface MenuSubMenuRegistration {
    id: string;
    close: () => void;
    scheduleClose: () => void;
    contains: (target: EventTarget | null) => boolean;
}

export interface MenuContextValue {
    role: "menu" | "listbox";
    selectionMode: SelectionMode;
    selected: Selection;
    disabled: Selection;
    setSelected: (keys: Selection) => void;
    onAction?: (key: SelectionKey) => void;
    closeMenu: () => void;
    closeOnSelect: boolean;
    activeKey: SelectionKey | null;
    getItemDomId: (key: SelectionKey) => string;
    setActiveKey: (key: SelectionKey | null) => void;
    registerItem: (item: MenuItemRegistration) => () => void;
    focusByDelta: (delta: number) => void;
    focusFirst: () => void;
    focusLast: () => void;
    runTypeahead: (key: string) => void;
    selectionIndicator: SelectionIndicator;
    selectionIndicatorIcon?: MenuIndicatorRenderer;
    itemAlign: MenuItemAlign;
    itemJustify: MenuItemJustify;
    itemGap?: string;
    registerSubMenu: (submenu: MenuSubMenuRegistration) => () => void;
    requestSubMenuOpen: (id: string) => void;
    closeSubMenus: (target?: EventTarget | null) => void;
}

export const MenuContext = createContext<MenuContextValue | null>(null);
export const MenuItemContext = createContext<MenuItemRenderState | null>(null);

export function useMenuContext(component: string) {
    const context = useContext(MenuContext);
    if (!context) throw new Error(`${component} must be used inside <Menu>`);
    return context;
}

export function useOptionalMenuItemContext() {
    return useContext(MenuItemContext);
}

import type { HTMLAttributes, ReactNode } from "react";
import type { Base, Space } from "../../../types";

export type SelectionKey = string | number;

export type Selection = Set<SelectionKey> | "all";

export type SelectionMode = "none" | "single" | "multiple";

export type SelectionIndicator = "check" | "dot" | "none";

export type MenuItemAlign = "start" | "center" | "end" | "stretch" | "baseline";

export type MenuItemJustify =
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly";

export interface MenuItemRenderState {
    isSelected: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isPressed: boolean;
    isActive: boolean;
    hasSubmenu: boolean;
}

export type MenuIndicatorRenderer =
    | ReactNode
    | ((state: MenuItemRenderState) => ReactNode);

export interface MenuProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onSelect"
> {
    children: ReactNode;
    selectionMode?: SelectionMode;
    selectedKeys?: Selection | Iterable<SelectionKey>;
    defaultSelectedKeys?: Selection | Iterable<SelectionKey>;
    disabledKeys?: Iterable<SelectionKey> | "all";
    onSelectionChange?: (keys: Selection) => void;
    onAction?: (key: SelectionKey) => void;
    closeOnSelect?: boolean;
    hoverColor?: string;
    activeColor?: string;
    selectedColor?: string;
    selectionIndicator?: SelectionIndicator;
    selectionIndicatorIcon?: MenuIndicatorRenderer;
    itemAlign?: MenuItemAlign;
    itemJustify?: MenuItemJustify;
    itemGap?: Space | number | (string & {});
    loopFocus?: boolean;
    typeahead?: boolean;
    typeaheadTimeout?: number;
    typeaheadNormalizer?: (value: string) => string;
    useAriaActiveDescendant?: boolean;
}

export interface MenuItemProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "id" | "children" | "align"
> {
    id?: SelectionKey;
    "data-submenu-trigger"?: boolean;
    "data-submenu-open"?: boolean;
    align?: MenuItemAlign;
    justify?: MenuItemJustify;
    gap?: Space | number | (string & {});
    textValue?: string;
    disabled?: boolean;
    isDisabled?: boolean;
    children: ReactNode | ((state: MenuItemRenderState) => ReactNode);
}

export interface MenuIndicatorProps extends Base {
    variant?: Exclude<SelectionIndicator, "none">;
    visible?: boolean;
    children?: MenuIndicatorRenderer;
}

export interface MenuSectionProps extends Base {
    title?: ReactNode;
    children: ReactNode;
}

export interface MenuHeaderProps extends Base {
    children: ReactNode;
}

export type MenuSeparatorProps = Base;

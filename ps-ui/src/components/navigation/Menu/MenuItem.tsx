"use client";

import { composeRefs } from "../../../hooks/refs/useComposedRefs";
import { MenuItemContext, useMenuContext } from "./Menu.context";
import { keyDisabled, keySelected } from "./Menu.utils";
import { cn, resolveSpace } from "../../../utils";
import { Flex } from "../../layout/Flex";
import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    type FocusEvent,
    type KeyboardEvent,
    type MouseEvent,
    type PointerEvent as ReactPointerEvent,
} from "react";
import type {
    MenuItemProps,
    MenuItemRenderState,
    SelectionKey,
} from "./Menu.types";

function callHandler<T>(handler: ((event: T) => void) | undefined, event: T) {
    handler?.(event);
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
    (
        {
            id,
            textValue,
            disabled,
            isDisabled,
            children,
            align,
            justify,
            gap,
            className,
            style,
            onClick,
            onKeyDown,
            onFocus,
            onBlur,
            onPointerEnter,
            onPointerLeave,
            onPointerDown,
            onPointerUp,
            onPointerCancel,
            role,
            tabIndex,
            ...props
        },
        ref,
    ) => {
        const menu = useMenuContext("Menu.Item");
        const itemRef = useRef<HTMLDivElement | null>(null);
        const itemKey = id ?? textValue ?? "";
        const hasItemKey = itemKey !== "";
        const disabledState = Boolean(
            disabled ??
            isDisabled ??
            (hasItemKey && keyDisabled(menu.disabled, itemKey)),
        );
        const selected = hasItemKey
            ? keySelected(menu.selected, itemKey)
            : false;
        const active = menu.activeKey === itemKey;
        const [pressed, setPressed] = useState(false);
        const hasSubmenu = Boolean(props["data-submenu-trigger"]);
        const state: MenuItemRenderState = {
            isSelected: selected,
            isFocused: active,
            isDisabled: disabledState,
            isPressed: pressed,
            isActive: active,
            hasSubmenu,
        };
        const renderedChildren =
            typeof children === "function" ? children(state) : children;

        useEffect(() => {
            if (!hasItemKey) return undefined;
            return menu.registerItem({
                key: itemKey,
                textValue:
                    textValue ??
                    (typeof renderedChildren === "string"
                        ? renderedChildren
                        : String(itemKey)),
                disabled: disabledState,
                ref: itemRef,
            });
        }, [
            disabledState,
            hasItemKey,
            itemKey,
            menu,
            renderedChildren,
            textValue,
        ]);

        const select = () => {
            if (!hasItemKey || disabledState) return;
            menu.onAction?.(itemKey);
            if (menu.selectionMode !== "none") {
                if (menu.selectionMode === "single") {
                    menu.setSelected(new Set<SelectionKey>([itemKey]));
                } else {
                    const next =
                        menu.selected === "all"
                            ? new Set<SelectionKey>()
                            : new Set(menu.selected);
                    if (selected) next.delete(itemKey);
                    else next.add(itemKey);
                    menu.setSelected(next);
                }
            }
            if (menu.closeOnSelect && !hasSubmenu) menu.closeMenu();
        };

        return (
            <MenuItemContext.Provider value={state}>
                <Flex
                    {...props}
                    id={hasItemKey ? menu.getItemDomId(itemKey) : undefined}
                    ref={composeRefs(ref, (node: HTMLDivElement | null) => {
                        itemRef.current = node;
                    })}
                    as="div"
                    role={
                        role ??
                        (menu.role === "listbox" ? "option" : "menuitem")
                    }
                    tabIndex={tabIndex ?? -1}
                    aria-disabled={disabledState || undefined}
                    aria-selected={
                        menu.selectionMode !== "none" ? selected : undefined
                    }
                    data-slot="menu-item"
                    data-key={hasItemKey ? itemKey : undefined}
                    data-active={active || undefined}
                    data-selected={selected || undefined}
                    data-disabled={disabledState || undefined}
                    data-pressed={pressed || undefined}
                    className={cn("ps-menu__item", className)}
                    style={style}
                    align={align ?? menu.itemAlign}
                    justify={justify ?? menu.itemJustify}
                    gap={gap !== undefined ? resolveSpace(gap) : menu.itemGap}
                    onClick={(event: MouseEvent<HTMLDivElement>) => {
                        callHandler(onClick, event);
                        if (event.defaultPrevented) return;
                        event.preventDefault();
                        select();
                    }}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                        callHandler(onKeyDown, event);
                        if (event.defaultPrevented || disabledState) return;
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            select();
                        }
                    }}
                    onFocus={(event: FocusEvent<HTMLDivElement>) => {
                        callHandler(onFocus, event);
                        if (!event.defaultPrevented && hasItemKey) {
                            menu.setActiveKey(itemKey);
                        }
                    }}
                    onBlur={(event: FocusEvent<HTMLDivElement>) => {
                        callHandler(onBlur, event);
                        const related = event.relatedTarget;
                        if (
                            !(related instanceof Node) ||
                            !event.currentTarget.parentElement?.contains(
                                related,
                            )
                        ) {
                            menu.setActiveKey(null);
                        }
                    }}
                    onPointerEnter={(
                        event: ReactPointerEvent<HTMLDivElement>,
                    ) => {
                        callHandler(onPointerEnter, event);
                        if (
                            !event.defaultPrevented &&
                            !disabledState &&
                            hasItemKey
                        ) {
                            event.currentTarget.focus({ preventScroll: true });
                            menu.setActiveKey(itemKey);
                            menu.closeSubMenus(event.currentTarget);
                        }
                    }}
                    onPointerLeave={(
                        event: ReactPointerEvent<HTMLDivElement>,
                    ) => {
                        callHandler(onPointerLeave, event);
                        setPressed(false);
                    }}
                    onPointerDown={(
                        event: ReactPointerEvent<HTMLDivElement>,
                    ) => {
                        callHandler(onPointerDown, event);
                        if (!disabledState) setPressed(true);
                    }}
                    onPointerUp={(event: ReactPointerEvent<HTMLDivElement>) => {
                        callHandler(onPointerUp, event);
                        setPressed(false);
                    }}
                    onPointerCancel={(
                        event: ReactPointerEvent<HTMLDivElement>,
                    ) => {
                        callHandler(onPointerCancel, event);
                        setPressed(false);
                    }}
                >
                    {renderedChildren}
                </Flex>
            </MenuItemContext.Provider>
        );
    },
);

MenuItem.displayName = "Menu.Item";

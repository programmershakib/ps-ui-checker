"use client";

import type { MenuProps, Selection, SelectionKey } from "./Menu.types";
import { useOptionalPopoverContext } from "../../overlay/Popover";
import { cn, resolveSpace } from "../../../utils";
import { Flex } from "../../layout/Flex";
import {
    MenuContext,
    type MenuItemRegistration,
    type MenuSubMenuRegistration,
} from "./Menu.context";
import {
    defaultTypeaheadNormalizer,
    domIdSegment,
    normalizeKeys,
    sortItems,
} from "./Menu.utils";
import {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type FocusEvent,
    type KeyboardEvent,
} from "react";

export const MenuRoot = forwardRef<HTMLDivElement, MenuProps>(
    (
        {
            children,
            className,
            style,
            selectionMode = "none",
            selectedKeys,
            defaultSelectedKeys,
            disabledKeys,
            onSelectionChange,
            onAction,
            closeOnSelect = true,
            hoverColor,
            activeColor,
            selectedColor,
            selectionIndicator = "check",
            selectionIndicatorIcon,
            itemAlign = "center",
            itemJustify = "between",
            itemGap = "sm",
            loopFocus = true,
            typeahead = true,
            typeaheadTimeout = 700,
            typeaheadNormalizer = defaultTypeaheadNormalizer,
            useAriaActiveDescendant = true,
            role = selectionMode === "none" ? "menu" : "menu",
            onFocus,
            onKeyDown,
            ...props
        },
        ref,
    ) => {
        const popover = useOptionalPopoverContext();
        const menuDomId = useId().replace(/:/g, "");
        const itemsRef = useRef<MenuItemRegistration[]>([]);
        const subMenusRef = useRef<MenuSubMenuRegistration[]>([]);
        const searchRef = useRef("");
        const searchTimer = useRef<number | null>(null);
        const [activeKey, setActiveKey] = useState<SelectionKey | null>(null);
        const getItemDomId = useCallback(
            (key: SelectionKey) => `${menuDomId}-item-${domIdSegment(key)}`,
            [menuDomId],
        );
        const [internalSelected, setInternalSelected] = useState<Selection>(
            () => normalizeKeys(defaultSelectedKeys),
        );
        const selected =
            selectedKeys !== undefined
                ? normalizeKeys(selectedKeys)
                : internalSelected;
        const disabled = useMemo(
            () => normalizeKeys(disabledKeys),
            [disabledKeys],
        );

        const setSelected = useCallback(
            (keys: Selection) => {
                if (selectedKeys === undefined) setInternalSelected(keys);
                onSelectionChange?.(keys);
            },
            [onSelectionChange, selectedKeys],
        );

        const enabledItems = useCallback(
            () =>
                sortItems(itemsRef.current).filter(
                    (item) => !item.disabled && item.ref.current,
                ),
            [],
        );

        const focusItem = useCallback((key: SelectionKey) => {
            const item = itemsRef.current.find(
                (entry) => entry.key === key && !entry.disabled,
            );
            item?.ref.current?.focus({ preventScroll: true });
            if (item) setActiveKey(item.key);
        }, []);

        const focusByIndex = useCallback(
            (index: number) => {
                const items = enabledItems();
                if (!items.length) return;
                const safeIndex = loopFocus
                    ? (index + items.length) % items.length
                    : Math.min(Math.max(index, 0), items.length - 1);
                const item = items[safeIndex];
                if (item) focusItem(item.key);
            },
            [enabledItems, focusItem, loopFocus],
        );

        const focusByDelta = useCallback(
            (delta: number) => {
                const items = enabledItems();
                const currentIndex = items.findIndex(
                    (item) =>
                        item.key === activeKey ||
                        item.ref.current === document.activeElement,
                );
                focusByIndex(
                    currentIndex === -1
                        ? delta > 0
                            ? 0
                            : items.length - 1
                        : currentIndex + delta,
                );
            },
            [activeKey, enabledItems, focusByIndex],
        );

        const focusFirst = useCallback(() => focusByIndex(0), [focusByIndex]);
        const focusLast = useCallback(
            () => focusByIndex(enabledItems().length - 1),
            [enabledItems, focusByIndex],
        );

        const getActiveItemNode = useCallback(() => {
            const items = enabledItems();
            return (
                items.find(
                    (item) => item.ref.current === document.activeElement,
                ) ?? items.find((item) => item.key === activeKey)
            )?.ref.current;
        }, [activeKey, enabledItems]);

        const registerItem = useCallback((item: MenuItemRegistration) => {
            itemsRef.current = [
                ...itemsRef.current.filter((entry) => entry.key !== item.key),
                item,
            ];
            return () => {
                itemsRef.current = itemsRef.current.filter(
                    (entry) => entry.key !== item.key,
                );
            };
        }, []);

        const registerSubMenu = useCallback(
            (submenu: MenuSubMenuRegistration) => {
                subMenusRef.current = [
                    ...subMenusRef.current.filter(
                        (entry) => entry.id !== submenu.id,
                    ),
                    submenu,
                ];
                return () => {
                    subMenusRef.current = subMenusRef.current.filter(
                        (entry) => entry.id !== submenu.id,
                    );
                };
            },
            [],
        );

        const requestSubMenuOpen = useCallback((id: string) => {
            subMenusRef.current.forEach((submenu) => {
                if (submenu.id !== id) submenu.close();
            });
        }, []);

        const closeSubMenus = useCallback((target?: EventTarget | null) => {
            subMenusRef.current.forEach((submenu) => {
                if (target && submenu.contains(target)) return;
                submenu.scheduleClose();
            });
        }, []);

        const runTypeahead = useCallback(
            (key: string) => {
                if (!typeahead || key.length !== 1 || key.trim() === "") return;
                const normalizedKey = typeaheadNormalizer(key);
                if (!normalizedKey) return;
                if (searchTimer.current !== null) {
                    window.clearTimeout(searchTimer.current);
                }

                const isRepeatedCycle =
                    searchRef.current.length > 0 &&
                    [...searchRef.current].every(
                        (char) => char === normalizedKey,
                    );
                searchRef.current = isRepeatedCycle
                    ? normalizedKey
                    : `${searchRef.current}${normalizedKey}`;

                searchTimer.current = window.setTimeout(() => {
                    searchRef.current = "";
                }, typeaheadTimeout);

                const items = enabledItems();
                const currentIndex = Math.max(
                    0,
                    items.findIndex(
                        (item) =>
                            item.key === activeKey ||
                            item.ref.current === document.activeElement,
                    ),
                );
                const ordered = [
                    ...items.slice(currentIndex + 1),
                    ...items.slice(0, currentIndex + 1),
                ];
                const match = ordered.find((item) =>
                    typeaheadNormalizer(item.textValue).startsWith(
                        searchRef.current,
                    ),
                );
                if (match) focusItem(match.key);
            },
            [
                activeKey,
                enabledItems,
                focusItem,
                typeahead,
                typeaheadNormalizer,
                typeaheadTimeout,
            ],
        );

        useEffect(
            () => () => {
                if (searchTimer.current !== null) {
                    window.clearTimeout(searchTimer.current);
                }
            },
            [],
        );

        const context = useMemo(
            () => ({
                role: role as "menu" | "listbox",
                selectionMode,
                selected,
                disabled,
                setSelected,
                onAction,
                closeMenu: popover?.closeTree ?? (() => undefined),
                closeOnSelect,
                activeKey,
                getItemDomId,
                setActiveKey,
                registerItem,
                focusByDelta,
                focusFirst,
                focusLast,
                runTypeahead,
                selectionIndicator,
                selectionIndicatorIcon,
                itemAlign,
                itemJustify,
                itemGap: resolveSpace(itemGap),
                registerSubMenu,
                requestSubMenuOpen,
                closeSubMenus,
            }),
            [
                activeKey,
                closeOnSelect,
                closeSubMenus,
                disabled,
                focusByDelta,
                focusFirst,
                focusLast,
                getItemDomId,
                itemAlign,
                itemGap,
                itemJustify,
                onAction,
                popover?.closeTree,
                registerItem,
                registerSubMenu,
                requestSubMenuOpen,
                role,
                runTypeahead,
                selected,
                selectionIndicator,
                selectionIndicatorIcon,
                selectionMode,
                setSelected,
            ],
        );

        const cssVars = {
            ...(hoverColor !== undefined && {
                "--ps-menu-hover-bg": hoverColor,
            }),
            ...(activeColor !== undefined && {
                "--ps-menu-active-bg": activeColor,
            }),
            ...(selectedColor !== undefined && {
                "--ps-menu-selected-bg": selectedColor,
            }),
        } as CSSProperties;

        return (
            <MenuContext.Provider value={context}>
                <Flex
                    {...props}
                    ref={ref}
                    as="div"
                    direction="column"
                    role={role}
                    aria-orientation="vertical"
                    aria-activedescendant={
                        useAriaActiveDescendant && activeKey !== null
                            ? getItemDomId(activeKey)
                            : undefined
                    }
                    tabIndex={-1}
                    data-slot="menu"
                    data-active-color={activeColor !== undefined || undefined}
                    className={cn("ps-menu", className)}
                    style={{ ...cssVars, ...style }}
                    onFocus={(event: FocusEvent<HTMLDivElement>) => {
                        onFocus?.(event);
                        if (event.currentTarget === event.target)
                            setActiveKey(null);
                    }}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                        onKeyDown?.(event);
                        if (event.defaultPrevented) return;
                        if (event.key === "ArrowDown") {
                            event.preventDefault();
                            focusByDelta(1);
                        } else if (event.key === "ArrowUp") {
                            event.preventDefault();
                            focusByDelta(-1);
                        } else if (event.key === "PageDown") {
                            event.preventDefault();
                            focusByDelta(5);
                        } else if (event.key === "PageUp") {
                            event.preventDefault();
                            focusByDelta(-5);
                        } else if (event.key === "Home") {
                            event.preventDefault();
                            focusFirst();
                        } else if (event.key === "End") {
                            event.preventDefault();
                            focusLast();
                        } else if (event.key === "ArrowRight") {
                            const target = getActiveItemNode();
                            if (target?.dataset.submenuTrigger === "true") {
                                event.preventDefault();
                                target.focus({ preventScroll: true });
                                target.dispatchEvent(
                                    new KeyboardEvent("keydown", {
                                        key: "ArrowRight",
                                        bubbles: true,
                                        cancelable: true,
                                    }),
                                );
                            }
                        } else if (event.key === "Tab") {
                            popover?.closeTree();
                        } else if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            getActiveItemNode()?.click?.();
                        } else {
                            runTypeahead(event.key);
                        }
                    }}
                >
                    {children}
                </Flex>
            </MenuContext.Provider>
        );
    },
);

MenuRoot.displayName = "Menu";

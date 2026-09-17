"use client";

import { Popover, useOptionalPopoverContext } from "../../overlay/Popover";
import { contains, normalizeTrigger } from "./SubMenu.utils";
import { useControllableState } from "../../../hooks";
import { useMenuContext } from "../Menu/Menu.context";
import type { SubMenuProps } from "./SubMenu.types";
import {
    SubMenuContext,
    useOptionalSubMenuContext,
    type SubMenuChildRegistration,
} from "./SubMenu.context";
import {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
} from "react";

export const SubMenuRoot = forwardRef<HTMLSpanElement, SubMenuProps>(
    (
        {
            children,
            id,
            className,
            style,
            isOpen,
            defaultOpen = false,
            onOpenChange,
            trigger = "hover",
            openDelay = 200,
            closeDelay = 320,
            longPressDelay = 520,
            longPressMoveThreshold = 8,
            closeOnHoverLeave = true,
            gap = 3,
            crossOffset = 0,
            ...rootProps
        },
        ref,
    ) => {
        const menu = useMenuContext("SubMenu");
        const parentPopover = useOptionalPopoverContext();
        const parentSubMenu = useOptionalSubMenuContext();
        const submenuId = useId();
        const triggerRef = useRef<HTMLElement | null>(null);
        const contentRef = useRef<HTMLElement | null>(null);
        const focusOnOpenRef = useRef(false);
        const keyboardOpenRef = useRef(false);
        const openTimer = useRef<number | null>(null);
        const closeTimer = useRef<number | null>(null);
        const childSubMenusRef = useRef<SubMenuChildRegistration[]>([]);
        const [open, setOpenState] = useControllableState({
            value: isOpen,
            defaultValue: defaultOpen,
            onChange: onOpenChange,
        });
        const openRef = useRef(open);
        openRef.current = open;
        const modes = normalizeTrigger(trigger);

        const setTriggerNode = useCallback((node: HTMLElement | null) => {
            triggerRef.current = node;
        }, []);

        const clearTimers = useCallback(() => {
            if (openTimer.current !== null)
                window.clearTimeout(openTimer.current);
            if (closeTimer.current !== null)
                window.clearTimeout(closeTimer.current);
            openTimer.current = null;
            closeTimer.current = null;
        }, []);

        const cancelClose = useCallback(() => {
            if (closeTimer.current !== null)
                window.clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }, []);

        const cancelCloseTree = useCallback(() => {
            cancelClose();
            parentSubMenu?.cancelCloseTree();
        }, [cancelClose, parentSubMenu]);

        const registerChildSubMenu = useCallback(
            (submenu: SubMenuChildRegistration) => {
                childSubMenusRef.current = [
                    ...childSubMenusRef.current.filter(
                        (entry) => entry.id !== submenu.id,
                    ),
                    submenu,
                ];
                return () => {
                    childSubMenusRef.current = childSubMenusRef.current.filter(
                        (entry) => entry.id !== submenu.id,
                    );
                };
            },
            [],
        );

        const setOpen = useCallback(
            (next: boolean, focus = false) => {
                clearTimers();
                openRef.current = next;
                focusOnOpenRef.current = Boolean(next && focus);
                keyboardOpenRef.current = Boolean(next && focus);
                if (next) {
                    parentSubMenu?.cancelCloseTree();
                    menu.requestSubMenuOpen(submenuId);
                }
                setOpenState(next);
            },
            [clearTimers, menu, parentSubMenu, setOpenState, submenuId],
        );

        const closeStack = useCallback(() => {
            clearTimers();
            const childCloseDelay = childSubMenusRef.current.reduceRight(
                (delay, submenu) => Math.max(delay, submenu.closeStack()),
                0,
            );
            if (!openRef.current && childCloseDelay === 0) return 0;
            window.setTimeout(() => setOpen(false), childCloseDelay);
            return childCloseDelay + 36;
        }, [clearTimers, setOpen]);

        const requestHoverOpen = useCallback(() => {
            if (!modes.has("hover")) return;
            keyboardOpenRef.current = false;
            cancelCloseTree();
            if (openTimer.current !== null)
                window.clearTimeout(openTimer.current);
            if (openRef.current) return;
            openTimer.current = window.setTimeout(
                () => setOpen(true),
                openDelay,
            );
        }, [cancelCloseTree, modes, openDelay, setOpen]);

        const scheduleClose = useCallback(
            (force = false) => {
                if (
                    !force &&
                    (!closeOnHoverLeave ||
                        !modes.has("hover") ||
                        keyboardOpenRef.current)
                ) {
                    return;
                }
                if (openTimer.current !== null)
                    window.clearTimeout(openTimer.current);
                if (closeTimer.current !== null)
                    window.clearTimeout(closeTimer.current);
                closeTimer.current = window.setTimeout(closeStack, closeDelay);
            },
            [closeDelay, closeOnHoverLeave, closeStack, modes],
        );

        const isInside = useCallback(
            (target: EventTarget | null) =>
                contains(triggerRef.current, target) ||
                contains(contentRef.current, target),
            [],
        );

        useEffect(() => () => clearTimers(), [clearTimers]);

        useEffect(() => {
            if (!parentPopover?.open) setOpen(false);
        }, [parentPopover?.open, setOpen]);

        useEffect(() => {
            if (!parentSubMenu) return undefined;
            return parentSubMenu.registerChildSubMenu({
                id: submenuId,
                closeStack,
            });
        }, [closeStack, parentSubMenu, submenuId]);

        useEffect(() => {
            if (!open) return;
            const triggerKey = triggerRef.current?.dataset.key;
            if (menu.activeKey === null || menu.activeKey === triggerKey)
                return;
            scheduleClose(true);
        }, [menu.activeKey, open, scheduleClose]);

        useEffect(
            () =>
                menu.registerSubMenu({
                    id: submenuId,
                    close: () => {
                        closeStack();
                    },
                    closeStack,
                    scheduleClose: () => scheduleClose(true),
                    contains: isInside,
                }),
            [closeStack, isInside, menu, scheduleClose, submenuId],
        );

        const context = useMemo(
            () => ({
                id: submenuId,
                open,
                openRef,
                setOpen,
                trigger,
                openDelay,
                closeDelay,
                longPressDelay,
                longPressMoveThreshold,
                gap,
                crossOffset,
                triggerRef,
                setTriggerNode,
                contentRef,
                focusOnOpenRef,
                requestHoverOpen,
                closeStack,
                scheduleClose,
                cancelClose,
                cancelCloseTree,
                registerChildSubMenu,
            }),
            [
                cancelClose,
                cancelCloseTree,
                closeDelay,
                closeStack,
                crossOffset,
                gap,
                longPressDelay,
                longPressMoveThreshold,
                open,
                openDelay,
                registerChildSubMenu,
                requestHoverOpen,
                scheduleClose,
                setOpen,
                setTriggerNode,
                submenuId,
                trigger,
            ],
        );

        const hasRootElement =
            id !== undefined ||
            className !== undefined ||
            style !== undefined ||
            Object.keys(rootProps).length > 0 ||
            ref !== null;
        const content = hasRootElement ? (
            <span
                {...rootProps}
                id={id}
                ref={ref}
                className={className}
                style={style}
                data-slot="submenu"
            >
                {children}
            </span>
        ) : (
            children
        );

        return (
            <Popover
                isOpen={open}
                onOpenChange={(next) => setOpen(next)}
                trigger="manual"
                closeOnInteractOutside={false}
                restoreFocusOnClose={false}
                positioningRoot={parentPopover?.positioningRoot}
                portalContainer={parentPopover?.portalContainer}
            >
                <SubMenuContext.Provider value={context}>
                    {content}
                </SubMenuContext.Provider>
            </Popover>
        );
    },
);

SubMenuRoot.displayName = "SubMenu";

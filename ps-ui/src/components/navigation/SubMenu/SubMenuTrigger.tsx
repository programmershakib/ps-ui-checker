"use client";

import { Popover, usePopoverLayerContext } from "../../overlay/Popover";
import { composeRefs } from "../../../hooks/refs/useComposedRefs";
import type { SubMenuTriggerProps } from "./SubMenu.types";
import { useSubMenuContext } from "./SubMenu.context";
import {
    focusMenuContainer,
    getElementRef,
    isRTL,
    normalizeTrigger,
    scheduleElementFocus,
} from "./SubMenu.utils";
import {
    Children,
    Fragment,
    cloneElement,
    isValidElement,
    useEffect,
    useMemo,
    useRef,
    type CSSProperties,
    type KeyboardEvent,
    type MouseEvent,
    type PointerEvent as ReactPointerEvent,
    type RefCallback,
} from "react";

export function SubMenuTrigger({
    children,
    id,
    className,
    style,
}: SubMenuTriggerProps) {
    const submenu = useSubMenuContext("SubMenu.Trigger");
    const parentLayer = usePopoverLayerContext();
    const modes = normalizeTrigger(submenu.trigger);
    const childArray = useMemo(() => Children.toArray(children), [children]);
    const child = childArray.length === 1 ? childArray[0] : children;
    const longPressTimer = useRef<number | null>(null);
    const longPressPoint = useRef<{ x: number; y: number } | null>(null);
    const skipClick = useRef(false);

    useEffect(
        () => () => {
            if (longPressTimer.current !== null) {
                window.clearTimeout(longPressTimer.current);
            }
        },
        [],
    );

    if (
        childArray.length !== 1 ||
        !isValidElement<Record<string, unknown>>(child) ||
        child.type === Fragment
    ) {
        return (
            <Popover.Trigger>
                <span id={id} className={className} style={style}>
                    {children}
                </span>
            </Popover.Trigger>
        );
    }

    const props = child.props;
    const setTriggerRef: RefCallback<HTMLElement> = (node) => {
        submenu.setTriggerNode(node);
    };

    const captureTarget = (event: { currentTarget: EventTarget }) => {
        if (event.currentTarget instanceof HTMLElement) {
            submenu.setTriggerNode(event.currentTarget);
        }
    };

    const clearLongPress = () => {
        if (longPressTimer.current !== null) {
            window.clearTimeout(longPressTimer.current);
        }
        longPressTimer.current = null;
        longPressPoint.current = null;
    };

    const scheduleKeyboardFocus = () => {
        [0, 16, 50, 120].forEach((delay) => {
            window.setTimeout(
                () => focusMenuContainer(submenu.contentRef.current),
                delay,
            );
        });
    };

    // eslint-disable-next-line react-hooks/refs -- cloning keeps submenu triggers as the user's direct Menu.Item node.
    const cloned = cloneElement(child, {
        id: id ?? (props.id as string | undefined),
        ref: composeRefs(getElementRef(child), setTriggerRef),
        style: { ...(props.style as CSSProperties), ...style },
        className:
            [props.className as string | undefined, className]
                .filter(Boolean)
                .join(" ") || undefined,
        "aria-haspopup": "menu",
        "aria-expanded": submenu.open,
        "data-submenu-trigger": true,
        "data-submenu-open": submenu.open || undefined,
        onClick: (event: MouseEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onClick as
                    | ((event: MouseEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            if (event.defaultPrevented) return;
            if (skipClick.current) {
                skipClick.current = false;
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (!modes.has("click")) return;
            event.preventDefault();
            event.stopPropagation();
            submenu.setOpen(!submenu.open);
        },
        onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onPointerEnter as
                    | ((event: ReactPointerEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            if (!event.defaultPrevented) submenu.requestHoverOpen();
        },
        onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onPointerLeave as
                    | ((event: ReactPointerEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            clearLongPress();
            submenu.scheduleClose();
        },
        onPointerDown: (event: ReactPointerEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onPointerDown as
                    | ((event: ReactPointerEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            if (event.defaultPrevented || !modes.has("longPress")) return;
            clearLongPress();
            longPressPoint.current = { x: event.clientX, y: event.clientY };
            longPressTimer.current = window.setTimeout(() => {
                skipClick.current = true;
                submenu.setOpen(true);
            }, submenu.longPressDelay);
        },
        onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onPointerMove as
                    | ((event: ReactPointerEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            const point = longPressPoint.current;
            if (!point) return;
            if (
                Math.hypot(event.clientX - point.x, event.clientY - point.y) >
                submenu.longPressMoveThreshold
            ) {
                clearLongPress();
            }
        },
        onPointerUp: (event: ReactPointerEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onPointerUp as
                    | ((event: ReactPointerEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            clearLongPress();
        },
        onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onPointerCancel as
                    | ((event: ReactPointerEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            clearLongPress();
        },
        onContextMenu: (event: MouseEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onContextMenu as
                    | ((event: MouseEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            if (!modes.has("context")) return;
            event.preventDefault();
            event.stopPropagation();
            submenu.setOpen(true);
        },
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
            captureTarget(event);
            (
                props.onKeyDown as
                    | ((event: KeyboardEvent<HTMLElement>) => void)
                    | undefined
            )?.(event);
            if (event.defaultPrevented) return;
            const rtl = isRTL(submenu.triggerRef.current);
            const openKey =
                parentLayer?.side === "left" || (!parentLayer?.side && rtl)
                    ? "ArrowLeft"
                    : "ArrowRight";
            const closeKey =
                openKey === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
            if (
                event.key === openKey ||
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                event.stopPropagation();
                submenu.setOpen(true, true);
                scheduleKeyboardFocus();
            } else if (event.key === closeKey) {
                event.preventDefault();
                event.stopPropagation();
                const triggerNode = submenu.triggerRef.current;
                submenu.setOpen(false);
                scheduleElementFocus(
                    () => triggerNode ?? submenu.triggerRef.current,
                );
            } else if (event.altKey && event.key === "ArrowDown") {
                event.preventDefault();
                event.stopPropagation();
                submenu.setOpen(true, true);
                scheduleKeyboardFocus();
            }
        },
    });

    return <Popover.Trigger>{cloned}</Popover.Trigger>;
}

SubMenuTrigger.displayName = "SubMenu.Trigger";

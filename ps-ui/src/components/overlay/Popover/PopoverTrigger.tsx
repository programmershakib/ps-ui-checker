"use client";

import { getElementRef, normalizeTrigger } from "./Popover.utils";
import { composeRefs } from "../../../hooks/refs/useComposedRefs";
import type { PopoverTriggerProps } from "./Popover.types";
import { usePopoverContext } from "./Popover.context";
import { Text } from "../../typography/Text";
import { cn } from "../../../utils";
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

export function PopoverTrigger({
    children,
    id,
    className,
    style,
}: PopoverTriggerProps) {
    const popover = usePopoverContext("Popover.Trigger");
    const modes = normalizeTrigger(popover.trigger);
    const longPressTimer = useRef<number | null>(null);
    const longPressPoint = useRef<{ x: number; y: number } | null>(null);
    const skipClick = useRef(false);
    const childArray = useMemo(() => Children.toArray(children), [children]);
    const child = childArray.length === 1 ? childArray[0] : children;

    const setTriggerRef: RefCallback<HTMLElement> = (node) => {
        popover.setTriggerNode(node);
    };

    const captureTarget = (event: { currentTarget: EventTarget }) => {
        if (event.currentTarget instanceof HTMLElement) {
            popover.setTriggerNode(event.currentTarget);
        }
    };

    const clearLongPress = () => {
        if (longPressTimer.current !== null) {
            window.clearTimeout(longPressTimer.current);
        }
        longPressTimer.current = null;
        longPressPoint.current = null;
    };

    useEffect(() => () => clearLongPress(), []);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        captureTarget(event);
        if (event.defaultPrevented) return;
        if (skipClick.current) {
            skipClick.current = false;
            event.preventDefault();
            return;
        }
        if (!modes.has("click")) {
            if (popover.open && popover.openReason === "context") {
                popover.setOpen(false);
            }
            return;
        }
        if (popover.open && popover.openReason === "hover") {
            popover.setOpen(true, "click");
            return;
        }
        popover.setOpen(!popover.open, "click");
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        captureTarget(event);
        if (event.defaultPrevented) return;
        if (event.key === "Escape" && popover.open) {
            event.preventDefault();
            popover.setOpen(false, "manual", true);
            return;
        }
        const canKeyboardOpen = modes.has("click") || modes.has("longPress");
        if (!canKeyboardOpen) return;
        if (event.altKey && event.key === "ArrowDown") {
            event.preventDefault();
            popover.setOpen(
                true,
                modes.has("click") ? "click" : "longPress",
                true,
            );
            return;
        }
        if (!["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
            return;
        }
        event.preventDefault();
        popover.setOpen(true, modes.has("click") ? "click" : "longPress", true);
    };

    const handlePointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
        captureTarget(event);
        if (!event.defaultPrevented && modes.has("hover")) {
            popover.requestHoverOpen();
        }
    };

    const handlePointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
        captureTarget(event);
        clearLongPress();
        if (modes.has("hover")) popover.scheduleHoverClose();
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
        captureTarget(event);
        if (event.defaultPrevented || !modes.has("longPress")) return;
        clearLongPress();
        longPressPoint.current = { x: event.clientX, y: event.clientY };
        longPressTimer.current = window.setTimeout(() => {
            skipClick.current = true;
            popover.setOpen(true, "longPress");
        }, popover.longPressDelay);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
        const point = longPressPoint.current;
        if (!point) return;
        if (
            Math.hypot(event.clientX - point.x, event.clientY - point.y) >
            popover.longPressMoveThreshold
        ) {
            clearLongPress();
        }
    };

    const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
        captureTarget(event);
        if (event.defaultPrevented || !modes.has("context")) return;
        event.preventDefault();
        popover.openAtPoint({ x: event.clientX, y: event.clientY });
    };

    const canClone =
        childArray.length === 1 &&
        isValidElement<Record<string, unknown>>(child) &&
        child.type !== Fragment;

    if (canClone && isValidElement<Record<string, unknown>>(child)) {
        const props = child.props;
        // eslint-disable-next-line react-hooks/refs -- cloning is required so React node triggers stay direct, without a Popover wrapper or CSS.
        return cloneElement(child, {
            id: id ?? (props.id as string | undefined),
            ref: composeRefs(getElementRef(child), setTriggerRef),
            style: { ...(props.style as CSSProperties), ...style },
            className: cn(props.className as string, className),
            "data-slot": "popover-trigger",
            "aria-haspopup":
                (props["aria-haspopup"] as string | undefined) ?? "dialog",
            "aria-expanded": popover.open,
            onClick: (event: MouseEvent<HTMLElement>) => {
                (
                    props.onClick as
                        | ((event: MouseEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                handleClick(event);
            },
            onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
                (
                    props.onKeyDown as
                        | ((event: KeyboardEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                handleKeyDown(event);
            },
            onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => {
                (
                    props.onPointerEnter as
                        | ((event: ReactPointerEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                handlePointerEnter(event);
            },
            onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => {
                (
                    props.onPointerLeave as
                        | ((event: ReactPointerEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                handlePointerLeave(event);
            },
            onPointerDown: (event: ReactPointerEvent<HTMLElement>) => {
                (
                    props.onPointerDown as
                        | ((event: ReactPointerEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                handlePointerDown(event);
            },
            onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
                (
                    props.onPointerMove as
                        | ((event: ReactPointerEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                handlePointerMove(event);
            },
            onPointerUp: (event: ReactPointerEvent<HTMLElement>) => {
                (
                    props.onPointerUp as
                        | ((event: ReactPointerEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                clearLongPress();
            },
            onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => {
                (
                    props.onPointerCancel as
                        | ((event: ReactPointerEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                clearLongPress();
            },
            onContextMenu: (event: MouseEvent<HTMLElement>) => {
                (
                    props.onContextMenu as
                        | ((event: MouseEvent<HTMLElement>) => void)
                        | undefined
                )?.(event);
                handleContextMenu(event);
            },
        });
    }

    return (
        <Text
            as="span"
            id={id}
            ref={setTriggerRef as RefCallback<Element>}
            className={className}
            style={style}
            role="button"
            tabIndex={0}
            data-slot="popover-trigger"
            aria-haspopup="dialog"
            aria-expanded={popover.open}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={clearLongPress}
            onPointerCancel={clearLongPress}
            onContextMenu={handleContextMenu}
        >
            {children}
        </Text>
    );
}

PopoverTrigger.displayName = "Popover.Trigger";

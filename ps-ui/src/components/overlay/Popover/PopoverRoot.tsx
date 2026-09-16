"use client";

import { contains, normalizeTrigger } from "./Popover.utils";
import type { NormalizedTriggerMode } from "../../../types";
import { useControllableState } from "../../../hooks";
import type { PopoverProps } from "./Popover.types";
import { PopoverContext } from "./Popover.context";
import { Backdrop } from "../Backdrop";
import { cn } from "../../../utils";
import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

export function PopoverRoot({
    children,
    id,
    className,
    style,
    isOpen,
    defaultOpen = false,
    onOpenChange,
    trigger = "click",
    openDelay = 100,
    closeDelay = 180,
    longPressDelay = 520,
    longPressMoveThreshold = 8,
    closeOnInteractOutside = true,
    closeOnEscape = true,
    closeOnHoverLeave = true,
    restoreFocusOnClose = true,
    positioningRoot,
    portalContainer,
    backdrop = false,
    backdropOpacity,
    ...rootProps
}: PopoverProps) {
    const parentPopover = useContext(PopoverContext);
    const triggerRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);
    const contextPointRef = useRef<{ x: number; y: number } | null>(null);
    const descendantLayers = useRef(new Set<HTMLElement>());
    const restoreTargetRef = useRef<HTMLElement | null>(null);
    const openTimer = useRef<number | null>(null);
    const closeTimer = useRef<number | null>(null);
    const [anchorVersion, setAnchorVersion] = useState(0);
    const [motionVersion, setMotionVersion] = useState(0);
    const [focusRequest, setFocusRequest] = useState(0);
    const [openReason, setOpenReason] = useState<
        NormalizedTriggerMode | "manual" | null
    >(defaultOpen ? "manual" : null);
    const [open, setOpenState] = useControllableState({
        value: isOpen,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    });

    const clearTimers = useCallback(() => {
        if (openTimer.current !== null) window.clearTimeout(openTimer.current);
        if (closeTimer.current !== null)
            window.clearTimeout(closeTimer.current);
        openTimer.current = null;
        closeTimer.current = null;
    }, []);

    const setTriggerNode = useCallback((node: HTMLElement | null) => {
        triggerRef.current = node;
    }, []);

    const isInside = useCallback((target: Node | null) => {
        if (
            contains(triggerRef.current, target) ||
            contains(contentRef.current, target)
        ) {
            return true;
        }

        for (const layer of descendantLayers.current) {
            if (layer === target || layer.contains(target)) return true;
        }

        return false;
    }, []);

    const setOpen = useCallback(
        (
            next: boolean,
            reason: NormalizedTriggerMode | "manual" = "manual",
            focus = false,
        ) => {
            clearTimers();
            if (next && !open) {
                const active = document.activeElement;
                restoreTargetRef.current =
                    active instanceof HTMLElement ? active : triggerRef.current;
            }
            if (!next) {
                setOpenReason(null);
            } else {
                if (reason !== "context") contextPointRef.current = null;
                setOpenReason(reason);
            }
            if (next && focus) setFocusRequest((version) => version + 1);
            setOpenState(next);
        },
        [clearTimers, open, setOpenState],
    );

    const close = useCallback(() => setOpen(false), [setOpen]);

    const closeTree = useCallback(() => {
        close();
        if (!parentPopover) return;
        window.setTimeout(() => parentPopover.closeTree(), 36);
    }, [close, parentPopover]);

    const openAtPoint = useCallback(
        (point: { x: number; y: number }) => {
            contextPointRef.current = point;
            setAnchorVersion((version) => version + 1);
            setMotionVersion((version) => version + 1);
            setOpen(true, "context", true);
        },
        [setOpen],
    );

    const requestHoverOpen = useCallback(() => {
        if (!normalizeTrigger(trigger).has("hover")) return;
        if (closeTimer.current !== null)
            window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
        if (openTimer.current !== null) window.clearTimeout(openTimer.current);
        if (open) return;
        openTimer.current = window.setTimeout(
            () => setOpen(true, "hover"),
            openDelay,
        );
    }, [open, openDelay, setOpen, trigger]);

    const scheduleHoverClose = useCallback(() => {
        if (!closeOnHoverLeave) return;
        if (!normalizeTrigger(trigger).has("hover")) return;
        if (openReason !== "hover") return;
        if (openTimer.current !== null) window.clearTimeout(openTimer.current);
        if (closeTimer.current !== null)
            window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(
            () => setOpen(false),
            closeDelay,
        );
    }, [closeDelay, closeOnHoverLeave, openReason, setOpen, trigger]);

    const cancelHoverClose = useCallback(() => {
        if (closeTimer.current !== null)
            window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
    }, []);

    const getLayerContainers = useCallback(
        () => [...Array.from(descendantLayers.current)],
        [],
    );

    const registerLayer = useCallback(
        (node: HTMLElement) => {
            descendantLayers.current.add(node);
            const cleanupParent = parentPopover?.registerLayer(node);
            return () => {
                descendantLayers.current.delete(node);
                cleanupParent?.();
            };
        },
        [parentPopover],
    );

    const registerContentLayer = useCallback(
        (node: HTMLElement) =>
            parentPopover?.registerLayer(node) ?? (() => undefined),
        [parentPopover],
    );

    useEffect(() => () => clearTimers(), [clearTimers]);

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (event: PointerEvent) => {
            if (!closeOnInteractOutside) return;
            if (isInside(event.target as Node | null)) return;
            setOpen(false);
        };

        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            if (!closeOnEscape || event.key !== "Escape") return;
            if (event.defaultPrevented) return;
            if (descendantLayers.current.size > 0) return;
            event.preventDefault();
            setOpen(false, "manual", true);
        };

        const onContextMenu = (event: globalThis.MouseEvent) => {
            if (
                !normalizeTrigger(trigger).has("context") ||
                event.defaultPrevented
            ) {
                return;
            }

            const target = event.target as Node | null;
            if (
                !contains(triggerRef.current, target) &&
                !contains(contentRef.current, target)
            ) {
                return;
            }
            if (contains(triggerRef.current, target)) return;

            event.preventDefault();
            openAtPoint({ x: event.clientX, y: event.clientY });
        };

        document.addEventListener("pointerdown", onPointerDown, true);
        document.addEventListener("keydown", onKeyDown, true);
        document.addEventListener("contextmenu", onContextMenu);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown, true);
            document.removeEventListener("keydown", onKeyDown, true);
            document.removeEventListener("contextmenu", onContextMenu);
        };
    }, [
        closeOnEscape,
        closeOnInteractOutside,
        isInside,
        open,
        openAtPoint,
        setOpen,
        trigger,
    ]);

    useEffect(() => {
        if (open || !restoreFocusOnClose) return;
        restoreTargetRef.current?.focus?.({ preventScroll: true });
    }, [open, restoreFocusOnClose]);

    const backdropVariant = backdrop === true ? "backdrop" : backdrop;

    const contextValue = useMemo(
        () => ({
            open,
            openReason,
            setOpen,
            openAtPoint,
            close,
            closeTree,
            trigger,
            openDelay,
            closeDelay,
            longPressDelay,
            longPressMoveThreshold,
            requestHoverOpen,
            scheduleHoverClose,
            cancelHoverClose,
            triggerRef,
            setTriggerNode,
            contentRef,
            contextPointRef,
            anchorVersion,
            motionVersion,
            focusRequest,
            getLayerContainers,
            positioningRoot,
            portalContainer,
            registerLayer,
            registerContentLayer,
            isInside,
        }),
        [
            anchorVersion,
            cancelHoverClose,
            close,
            closeDelay,
            closeTree,
            focusRequest,
            getLayerContainers,
            isInside,
            longPressDelay,
            longPressMoveThreshold,
            motionVersion,
            open,
            openAtPoint,
            openDelay,
            openReason,
            portalContainer,
            positioningRoot,
            registerContentLayer,
            registerLayer,
            requestHoverOpen,
            scheduleHoverClose,
            setOpen,
            setTriggerNode,
            trigger,
        ],
    );

    const hasRootElement =
        id !== undefined ||
        className !== undefined ||
        style !== undefined ||
        Object.keys(rootProps).length > 0;
    const content = (
        <>
            {backdropVariant && (
                <Backdrop
                    open={open}
                    variant={backdropVariant}
                    opacity={backdropOpacity}
                />
            )}
            {children}
        </>
    );

    return (
        <PopoverContext.Provider value={contextValue}>
            {hasRootElement ? (
                <span
                    {...rootProps}
                    id={id}
                    className={cn("ps-popover__root", className)}
                    style={style}
                    data-slot="popover"
                >
                    {content}
                </span>
            ) : (
                content
            )}
        </PopoverContext.Provider>
    );
}

PopoverRoot.displayName = "Popover";

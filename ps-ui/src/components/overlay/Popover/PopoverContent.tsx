"use client";

import { cn, resolveRadius, resolveShadow, resolveSpace } from "../../../utils";
import { PopoverLayerContext, usePopoverContext } from "./Popover.context";
import { usePopoverContentPosition } from "./PopoverContent.position";
import { composeRefs } from "../../../hooks/refs/useComposedRefs";
import type { PopoverContentProps } from "./Popover.types";
import { type PositionPlacement } from "../../../types";
import { Portal } from "../../utility/Portal";
import {
    usePopoverContentAutoFocus,
    usePopoverContentFocusScope,
} from "./PopoverContent.focus";
import {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
    type AnimationEvent,
    type CSSProperties,
    type PointerEvent as ReactPointerEvent,
} from "react";

function callPointerHandler<T extends HTMLElement>(
    handler: ((event: ReactPointerEvent<T>) => void) | undefined,
    event: ReactPointerEvent<T>,
) {
    handler?.(event);
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
    (
        {
            children,
            className,
            style,
            placement = "bottom start",
            gap = 8,
            crossOffset = 0,
            arrowGap = 0,
            arrowSize = 10,
            showArrow = false,
            shouldFlip = true,
            fallbackSides,
            containerPadding = 8,
            width,
            matchTriggerWidth = false,
            minWidth,
            maxWidth,
            maxHeight,
            fitViewport = false,
            padding,
            background,
            radius,
            shadow,
            scrollbar = "thin",
            forceMount = false,
            focusScope = false,
            autoFocusOnOpen = true,
            trackLayoutShift = true,
            arrowClassName,
            onPointerEnter,
            onPointerLeave,
            role = "dialog",
            ...props
        },
        ref,
    ) => {
        const popover = usePopoverContext("Popover.Content");
        const localRef = useRef<HTMLElement | null>(null);
        const cleanupRef = useRef<(() => void) | null>(null);
        const [mounted, setMounted] = useState(forceMount || popover.open);
        const [exiting, setExiting] = useState(false);
        const contextOpen = Boolean(popover.contextPointRef.current);
        const { positioned, positionStyle, side } = usePopoverContentPosition({
            localRef,
            popover,
            mounted,
            placement,
            gap,
            crossOffset,
            arrowGap,
            arrowSize,
            showArrow,
            shouldFlip,
            fallbackSides,
            containerPadding,
            width,
            matchTriggerWidth,
            minWidth,
            maxWidth,
            maxHeight,
            fitViewport,
            trackLayoutShift,
        });

        useEffect(() => {
            if (popover.open) {
                setMounted(true);
                setExiting(false);
            } else if (mounted && !forceMount) {
                setExiting(true);
            }
        }, [forceMount, mounted, popover.open]);

        useEffect(() => {
            if (!exiting || forceMount) return;
            const fallbackTimer = window.setTimeout(() => {
                setMounted(false);
                setExiting(false);
            }, 240);

            return () => window.clearTimeout(fallbackTimer);
        }, [exiting, forceMount]);

        const setNode = useCallback(
            (node: HTMLElement | null) => {
                cleanupRef.current?.();
                cleanupRef.current = null;
                localRef.current = node;
                popover.contentRef.current = node;
                if (node) {
                    cleanupRef.current = popover.registerContentLayer(node);
                }
            },
            [popover],
        );

        useEffect(() => () => cleanupRef.current?.(), []);

        const { focusRequest, getLayerContainers, open: popoverOpen } = popover;

        usePopoverContentAutoFocus({
            autoFocusOnOpen,
            focusRequest,
            getLayerContainers,
            localRef,
            mounted,
            open: popoverOpen,
        });

        usePopoverContentFocusScope({
            focusScope,
            localRef,
            mounted,
            open: popoverOpen,
        });

        if (!mounted && !forceMount) return null;

        const tokenStyle = {
            ...(padding !== undefined && {
                "--ps-popover-padding": resolveSpace(padding),
            }),
            ...(background !== undefined && { "--ps-popover-bg": background }),
            ...(radius !== undefined && {
                "--ps-popover-radius": resolveRadius(radius),
            }),
            ...(shadow !== undefined && {
                "--ps-popover-shadow": resolveShadow(shadow),
            }),
        } as CSSProperties;

        const portalContainer =
            popover.portalContainer ??
            popover.triggerRef.current?.closest<HTMLElement>("[data-theme]") ??
            undefined;

        const basePositionStyle = {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: "var(--ps-z-popover)",
            visibility: positioned ? undefined : "hidden",
            transformOrigin: "var(--ps-popover-origin)",
        } as CSSProperties;
        const forcedPositionStyle = {
            position: "fixed",
            visibility: positioned ? style?.visibility : "hidden",
            transformOrigin: "var(--ps-popover-origin)",
        } as CSSProperties;
        const contentStyle = {
            ...basePositionStyle,
            ...tokenStyle,
            ...style,
            ...positionStyle,
            ...forcedPositionStyle,
        } as CSSProperties;

        return (
            <Portal container={portalContainer}>
                <PopoverLayerContext.Provider
                    value={{ placement: placement as PositionPlacement, side }}
                >
                    <div
                        key={popover.motionVersion}
                        {...props}
                        ref={composeRefs(ref, setNode)}
                        role={role}
                        data-slot="popover-content"
                        data-popover-content="true"
                        data-motion-version={popover.motionVersion}
                        data-placement={side}
                        data-positioned={positioned || undefined}
                        data-entering={
                            popover.open && !exiting ? true : undefined
                        }
                        data-exiting={exiting ? true : undefined}
                        data-context={contextOpen || undefined}
                        data-arrow={showArrow || undefined}
                        data-scrollbar={scrollbar}
                        className={cn("ps-popover__content", className)}
                        style={contentStyle}
                        onPointerEnter={(
                            event: ReactPointerEvent<HTMLDivElement>,
                        ) => {
                            popover.cancelHoverClose();
                            callPointerHandler(onPointerEnter, event);
                        }}
                        onPointerLeave={(
                            event: ReactPointerEvent<HTMLDivElement>,
                        ) => {
                            popover.scheduleHoverClose();
                            callPointerHandler(onPointerLeave, event);
                        }}
                        onAnimationEnd={(
                            event: AnimationEvent<HTMLDivElement>,
                        ) => {
                            props.onAnimationEnd?.(event);
                            if (
                                event.currentTarget !== event.target ||
                                !exiting
                            ) {
                                return;
                            }
                            setMounted(forceMount);
                            setExiting(false);
                        }}
                    >
                        {showArrow && (
                            <span
                                className={cn(
                                    "ps-popover__arrow",
                                    arrowClassName,
                                )}
                                aria-hidden="true"
                            />
                        )}
                        {children}
                    </div>
                </PopoverLayerContext.Provider>
            </Portal>
        );
    },
);

PopoverContent.displayName = "Popover.Content";

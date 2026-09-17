"use client";

import { Popover, usePopoverLayerContext } from "../../overlay/Popover";
import { composeRefs } from "../../../hooks/refs/useComposedRefs";
import type { SubMenuContentProps } from "./SubMenu.types";
import { useSubMenuContext } from "./SubMenu.context";
import { forwardRef, useLayoutEffect } from "react";
import type { PositionSide } from "../../../types";
import {
    defaultPlacement,
    fallbackSidesFor,
    focusMenuContainer,
    scheduleElementFocus,
} from "./SubMenu.utils";

export const SubMenuContent = forwardRef<HTMLDivElement, SubMenuContentProps>(
    (
        {
            children,
            placement,
            gap,
            crossOffset,
            fallbackSides,
            fitViewport = true,
            onPointerEnter,
            onPointerLeave,
            onKeyDown,
            ...props
        },
        ref,
    ) => {
        const submenu = useSubMenuContext("SubMenu.Content");
        const parentLayer = usePopoverLayerContext();
        const resolvedPlacement =
            placement ??
            defaultPlacement(parentLayer?.side, submenu.triggerRef.current);
        const side = String(resolvedPlacement).split(/[ -]/)[0] as PositionSide;

        useLayoutEffect(() => {
            if (!submenu.open || !submenu.focusOnOpenRef.current) return;
            const focusRequestedItem = () => {
                if (!submenu.openRef.current) return;
                focusMenuContainer(submenu.contentRef.current);
                submenu.focusOnOpenRef.current = false;
            };
            const frame = window.requestAnimationFrame(focusRequestedItem);
            const timeouts = [0, 16, 50, 120].map((delay) =>
                window.setTimeout(focusRequestedItem, delay),
            );
            return () => {
                window.cancelAnimationFrame(frame);
                timeouts.forEach((timeout) => window.clearTimeout(timeout));
            };
        }, [submenu]);

        return (
            <Popover.Content
                {...props}
                ref={composeRefs(ref, submenu.contentRef)}
                placement={resolvedPlacement}
                gap={gap ?? submenu.gap}
                crossOffset={crossOffset ?? submenu.crossOffset}
                fallbackSides={fallbackSides ?? fallbackSidesFor(side)}
                fitViewport={fitViewport}
                onPointerEnter={(event) => {
                    submenu.cancelCloseTree();
                    onPointerEnter?.(event);
                }}
                onPointerLeave={(event) => {
                    submenu.scheduleClose();
                    onPointerLeave?.(event);
                }}
                onKeyDown={(event) => {
                    onKeyDown?.(event);
                    if (event.defaultPrevented) return;
                    const actualSide =
                        event.currentTarget.getAttribute("data-placement");
                    const closeKey =
                        actualSide === "left" ? "ArrowRight" : "ArrowLeft";
                    if (event.key !== closeKey) return;
                    event.preventDefault();
                    event.stopPropagation();
                    const triggerNode = submenu.triggerRef.current;
                    submenu.setOpen(false);
                    scheduleElementFocus(
                        () => triggerNode ?? submenu.triggerRef.current,
                    );
                }}
            >
                {children}
            </Popover.Content>
        );
    },
);

SubMenuContent.displayName = "SubMenu.Content";

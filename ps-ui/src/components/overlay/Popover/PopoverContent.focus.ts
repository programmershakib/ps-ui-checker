"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { focusFirst, getTabbableEdges } from "../../../utils";
import { focusMenuContainer } from "./Popover.utils";

interface AutoFocusOptions {
    autoFocusOnOpen: boolean;
    focusRequest: number;
    getLayerContainers: () => HTMLElement[];
    localRef: RefObject<HTMLElement | null>;
    mounted: boolean;
    open: boolean;
}

interface FocusScopeOptions {
    focusScope: boolean;
    localRef: RefObject<HTMLElement | null>;
    mounted: boolean;
    open: boolean;
}

export function usePopoverContentAutoFocus({
    autoFocusOnOpen,
    focusRequest,
    getLayerContainers,
    localRef,
    mounted,
    open,
}: AutoFocusOptions) {
    useLayoutEffect(() => {
        if (!mounted || !open || (!focusRequest && !autoFocusOnOpen)) return;

        const focusRequestedMenu = () => {
            focusMenuContainer(localRef.current, getLayerContainers());
        };

        const frame = window.requestAnimationFrame(focusRequestedMenu);
        const timeouts = [0, 16, 50, 120].map((delay) =>
            window.setTimeout(focusRequestedMenu, delay),
        );

        return () => {
            window.cancelAnimationFrame(frame);
            timeouts.forEach((timeout) => window.clearTimeout(timeout));
        };
    }, [
        autoFocusOnOpen,
        focusRequest,
        getLayerContainers,
        localRef,
        mounted,
        open,
    ]);
}

export function usePopoverContentFocusScope({
    focusScope,
    localRef,
    mounted,
    open,
}: FocusScopeOptions) {
    useEffect(() => {
        if (!mounted || !open || !focusScope) return;

        const node = localRef.current;
        if (!node) return;

        let lastFocusedInside: HTMLElement | null = null;
        const isInside = (target: EventTarget | null) =>
            target instanceof Node && node.contains(target);

        const focusInside = () => {
            const [first] = getTabbableEdges(node);
            focusFirst([lastFocusedInside, first, node], { select: true });
        };

        const handleFocusIn = (event: globalThis.FocusEvent) => {
            if (isInside(event.target)) {
                lastFocusedInside = event.target as HTMLElement;
                return;
            }
            focusInside();
        };

        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key !== "Tab") return;

            const [first, last] = getTabbableEdges(node);
            if (!first || !last) {
                event.preventDefault();
                node.focus({ preventScroll: true });
                return;
            }

            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus({ preventScroll: true });
            } else if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus({ preventScroll: true });
            }
        };

        document.addEventListener("focusin", handleFocusIn);
        node.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("focusin", handleFocusIn);
            node.removeEventListener("keydown", handleKeyDown);
        };
    }, [focusScope, localRef, mounted, open]);
}

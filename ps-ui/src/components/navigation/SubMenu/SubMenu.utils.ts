import type { ReactElement, Ref } from "react";
import type {
    NormalizedTriggerMode,
    TriggerType,
    PositionPlacement,
    PositionSide,
} from "../../../types";

export function normalizeTrigger(trigger: TriggerType = "hover") {
    const values = Array.isArray(trigger) ? trigger : [trigger];
    const modes = new Set<NormalizedTriggerMode>();

    values.forEach((value) => {
        if (value === "both") {
            modes.add("click");
            modes.add("hover");
            modes.add("longPress");
            modes.add("context");
            return;
        }
        if (
            value === "contextMenu" ||
            value === "rightClick" ||
            value === "right-click"
        ) {
            modes.add("context");
            return;
        }
        if (
            value === "click" ||
            value === "hover" ||
            value === "longPress" ||
            value === "context"
        ) {
            modes.add(value);
        }
    });

    if (!modes.size && trigger !== "manual") modes.add("hover");
    return modes;
}

export function contains(node: HTMLElement | null, target: EventTarget | null) {
    return Boolean(
        node &&
        target instanceof Node &&
        (node === target || node.contains(target)),
    );
}

export function getElementRef(element: ReactElement) {
    return (element.props as { ref?: Ref<HTMLElement> }).ref;
}

function hasSlot(node: HTMLElement, slot: string) {
    return (node.getAttribute("data-slot") ?? "")
        .split(/\s+/)
        .filter(Boolean)
        .includes(slot);
}

function hasMenuFocus(node: HTMLElement | null) {
    const active = document.activeElement;

    return Boolean(
        node &&
        active instanceof HTMLElement &&
        node.contains(active) &&
        (hasSlot(active, "menu") || hasSlot(active, "menu-item")),
    );
}

export function focusMenuContainer(node: HTMLElement | null) {
    if (!node || hasMenuFocus(node)) return;
    const menu = hasSlot(node, "menu")
        ? node
        : node.querySelector<HTMLElement>('[data-slot~="menu"]');
    menu?.focus({ preventScroll: true });
}

export function scheduleElementFocus(getElement: () => HTMLElement | null) {
    [0, 16, 50].forEach((delay) => {
        window.setTimeout(
            () => getElement()?.focus({ preventScroll: true }),
            delay,
        );
    });
}

export function isRTL(node: HTMLElement | null) {
    const nearestDir = node?.closest<HTMLElement>("[dir]")?.dir;
    return (nearestDir || document.documentElement.dir) === "rtl";
}

export function defaultPlacement(
    parentSide?: PositionSide,
    triggerNode?: HTMLElement | null,
): PositionPlacement {
    return parentSide === "left" || (!parentSide && isRTL(triggerNode ?? null))
        ? "left top"
        : "right top";
}

export function fallbackSidesFor(side: PositionSide): PositionSide[] {
    if (side === "left") return ["left", "right", "bottom", "top"];
    return ["right", "left", "bottom", "top"];
}

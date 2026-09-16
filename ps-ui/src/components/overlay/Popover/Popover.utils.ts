import type { ReactElement, Ref } from "react";
import type {
    ElementLike,
    NormalizedTriggerMode,
    TriggerType,
} from "../../../types";

export function resolveElement(target: ElementLike) {
    if (!target || typeof document === "undefined") return null;
    if (typeof target === "function") return target();
    if ("current" in target) return target.current;
    return target;
}

export function px(value: number) {
    return `${Math.round(value * 100) / 100}px`;
}

export function cssSize(value?: number | string) {
    if (value === undefined) return undefined;
    return typeof value === "number" ? `${value}px` : value;
}

export function contains(node: HTMLElement | null, target: Node | null) {
    return Boolean(
        node && target && (node === target || node.contains(target)),
    );
}

export function normalizeTrigger(trigger: TriggerType = "click") {
    const values = Array.isArray(trigger) ? trigger : [trigger];
    const modes = new Set<NormalizedTriggerMode>();

    values.forEach((value) => {
        if (value === "manual") return;
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

    if (!modes.size && trigger !== "manual") modes.add("click");
    return modes;
}

export function getElementRef(element: ReactElement) {
    return (element.props as { ref?: Ref<HTMLElement> }).ref;
}

export function createVirtualAnchor(point: { x: number; y: number }) {
    const rect = new DOMRect(point.x, point.y, 1, 1);
    return { getBoundingClientRect: () => rect };
}

function hasSlot(node: HTMLElement, slot: string) {
    return (node.getAttribute("data-slot") ?? "")
        .split(/\s+/)
        .filter(Boolean)
        .includes(slot);
}

function hasMenuFocus(
    node: HTMLElement | null,
    extraContainers: HTMLElement[] = [],
) {
    const active = document.activeElement;
    const containers = [node, ...extraContainers].filter(
        Boolean,
    ) as HTMLElement[];
    return Boolean(
        active instanceof HTMLElement &&
        (hasSlot(active, "menu") || hasSlot(active, "menu-item")) &&
        containers.some((container) => container.contains(active)),
    );
}

export function focusMenuContainer(
    node: HTMLElement | null,
    extraContainers: HTMLElement[] = [],
) {
    if (!node || hasMenuFocus(node, extraContainers)) return;

    const menu = hasSlot(node, "menu")
        ? node
        : node.querySelector<HTMLElement>('[data-slot~="menu"]');

    menu?.focus({ preventScroll: true });
}

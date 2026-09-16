import type { MenuItemRegistration } from "./Menu.context";
import type {
    MenuIndicatorRenderer,
    MenuItemProps,
    MenuItemRenderState,
    Selection,
    SelectionKey,
} from "./Menu.types";

export function normalizeKeys(
    keys?: Selection | Iterable<SelectionKey> | null,
): Selection {
    if (!keys) return new Set();
    if (keys === "all") return "all";
    return keys instanceof Set ? keys : new Set(keys);
}

export function keySelected(selected: Selection, key: SelectionKey) {
    return selected === "all" || selected.has(key);
}

export function keyDisabled(disabled: Selection, key: SelectionKey) {
    return disabled === "all" || disabled.has(key);
}

export function fallbackText(
    children: MenuItemProps["children"],
    id: SelectionKey,
) {
    if (typeof children === "string" || typeof children === "number") {
        return String(children);
    }
    return String(id);
}

export function defaultTypeaheadNormalizer(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase();
}

export function domIdSegment(key: SelectionKey) {
    return String(key).replace(/[^A-Za-z0-9_-]/g, "-") || "item";
}

export function sortItems(items: MenuItemRegistration[]) {
    return [...items].sort((a, b) => {
        const aNode = a.ref.current;
        const bNode = b.ref.current;
        if (!aNode || !bNode || aNode === bNode) return 0;
        return aNode.compareDocumentPosition(bNode) &
            Node.DOCUMENT_POSITION_PRECEDING
            ? 1
            : -1;
    });
}

export function renderCustomIndicator(
    indicator: MenuIndicatorRenderer | undefined,
    state: MenuItemRenderState,
) {
    if (indicator === undefined) return null;
    return typeof indicator === "function" ? indicator(state) : indicator;
}

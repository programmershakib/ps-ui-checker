import type { ContainerLike } from "../../types";

export function resolveContainers(
    containers?: Array<ContainerLike>,
): HTMLElement[] {
    if (!containers?.length) return [];

    const nodes: HTMLElement[] = [];

    const pushNode = (node: HTMLElement | null | undefined) => {
        if (node) nodes.push(node);
    };

    for (const entry of containers) {
        if (!entry) continue;

        if (typeof entry === "function") {
            const resolved = entry();
            if (Array.isArray(resolved)) resolved.forEach(pushNode);
            else pushNode(resolved);
            continue;
        }

        if ("current" in entry) pushNode(entry.current);
        else pushNode(entry);
    }

    return nodes;
}

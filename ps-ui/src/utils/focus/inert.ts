function containsAny(keepers: HTMLElement[], node: HTMLElement) {
    return keepers.some((keeper) => keeper === node || keeper.contains(node));
}

function shouldKeepNode(node: HTMLElement, keepers: HTMLElement[]) {
    return (
        containsAny(keepers, node) ||
        keepers.some((keeper) => node.contains(keeper))
    );
}

function setHidden(node: HTMLElement, hidden: boolean) {
    const target = node as HTMLElement & { inert?: boolean };
    if (hidden) {
        target.inert = true;
        node.setAttribute("aria-hidden", "true");
    } else {
        target.inert = false;
        node.removeAttribute("aria-hidden");
    }
}

export function inertOutside(keepers: HTMLElement[]) {
    const body = document.body;
    const touched = new Map<
        HTMLElement,
        { inert: boolean; ariaHidden: string | null }
    >();

    const remember = (node: HTMLElement) => {
        if (touched.has(node) || shouldKeepNode(node, keepers)) return;
        touched.set(node, {
            inert: Boolean((node as HTMLElement & { inert?: boolean }).inert),
            ariaHidden: node.getAttribute("aria-hidden"),
        });
        setHidden(node, true);
    };

    for (const keeper of keepers) {
        let current: HTMLElement | null = keeper;

        while (current && current !== body) {
            const parent: HTMLElement | null = current.parentElement;
            if (!parent) break;
            Array.from(parent.children).forEach((sibling) => {
                if (sibling instanceof HTMLElement) remember(sibling);
            });
            current = parent;
        }
    }

    return () => {
        touched.forEach((previous, node) => {
            (node as HTMLElement & { inert?: boolean }).inert = previous.inert;
            if (previous.ariaHidden === null)
                node.removeAttribute("aria-hidden");
            else node.setAttribute("aria-hidden", previous.ariaHidden);
        });
    };
}

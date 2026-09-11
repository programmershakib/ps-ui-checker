const FOCUSABLE_SELECTOR = [
    "a[href]",
    "area[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "iframe",
    "audio[controls]",
    "video[controls]",
    "details > summary:first-of-type",
    "[contenteditable]:not([contenteditable='false'])",
    "[tabindex]",
].join(",");

function isDisplayNone(el: HTMLElement): boolean {
    if (el.style.display === "none") return true;
    return typeof window !== "undefined"
        ? window.getComputedStyle(el).display === "none"
        : false;
}

function isVisuallyHidden(el: HTMLElement): boolean {
    if (typeof window === "undefined") return false;
    const { visibility } = window.getComputedStyle(el);
    return visibility === "hidden" || visibility === "collapse";
}

function isRendered(el: HTMLElement): boolean {
    if (!el.isConnected) return false;

    let node: HTMLElement | null = el;
    while (node) {
        if (isDisplayNone(node)) return false;
        node = node.parentElement;
    }
    return true;
}

export function isTabbable(el: Element | null): el is HTMLElement {
    if (!el || !(el instanceof HTMLElement)) return false;
    if (el.tabIndex < 0) return false;
    if ((el as HTMLInputElement).disabled) return false;
    if (el.hidden) return false;
    if (el.getAttribute("aria-hidden") === "true") return false;
    if (!isRendered(el)) return false;
    if (isVisuallyHidden(el)) return false;
    return true;
}

export function getTabbableCandidates(container: HTMLElement): HTMLElement[] {
    const all = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter(isTabbable);

    const positive: HTMLElement[] = [];
    const natural: HTMLElement[] = [];

    for (const el of all) {
        if (el.tabIndex > 0) positive.push(el);
        else natural.push(el);
    }

    positive.sort((a, b) => a.tabIndex - b.tabIndex);

    return [...positive, ...natural];
}

export function getTabbableEdges(
    container: HTMLElement,
): [first: HTMLElement | null, last: HTMLElement | null] {
    const candidates = getTabbableCandidates(container);
    return [candidates[0] ?? null, candidates[candidates.length - 1] ?? null];
}

function isSelectableInput(el: HTMLElement): el is HTMLInputElement {
    return el instanceof HTMLInputElement && typeof el.select === "function";
}

interface FocusFirstOptions {
    select?: boolean;
}

export function focusFirst(
    candidates: Array<HTMLElement | null | undefined>,
    options: FocusFirstOptions = {},
): boolean {
    const previouslyFocused = document.activeElement;

    for (const candidate of candidates) {
        if (!candidate) continue;
        if (candidate === previouslyFocused) return true;

        candidate.focus({ preventScroll: true });

        if (document.activeElement === candidate) {
            if (options.select && isSelectableInput(candidate)) {
                candidate.select();
            }
            return true;
        }
    }

    return false;
}

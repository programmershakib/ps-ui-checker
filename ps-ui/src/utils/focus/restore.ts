import { getTabbableCandidates } from "./tabbable";

const RESTORE_FRAME_ATTEMPTS = 8;
const RESTORE_TIMEOUTS = [30, 80, 160, 320] as const;

function isDirectlyFocusable(node: HTMLElement) {
    if (!node.isConnected || node.closest("[inert]")) return false;
    if (node.hasAttribute("disabled")) return false;
    return (
        node.tabIndex >= 0 ||
        /^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/i.test(node.tagName)
    );
}

function resolveRestorable(node: HTMLElement | null | undefined) {
    if (!node?.isConnected) return null;
    if (isDirectlyFocusable(node)) return node;
    return getTabbableCandidates(node)[0] ?? null;
}

export function restoreFocus(
    target: HTMLElement | null | undefined,
    fallback?: HTMLElement | null,
    options: { guard?: () => boolean; attempts?: number } = {},
) {
    const getTarget = () =>
        resolveRestorable(target) ?? resolveRestorable(fallback);
    const shouldRun = () => options.guard?.() ?? true;
    const focus = () => {
        if (!shouldRun()) return true;
        const node = getTarget();
        if (!node) return false;
        if (
            document.activeElement === node ||
            node.contains(document.activeElement)
        )
            return true;

        node.focus({ preventScroll: true });
        return (
            document.activeElement === node ||
            node.contains(document.activeElement)
        );
    };

    let frameAttempt = 0;
    const maxFrameAttempts = options.attempts ?? RESTORE_FRAME_ATTEMPTS;
    const runFrame = () => {
        if (focus() || frameAttempt >= maxFrameAttempts) return;
        frameAttempt += 1;
        window.requestAnimationFrame(runFrame);
    };

    queueMicrotask(runFrame);
    window.requestAnimationFrame(runFrame);
    RESTORE_TIMEOUTS.forEach((delay) => window.setTimeout(focus, delay));
}

import { focusFirst, getTabbableEdges } from "../../../utils/focus/tabbable";
import { useComposedRefs } from "../../../hooks/refs/useComposedRefs";
import { useCallbackRef } from "../../../hooks/refs/useCallbackRef";
import type { FocusTrapProps } from "./FocusTrap.types";
import { cn } from "../../../utils/class-names/cn";
import {
    focusScopesStack,
    type StackableFocusScope,
} from "../../../utils/focus/focus-scope-stack";
import {
    forwardRef,
    memo,
    useEffect,
    useRef,
    useState,
    type ElementType,
} from "react";

function resolveTarget(
    target?: HTMLElement | (() => HTMLElement | null),
): HTMLElement | null {
    if (typeof target === "function") return target();
    return target ?? null;
}

const FocusTrap = forwardRef<HTMLElement, FocusTrapProps>(
    (
        {
            as: Component = "div" as ElementType,
            id,
            style,
            className,
            active = true,
            paused = false,
            autoFocus = true,
            restoreFocus = true,
            initialFocus,
            fallbackFocus,
            onActivate,
            onDeactivate,
            onFocusOutside,
            onEscapeKeyDown,
            children,
            ...rest
        },
        forwardedRef,
    ) => {
        const [container, setContainer] = useState<HTMLElement | null>(null);
        const composedRefs = useComposedRefs(forwardedRef, setContainer);

        const onActivateRef = useCallbackRef(onActivate);
        const onDeactivateRef = useCallbackRef(onDeactivate);
        const onFocusOutsideRef = useCallbackRef(onFocusOutside);
        const onEscapeKeyDownRef = useCallbackRef(onEscapeKeyDown);
        const pausedRef = useRef(paused);
        pausedRef.current = paused;

        const lastFocusedInsideRef = useRef<HTMLElement | null>(null);
        const previouslyFocusedRef = useRef<HTMLElement | null>(null);

        useEffect(() => {
            if (!container || !active) return;

            previouslyFocusedRef.current =
                document.activeElement as HTMLElement | null;
            onActivateRef();

            const alreadyFocusedInside =
                previouslyFocusedRef.current !== container &&
                container.contains(previouslyFocusedRef.current);

            if (autoFocus && !alreadyFocusedInside) {
                const target =
                    resolveTarget(initialFocus) ??
                    getTabbableEdges(container)[0] ??
                    resolveTarget(fallbackFocus);
                focusFirst([target, container], { select: true });
            }

            return () => {
                onDeactivateRef();

                if (restoreFocus) {
                    focusFirst([previouslyFocusedRef.current, document.body]);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [container, active, autoFocus, restoreFocus]);

        useEffect(() => {
            if (!container || !active) return;

            const scope: StackableFocusScope = {
                container,
                paused: false,
                pause() {
                    this.paused = true;
                },
                resume() {
                    this.paused = false;
                },
            };

            focusScopesStack.add(scope);

            const isSuspended = () => scope.paused || pausedRef.current;

            const handleFocusIn = (event: FocusEvent) => {
                if (isSuspended()) return;

                const target = event.target as HTMLElement | null;
                if (container.contains(target)) {
                    lastFocusedInsideRef.current = target;
                } else {
                    focusFirst(
                        [
                            lastFocusedInsideRef.current,
                            getTabbableEdges(container)[0],
                            container,
                        ],
                        { select: true },
                    );
                }
            };

            const handlePointerDownOutside = (event: MouseEvent) => {
                if (isSuspended()) return;

                const target = event.target as HTMLElement | null;
                if (!target || container.contains(target)) return;

                let prevented = false;
                onFocusOutsideRef({
                    originalEvent: event as unknown as FocusEvent,
                    preventDefault: () => {
                        prevented = true;
                    },
                });

                if (!prevented) {
                    event.preventDefault();
                    focusFirst([lastFocusedInsideRef.current, container], {
                        select: true,
                    });
                }
            };

            const handleKeyDown = (event: KeyboardEvent) => {
                if (isSuspended()) return;

                if (event.key === "Escape") {
                    let prevented = false;
                    onEscapeKeyDownRef({
                        originalEvent: event,
                        preventDefault: () => {
                            prevented = true;
                        },
                    });
                    if (prevented) event.preventDefault();
                    return;
                }

                if (event.key !== "Tab") return;

                const [first, last] = getTabbableEdges(container);
                if (!first || !last) {
                    event.preventDefault();
                    container.focus({ preventScroll: true });
                    return;
                }

                if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                } else if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                }
            };

            document.addEventListener("focusin", handleFocusIn);
            document.addEventListener(
                "mousedown",
                handlePointerDownOutside,
                true,
            );
            container.addEventListener("keydown", handleKeyDown);

            return () => {
                document.removeEventListener("focusin", handleFocusIn);
                document.removeEventListener(
                    "mousedown",
                    handlePointerDownOutside,
                    true,
                );
                container.removeEventListener("keydown", handleKeyDown);
                focusScopesStack.remove(scope);
            };
        }, [container, active, onFocusOutsideRef, onEscapeKeyDownRef]);

        return (
            <Component
                {...rest}
                ref={composedRefs}
                id={id}
                style={style}
                className={cn("ps-focus-trap", className)}
                tabIndex={-1}
            >
                {children}
            </Component>
        );
    },
);

const MemoizedFocusTrap = memo(FocusTrap);

MemoizedFocusTrap.displayName = "FocusTrap";

export default MemoizedFocusTrap;

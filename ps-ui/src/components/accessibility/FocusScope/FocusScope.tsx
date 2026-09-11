import { focusFirst, getTabbableEdges } from "../../../utils/focus/tabbable";
import { useComposedRefs } from "../../../hooks/refs/useComposedRefs";
import { useCallbackRef } from "../../../hooks/refs/useCallbackRef";
import type { FocusScopeProps } from "./FocusScope.types";
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

const AUTO_FOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
const AUTO_FOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
const CUSTOM_EVENT_INIT: CustomEventInit = { bubbles: false, cancelable: true };

function resolveTarget(
    target?: HTMLElement | (() => HTMLElement | null),
): HTMLElement | null {
    if (typeof target === "function") return target();
    return target ?? null;
}

const FocusScope = forwardRef<HTMLElement, FocusScopeProps>(
    (
        {
            as: Component = "div" as ElementType,
            id,
            style,
            className,
            contain = false,
            loop = false,
            autoFocus = true,
            restoreFocus = true,
            initialFocus,
            onMountAutoFocus,
            onUnmountAutoFocus,
            onFocusOutside,
            onEscapeKeyDown,
            children,
            ...rest
        },
        forwardedRef,
    ) => {
        const [container, setContainer] = useState<HTMLElement | null>(null);
        const composedRefs = useComposedRefs(forwardedRef, setContainer);

        const onMountAutoFocusRef = useCallbackRef(onMountAutoFocus);
        const onUnmountAutoFocusRef = useCallbackRef(onUnmountAutoFocus);
        const onFocusOutsideRef = useCallbackRef(onFocusOutside);
        const onEscapeKeyDownRef = useCallbackRef(onEscapeKeyDown);

        const containRef = useRef(contain);
        containRef.current = contain;
        const loopRef = useRef(loop);
        loopRef.current = loop;

        const lastFocusedInsideRef = useRef<HTMLElement | null>(null);

        useEffect(() => {
            if (!container || !autoFocus) return;

            const previouslyFocused =
                document.activeElement as HTMLElement | null;

            const alreadyFocusedInside =
                previouslyFocused !== container &&
                container.contains(previouslyFocused);

            const mountEvent = new CustomEvent(
                AUTO_FOCUS_ON_MOUNT,
                CUSTOM_EVENT_INIT,
            );
            const handleMountEvent = () => onMountAutoFocusRef(mountEvent);
            container.addEventListener(
                AUTO_FOCUS_ON_MOUNT,
                handleMountEvent as EventListener,
            );
            container.dispatchEvent(mountEvent);

            if (!mountEvent.defaultPrevented && !alreadyFocusedInside) {
                const target =
                    resolveTarget(initialFocus) ??
                    getTabbableEdges(container)[0];
                focusFirst([target, container], { select: true });
            }

            return () => {
                container.removeEventListener(
                    AUTO_FOCUS_ON_MOUNT,
                    handleMountEvent as EventListener,
                );

                if (!restoreFocus) return;

                const unmountEvent = new CustomEvent(
                    AUTO_FOCUS_ON_UNMOUNT,
                    CUSTOM_EVENT_INIT,
                );
                onUnmountAutoFocusRef(unmountEvent);

                if (!unmountEvent.defaultPrevented) {
                    focusFirst([previouslyFocused, document.body]);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [container, autoFocus, restoreFocus]);

        useEffect(() => {
            if (!container) return;

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

            if (contain) focusScopesStack.add(scope);

            const handleFocusIn = (event: FocusEvent) => {
                if (scope.paused || !containRef.current) return;

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
                if (scope.paused) return;

                const target = event.target as HTMLElement | null;
                if (!target || container.contains(target)) return;

                let prevented = false;
                onFocusOutsideRef({
                    originalEvent: event as unknown as FocusEvent,
                    preventDefault: () => {
                        prevented = true;
                    },
                });

                if (containRef.current && !prevented) {
                    event.preventDefault();
                    focusFirst([lastFocusedInsideRef.current, container], {
                        select: true,
                    });
                }
            };

            const handleKeyDown = (event: KeyboardEvent) => {
                if (scope.paused) return;

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

                if (
                    !containRef.current ||
                    !loopRef.current ||
                    event.key !== "Tab"
                ) {
                    return;
                }

                const [first, last] = getTabbableEdges(container);
                if (!first || !last) {
                    event.preventDefault();
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
                if (contain) focusScopesStack.remove(scope);
            };
        }, [container, contain, onFocusOutsideRef, onEscapeKeyDownRef]);

        return (
            <Component
                {...rest}
                ref={composedRefs}
                id={id}
                style={style}
                className={cn("ps-focus-scope", className)}
                tabIndex={-1}
            >
                {children}
            </Component>
        );
    },
);

const MemoizedFocusScope = memo(FocusScope);

MemoizedFocusScope.displayName = "FocusScope";

export default MemoizedFocusScope;

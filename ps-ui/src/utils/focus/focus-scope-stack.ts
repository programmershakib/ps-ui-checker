import type { StackableFocusScope } from "../../types";

function arrayRemove<T>(array: T[], item: T): T[] {
    const copy = [...array];
    const index = copy.indexOf(item);
    if (index !== -1) copy.splice(index, 1);
    return copy;
}

function createFocusScopesStack() {
    let stack: StackableFocusScope[] = [];

    return {
        add(scope: StackableFocusScope) {
            stack = arrayRemove(stack, scope);

            const deepestAncestorIndex = stack.reduce<number>(
                (found, existing, index) =>
                    scope.container.contains(existing.container)
                        ? index
                        : found,
                -1,
            );

            if (deepestAncestorIndex !== -1) {
                stack.splice(deepestAncestorIndex + 1, 0, scope);
                scope.pause();
                return;
            }

            const activeScope = stack[0];
            if (scope !== activeScope) {
                activeScope?.pause();
            }
            stack.unshift(scope);
        },

        remove(scope: StackableFocusScope) {
            stack = arrayRemove(stack, scope);
            stack[0]?.resume();
        },
    };
}

export const focusScopesStack = createFocusScopesStack();

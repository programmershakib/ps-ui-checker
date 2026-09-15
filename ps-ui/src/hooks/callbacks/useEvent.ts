import { useCallback, useLayoutEffect, useRef } from "react";

export function useEvent<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends (...args: any[]) => any,
>(callback: T | undefined) {
    const ref = useRef(callback);

    useLayoutEffect(() => {
        ref.current = callback;
    });

    return useCallback((...args: Parameters<T>) => ref.current?.(...args), []);
}

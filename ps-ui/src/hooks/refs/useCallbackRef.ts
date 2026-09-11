import { useCallback, useEffect, useRef } from "react";

export function useCallbackRef<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends (...args: any[]) => any,
>(callback: T | undefined): T {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    const stableCallback = useCallback((...args: Parameters<T>) => {
        return callbackRef.current?.(...args);
    }, []);

    return stableCallback as T;
}

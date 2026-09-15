import { useCallback, useLayoutEffect, useRef } from "react";

export function useRafCallback(callback: () => void) {
    const callbackRef = useRef(callback);
    const frameRef = useRef<number | null>(null);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    const cancel = useCallback(() => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
    }, []);

    const schedule = useCallback(() => {
        cancel();
        frameRef.current = requestAnimationFrame(() => {
            frameRef.current = null;
            callbackRef.current();
        });
    }, [cancel]);

    return { schedule, cancel };
}

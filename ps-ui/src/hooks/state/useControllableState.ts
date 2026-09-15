import { useCallback, useLayoutEffect, useRef, useState } from "react";

type Setter<T> = (next: T | ((prev: T) => T)) => void;

export function useControllableState<T>(options: {
    value?: T;
    defaultValue: T;
    onChange?: (value: T) => void;
}): [T, Setter<T>] {
    const { value, defaultValue, onChange } = options;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);

    const currentValue = isControlled ? (value as T) : internalValue;
    const currentValueRef = useRef(currentValue);

    useLayoutEffect(() => {
        currentValueRef.current = currentValue;
    });

    const setValue = useCallback(
        (next: T | ((prev: T) => T)) => {
            const resolved =
                typeof next === "function"
                    ? (next as (prev: T) => T)(currentValueRef.current)
                    : next;
            currentValueRef.current = resolved;
            if (!isControlled) setInternalValue(resolved);
            onChange?.(resolved);
        },
        [isControlled, onChange],
    );

    return [currentValue, setValue];
}

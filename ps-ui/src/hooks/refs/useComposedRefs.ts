import {
    useCallback,
    useRef,
    type MutableRefObject,
    type Ref,
    type RefCallback,
} from "react";

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T | null): void {
    if (typeof ref === "function") {
        ref(value);
    } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<T | null>).current = value;
    }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
    return (node) => {
        for (const ref of refs) setRef(ref, node);
    };
}

export function useComposedRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
    const refsRef = useRef(refs);
    // eslint-disable-next-line react-hooks/refs
    refsRef.current = refs;

    return useCallback((node: T | null) => {
        for (const ref of refsRef.current) setRef(ref, node);
    }, []);
}

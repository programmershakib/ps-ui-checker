"use client";

/* -------------------------------------------------------------------------------------------------
 * `dom` element factory — packages/react/src/utils/dom.tsx
 * Lets a component render a plain element (with ref + custom `render` escape hatch).
 * -----------------------------------------------------------------------------------------------*/

import type {AllHTMLAttributes, ReactElement, Ref} from "react";

import React, {useMemo, useRef} from "react";

export type DOMRenderFunction<E extends keyof React.JSX.IntrinsicElements, T> = (
  props: React.JSX.IntrinsicElements[E],
  renderProps: T,
) => ReactElement;

export interface DOMRenderProps<E extends keyof React.JSX.IntrinsicElements, T> {
  render?: DOMRenderFunction<E, T>;
}

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref != null) (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

function DOMElement(
  ElementType: string,
  props: DOMRenderProps<any, any> & AllHTMLAttributes<HTMLElement> & {ref?: Ref<HTMLElement>},
) {
  const {ref: forwardedRef, render, ...otherProps} = props;
  const elementRef = useRef<HTMLElement | null>(null);
  const ref = useMemo(() => mergeRefs(forwardedRef, elementRef), [forwardedRef, elementRef]);

  const domProps: any = {...otherProps, ref};

  if (render) {
    return render(domProps, undefined);
  }

  return React.createElement(ElementType, domProps);
}

type DOMFactory = {
  [K in keyof React.JSX.IntrinsicElements]: (
    props: DOMRenderProps<K, undefined> &
      Omit<React.JSX.IntrinsicElements[K], "ref"> & {ref?: Ref<any>},
  ) => ReactElement;
};

export const dom = new Proxy({} as DOMFactory, {
  get: (_target, tag: string) => (props: any) => DOMElement(tag, props),
});

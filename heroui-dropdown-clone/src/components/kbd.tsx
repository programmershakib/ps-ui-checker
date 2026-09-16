"use client";

/* -------------------------------------------------------------------------------------------------
 * Kbd — packages/react/src/components/kbd/kbd.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef, ReactNode} from "react";

import React, {createContext, use} from "react";

import {composeSlotClassName} from "../lib/compose";
import {dom} from "../lib/dom";
import {type KbdKey, kbdKeysLabelMap, kbdKeysMap} from "../lib/kbd.constants";
import {kbdVariants} from "../lib/styles/kbd.styles";

/* -------------------------------------------------------------------------------------------------
 * Kbd Context
 * -----------------------------------------------------------------------------------------------*/
type KbdContext = {
  slots?: ReturnType<typeof kbdVariants>;
};

const KbdContext = createContext<KbdContext>({});

/* -------------------------------------------------------------------------------------------------
 * Kbd Root
 * -----------------------------------------------------------------------------------------------*/
interface KbdRootProps extends ComponentPropsWithRef<"kbd"> {
  children: ReactNode;
  className?: string;
  /** Visual variant. */
  variant?: "default" | "light";
}

const KbdRoot = ({children, className, variant, ...props}: KbdRootProps) => {
  const slots = React.useMemo(() => kbdVariants({variant}), [variant]);

  return (
    <KbdContext value={{slots}}>
      <dom.kbd {...(props as any)} className={(slots as any).base({className})}>
        {children}
      </dom.kbd>
    </KbdContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Kbd Abbr
 * -----------------------------------------------------------------------------------------------*/
interface KbdAbbrProps extends ComponentPropsWithRef<"abbr"> {
  className?: string;
  /** The keyboard key to display */
  keyValue: KbdKey;
}

const KbdAbbr = ({className, keyValue, ...props}: KbdAbbrProps) => {
  const {slots} = use(KbdContext);

  return (
    <dom.abbr
      className={composeSlotClassName((slots as any)?.abbr, className)}
      title={kbdKeysLabelMap[keyValue]}
      {...(props as any)}
    >
      {kbdKeysMap[keyValue]}
    </dom.abbr>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Kbd Content
 * -----------------------------------------------------------------------------------------------*/
interface KbdContentProps extends ComponentPropsWithRef<"span"> {
  children?: ReactNode;
  className?: string;
}

const KbdContent = ({children, className, ...props}: KbdContentProps) => {
  const {slots} = use(KbdContext);

  return (
    <dom.span
      className={composeSlotClassName((slots as any)?.content, className)}
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {KbdRoot, KbdAbbr, KbdContent};
export type {KbdRootProps, KbdAbbrProps, KbdContentProps};

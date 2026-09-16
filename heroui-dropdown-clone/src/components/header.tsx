"use client";

/* -------------------------------------------------------------------------------------------------
 * Header — packages/react/src/components/header/header.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef} from "react";

import {Header as HeaderPrimitive} from "react-aria-components/Header";

import {headerVariants} from "../lib/styles/header.styles";

interface HeaderRootProps extends ComponentPropsWithRef<typeof HeaderPrimitive> {}

const HeaderRoot = ({children, className, ...rest}: HeaderRootProps) => (
  <HeaderPrimitive
    className={headerVariants({className: typeof className === "string" ? className : undefined})}
    data-slot="header"
    {...rest}
  >
    {children}
  </HeaderPrimitive>
);

export {HeaderRoot};
export type {HeaderRootProps};

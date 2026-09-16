"use client";

/* -------------------------------------------------------------------------------------------------
 * MenuSection — packages/react/src/components/menu-section/menu-section.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef} from "react";

import React from "react";
import {MenuSection as MenuSectionPrimitive} from "react-aria-components/Menu";

import {menuSectionVariants} from "../lib/styles/menu-section.styles";

interface MenuSectionRootProps extends ComponentPropsWithRef<typeof MenuSectionPrimitive> {
  className?: string;
}

const MenuSectionRoot = ({children, className, ...props}: MenuSectionRootProps) => {
  const styles = React.useMemo(
    () => menuSectionVariants({class: typeof className === "string" ? className : undefined}),
    [className],
  );

  return (
    <MenuSectionPrimitive className={styles} {...props}>
      {children}
    </MenuSectionPrimitive>
  );
};

export {MenuSectionRoot};
export type {MenuSectionRootProps};

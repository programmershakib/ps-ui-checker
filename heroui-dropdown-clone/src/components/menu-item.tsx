"use client";

/* -------------------------------------------------------------------------------------------------
 * MenuItem — packages/react/src/components/menu-item/menu-item.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef, ReactNode} from "react";
import type {MenuItemRenderProps} from "react-aria-components/Menu";

import React, {createContext, use} from "react";
import {MenuItem as MenuItemPrimitive} from "react-aria-components/Menu";

import {composeSlotClassName, composeTwRenderProps} from "../lib/compose";
import {dom} from "../lib/dom";
import {menuItemVariants} from "../lib/styles/menu-item.styles";
import {IconChevronRight} from "./icons";

/* -------------------------------------------------------------------------------------------------
 * Menu Item Context
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemContext {
  slots?: ReturnType<typeof menuItemVariants>;
  state?: MenuItemRenderProps;
}

const MenuItemContext = createContext<MenuItemContext>({});

/* -------------------------------------------------------------------------------------------------
 * Menu Item Root
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemRootProps extends ComponentPropsWithRef<typeof MenuItemPrimitive> {
  variant?: "default" | "danger";
  className?: string | ((values: MenuItemRenderProps) => string);
}

const MenuItemRoot = ({children, className, variant, ...props}: MenuItemRootProps) => {
  const slots = React.useMemo(() => menuItemVariants({variant}), [variant]) as any;

  return (
    <MenuItemPrimitive
      className={composeTwRenderProps(className as any, slots.item()) as any}
      data-slot="menu-item"
      {...props}
    >
      {(values: MenuItemRenderProps) => (
        <MenuItemContext value={{slots, state: values}}>
          {typeof children === "function" ? (children as any)(values) : children}
        </MenuItemContext>
      )}
    </MenuItemPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Menu Item Indicator
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemIndicatorProps extends ComponentPropsWithRef<"span"> {
  children?: ReactNode | ((props: MenuItemRenderProps) => ReactNode);
  className?: string;
  type?: "checkmark" | "dot";
}

const MenuItemIndicator = ({
  children,
  className,
  type = "checkmark",
  ...props
}: MenuItemIndicatorProps) => {
  const {slots, state} = use(MenuItemContext) as MenuItemContext;
  const isSelected = state?.isSelected;

  const content =
    typeof children === "function" ? (
      (children as any)(state ?? ({} as MenuItemRenderProps))
    ) : children ? (
      children
    ) : type === "dot" ? (
      <svg
        aria-hidden="true"
        data-slot="menu-item-indicator--dot"
        fill="currentColor"
        fillRule="evenodd"
        role="presentation"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path clipRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" fillRule="evenodd" />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        data-slot="menu-item-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeDasharray={22}
        strokeDashoffset={isSelected ? 44 : 66}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    );

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName((slots as any)?.indicator, className)}
      data-slot="menu-item-indicator"
      data-type={type}
      data-visible={isSelected || undefined}
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Menu Item Submenu Indicator
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemSubmenuIndicatorProps extends ComponentPropsWithRef<"span"> {
  children?: ReactNode;
  className?: string;
}

const MenuItemSubmenuIndicator = ({
  children,
  className,
  ...props
}: MenuItemSubmenuIndicatorProps) => {
  const {slots, state} = use(MenuItemContext) as MenuItemContext;
  const hasSubmenu = (state as any)?.hasSubmenu;

  if (!hasSubmenu) {
    return null;
  }

  const defaultContent = <IconChevronRight />;
  const content = children ?? defaultContent;

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName((slots as any)?.submenuIndicator, className)}
      data-slot="submenu-indicator"
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MenuItemRoot, MenuItemIndicator, MenuItemSubmenuIndicator};
export type {MenuItemRootProps, MenuItemIndicatorProps, MenuItemSubmenuIndicatorProps};

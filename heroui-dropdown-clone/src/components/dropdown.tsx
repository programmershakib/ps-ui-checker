"use client";

/* -------------------------------------------------------------------------------------------------
 * Dropdown — packages/react/src/components/dropdown/dropdown.tsx
 *
 * Same primitives (react-aria-components), same slot names, same data-attributes,
 * same BEM class names as HeroUI v3. Only the styling layer differs: the classes are
 * hand-written CSS in src/styles/*.css instead of Tailwind `@apply`.
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef} from "react";

import React, {createContext, use} from "react";
import {Button} from "react-aria-components/Button";
import {
  Menu as MenuPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Popover as PopoverPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components/Menu";

import {composeTwRenderProps} from "../lib/compose";
import {dropdownVariants} from "../lib/styles/dropdown.styles";
import {MenuItemIndicator, MenuItemRoot, MenuItemSubmenuIndicator} from "./menu-item";
import {MenuSectionRoot} from "./menu-section";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Context
 * -----------------------------------------------------------------------------------------------*/
type DropdownContext = {
  slots?: ReturnType<typeof dropdownVariants>;
};

const DropdownContext = createContext<DropdownContext>({});

/* -------------------------------------------------------------------------------------------------
 * Dropdown Root (MenuTrigger wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownRootProps extends ComponentPropsWithRef<typeof MenuTriggerPrimitive> {
  className?: string;
}

const DropdownRoot = ({children, ...props}: DropdownRootProps) => {
  const slots = React.useMemo(() => dropdownVariants(), []) as any;

  return (
    <DropdownContext value={{slots}}>
      <MenuTriggerPrimitive {...props}>{children}</MenuTriggerPrimitive>
    </DropdownContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Trigger (Button wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownTriggerProps extends ComponentPropsWithRef<typeof Button> {}

const DropdownTrigger = ({children, className, ...props}: DropdownTriggerProps) => {
  const {slots} = use(DropdownContext) as DropdownContext;

  return (
    <Button
      className={composeTwRenderProps(className as any, (slots as any)?.trigger()) as any}
      data-slot="dropdown-trigger"
      {...props}
    >
      {(values: any) => <>{typeof children === "function" ? (children as any)(values) : children}</>}
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Popover (Popover wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownPopoverProps
  extends Omit<ComponentPropsWithRef<typeof PopoverPrimitive>, "children"> {
  children: React.ReactNode;
}

const DropdownPopover = ({children, className, placement, ...props}: DropdownPopoverProps) => {
  const {slots} = use(DropdownContext) as DropdownContext;

  return (
    <PopoverPrimitive
      {...props}
      className={composeTwRenderProps(className as any, (slots as any)?.popover()) as any}
      data-slot="dropdown-popover"
      placement={placement}
    >
      {children}
    </PopoverPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Menu (Menu wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownMenuProps<T extends object> extends ComponentPropsWithRef<typeof MenuPrimitive<T>> {}

function DropdownMenu<T extends object>({className, ...props}: DropdownMenuProps<T>) {
  const {slots} = use(DropdownContext) as DropdownContext;

  return (
    <MenuPrimitive
      className={composeTwRenderProps(className as any, (slots as any)?.menu()) as any}
      data-selection-mode={(props as any).selectionMode}
      data-slot="dropdown-menu"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dropdown Item (MenuItem wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownItemProps extends ComponentPropsWithRef<typeof MenuItemRoot> {}

const DropdownItem = (props: DropdownItemProps) => {
  return <MenuItemRoot {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Indicator (MenuItemSubmenuIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuIndicatorProps
  extends ComponentPropsWithRef<typeof MenuItemSubmenuIndicator> {}

const DropdownSubmenuIndicator = (props: DropdownSubmenuIndicatorProps) => {
  return <MenuItemSubmenuIndicator {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuTriggerProps
  extends ComponentPropsWithRef<typeof SubmenuTriggerPrimitive> {}

const DropdownSubmenuTrigger = ({children, ...props}: DropdownSubmenuTriggerProps) => {
  return (
    <SubmenuTriggerPrimitive data-slot="dropdown-submenu-trigger" {...props}>
      {children}
    </SubmenuTriggerPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Item Indicator (MenuItemIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownItemIndicatorProps extends ComponentPropsWithRef<typeof MenuItemIndicator> {}

const DropdownItemIndicator = (props: DropdownItemIndicatorProps) => {
  return <MenuItemIndicator {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Section (MenuSection wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSectionProps extends ComponentPropsWithRef<typeof MenuSectionRoot> {}

const DropdownSection = (props: DropdownSectionProps) => {
  return <MenuSectionRoot {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownPopover,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
};

export type {
  DropdownItemIndicatorProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownPopoverProps,
  DropdownRootProps,
  DropdownSectionProps,
  DropdownSubmenuIndicatorProps,
  DropdownSubmenuTriggerProps,
  DropdownTriggerProps,
};

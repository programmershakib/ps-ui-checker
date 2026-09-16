/* -------------------------------------------------------------------------------------------------
 * `@heroui/react` — the public surface used by the Dropdown docs demos.
 *
 * Compound components are assembled exactly like HeroUI v3 does
 * (see packages/react/src/components/<component>/index.ts).
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentProps} from "react";

import {AvatarFallback, AvatarImage, AvatarRoot} from "./components/avatar";
import {ButtonRoot} from "./components/button";
import {DescriptionRoot} from "./components/description";
import {
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownPopover,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
} from "./components/dropdown";
import {HeaderRoot} from "./components/header";
import {KbdAbbr, KbdContent, KbdRoot} from "./components/kbd";
import {LabelRoot} from "./components/label";
import {SeparatorRoot} from "./components/separator";

/* -------------------------------------------------------------------------------------------------
 * Dropdown
 * -----------------------------------------------------------------------------------------------*/
export const Dropdown = Object.assign(DropdownRoot, {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Popover: DropdownPopover,
  Menu: DropdownMenu,
  Section: DropdownSection,
  Item: DropdownItem,
  ItemIndicator: DropdownItemIndicator,
  SubmenuIndicator: DropdownSubmenuIndicator,
  SubmenuTrigger: DropdownSubmenuTrigger,
});

export type Dropdown<T extends object = object> = {
  Props: ComponentProps<typeof DropdownRoot>;
  RootProps: ComponentProps<typeof DropdownRoot>;
  TriggerProps: ComponentProps<typeof DropdownTrigger>;
  PopoverProps: ComponentProps<typeof DropdownPopover>;
  MenuProps: ComponentProps<typeof DropdownMenu<T>>;
  SectionProps: ComponentProps<typeof DropdownSection>;
  ItemProps: ComponentProps<typeof DropdownItem>;
  ItemIndicatorProps: ComponentProps<typeof DropdownItemIndicator>;
  SubmenuIndicatorProps: ComponentProps<typeof DropdownSubmenuIndicator>;
  SubmenuTriggerProps: ComponentProps<typeof DropdownSubmenuTrigger>;
};

/* -------------------------------------------------------------------------------------------------
 * Kbd
 * -----------------------------------------------------------------------------------------------*/
export const Kbd = Object.assign(KbdRoot, {
  Root: KbdRoot,
  Abbr: KbdAbbr,
  Content: KbdContent,
});

export type Kbd = {
  Props: ComponentProps<typeof KbdRoot>;
  RootProps: ComponentProps<typeof KbdRoot>;
  AbbrProps: ComponentProps<typeof KbdAbbr>;
  ContentProps: ComponentProps<typeof KbdContent>;
};

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/
export const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export type Avatar = {
  Props: ComponentProps<typeof AvatarRoot>;
  RootProps: ComponentProps<typeof AvatarRoot>;
  ImageProps: ComponentProps<typeof AvatarImage>;
  FallbackProps: ComponentProps<typeof AvatarFallback>;
};

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/
export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export type Button = {
  Props: ComponentProps<typeof ButtonRoot>;
  RootProps: ComponentProps<typeof ButtonRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named components
 * -----------------------------------------------------------------------------------------------*/
export {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  ButtonRoot,
  DescriptionRoot as Description,
  DescriptionRoot,
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownPopover,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
  HeaderRoot as Header,
  HeaderRoot,
  KbdAbbr,
  KbdContent,
  KbdRoot,
  LabelRoot as Label,
  LabelRoot,
  SeparatorRoot as Separator,
  SeparatorRoot,
};

/* -------------------------------------------------------------------------------------------------
 * Shared types (react-aria / react-stately)
 * -----------------------------------------------------------------------------------------------*/
export type {Key, Selection, SelectionMode} from "@react-types/shared";

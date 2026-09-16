import type {VariantProps} from "../tv";

import {tv} from "../tv";

export const dropdownVariants = tv({
  slots: {
    menu: "dropdown__menu",
    popover: "dropdown__popover",
    root: "dropdown",
    trigger: "dropdown__trigger",
  },
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;

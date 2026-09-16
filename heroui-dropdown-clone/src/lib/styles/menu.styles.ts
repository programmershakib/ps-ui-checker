import type {VariantProps} from "../tv";

import {tv} from "../tv";

export const menuVariants = tv({
  base: "menu",
});

export type MenuVariants = VariantProps<typeof menuVariants>;

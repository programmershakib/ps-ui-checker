import type { FlexProps } from "../Flex/Flex.types";
import type { ElementType } from "react";

export type CenterProps<C extends ElementType = "div"> = Omit<
    FlexProps<C>,
    "direction" | "align" | "justify"
>;

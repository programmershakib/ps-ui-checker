import type { FlexProps } from "../Flex/Flex.types";
import type { ElementType } from "react";

export type StackProps<C extends ElementType = "div"> = Omit<
    FlexProps<C>,
    "direction"
>;

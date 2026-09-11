import type { FlexProps } from "../Flex/Flex.types";

export type CenterProps = Omit<FlexProps, "direction" | "align" | "justify">;

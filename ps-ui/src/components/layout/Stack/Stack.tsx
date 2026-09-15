import type { ElementType, ReactElement, Ref } from "react";
import type { StackProps } from "./Stack.types";
import { forwardRef } from "react";
import { Flex } from "../Flex";

function StackRender(props: StackProps, ref?: Ref<HTMLDivElement>) {
    return <Flex {...props} ref={ref} direction="column" />;
}

const Stack = forwardRef(StackRender) as <C extends ElementType = "div">(
    props: StackProps<C>,
) => ReactElement | null;

(Stack as unknown as { displayName: string }).displayName = "Stack";

export default Stack;

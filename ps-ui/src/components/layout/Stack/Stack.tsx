import type { StackProps } from "./Stack.types";
import { forwardRef, memo } from "react";
import { Flex } from "../Flex";

const Stack = forwardRef<HTMLElement, StackProps>(
    ({ direction = "column", ...rest }, ref) => {
        return <Flex {...rest} ref={ref} direction={direction} />;
    },
);

const MemoizedStack = memo(Stack);

MemoizedStack.displayName = "Stack";

export default MemoizedStack;

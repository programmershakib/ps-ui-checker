import type { CenterProps } from "./Center.types";
import { forwardRef, memo } from "react";
import { Flex } from "../Flex";

const Center = forwardRef<HTMLElement, CenterProps>(
    ({ inline = false, ...rest }, ref) => {
        return (
            <Flex
                {...rest}
                ref={ref}
                direction="row"
                align="center"
                justify="center"
                inline={inline}
            />
        );
    },
);

const MemoizedCenter = memo(Center);

MemoizedCenter.displayName = "Center";

export default MemoizedCenter;

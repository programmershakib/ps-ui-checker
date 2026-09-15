import type { CenterProps } from "./Center.types";
import { Flex } from "../Flex";
import {
    forwardRef,
    type ElementType,
    type ReactElement,
    type Ref,
} from "react";

function CenterRender(
    { inline = false, ...rest }: CenterProps,
    ref?: Ref<HTMLDivElement>,
) {
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
}

const Center = forwardRef(CenterRender) as <C extends ElementType = "div">(
    props: CenterProps<C>,
) => ReactElement | null;

(Center as unknown as { displayName: string }).displayName = "Center";

export default Center;

import type { AspectRatioProps } from "./AspectRatio.types";
import { cn } from "../../../utils";
import "./AspectRatio.css";
import {
    forwardRef,
    memo,
    type ElementType,
    type ReactElement,
    type Ref,
} from "react";

function AspectRatioRender<C extends ElementType = "div">(
    {
        as,
        id,
        style,
        className,
        ratio = 1,
        children,
        ...rest
    }: AspectRatioProps<C>,
    ref: Ref<Element>,
) {
    const Component = (as ?? "div") as ElementType;

    return (
        <Component
            {...rest}
            ref={ref}
            id={id}
            style={{
                ...style,
                aspectRatio: ratio,
            }}
            className={cn("ps-aspect-ratio", className)}
        >
            {children}
        </Component>
    );
}

const AspectRatio = memo(forwardRef(AspectRatioRender)) as <
    C extends ElementType = "div",
>(
    props: AspectRatioProps<C>,
) => ReactElement | null;

(AspectRatio as unknown as { displayName: string }).displayName = "AspectRatio";

export default AspectRatio;

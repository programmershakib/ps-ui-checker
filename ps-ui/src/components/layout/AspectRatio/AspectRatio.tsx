import type { AspectRatioProps } from "./AspectRatio.types";
import { cn } from "../../../utils/class-names/cn";
import { forwardRef, memo } from "react";
import "./AspectRatio.css";

const AspectRatio = forwardRef<HTMLElement, AspectRatioProps>(
    (
        {
            as: Component = "div",
            id,
            style,
            className,
            ratio = 1,
            children,
            ...rest
        },
        ref,
    ) => {
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
    },
);

const MemoizedAspectRatio = memo(AspectRatio);

MemoizedAspectRatio.displayName = "AspectRatio";

export default MemoizedAspectRatio;

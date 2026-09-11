import type { VisuallyHiddenProps } from "./VisuallyHidden.types";
import { cn } from "../../../utils/class-names/cn";
import { forwardRef, memo } from "react";
import "./VisuallyHidden.css";

const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
    (
        {
            as: Component = "span",
            id,
            style,
            className,
            focusable = false,
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
                style={style}
                className={cn(
                    "ps-visually-hidden",
                    focusable && "ps-visually-hidden--focusable",
                    className,
                )}
            >
                {children}
            </Component>
        );
    },
);

const MemoizedVisuallyHidden = memo(VisuallyHidden);

MemoizedVisuallyHidden.displayName = "VisuallyHidden";

export default MemoizedVisuallyHidden;

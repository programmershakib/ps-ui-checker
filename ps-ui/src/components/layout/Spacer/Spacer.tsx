import { forwardRef, memo, type CSSProperties } from "react";
import type { SpacerProps } from "./Spacer.types";
import { cn, resolveSpace } from "../../../utils";
import "./Spacer.css";

const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
    (
        {
            id,
            style,
            className,
            size,
            axis = "horizontal",
            minSize,
            maxSize,
            ...rest
        },
        ref,
    ) => {
        const resolvedStyle: CSSProperties = { ...style };

        const resolvedSize = resolveSpace(size);
        const resolvedMin = resolveSpace(minSize);
        const resolvedMax = resolveSpace(maxSize);

        if (axis === "horizontal") {
            if (resolvedSize !== undefined) resolvedStyle.width = resolvedSize;
            if (resolvedMin !== undefined) resolvedStyle.minWidth = resolvedMin;
            if (resolvedMax !== undefined) resolvedStyle.maxWidth = resolvedMax;
        } else {
            if (resolvedSize !== undefined) resolvedStyle.height = resolvedSize;
            if (resolvedMin !== undefined)
                resolvedStyle.minHeight = resolvedMin;
            if (resolvedMax !== undefined)
                resolvedStyle.maxHeight = resolvedMax;
        }

        const isFill = size == null && minSize == null && maxSize == null;

        return (
            <div
                {...rest}
                ref={ref}
                id={id}
                style={resolvedStyle}
                className={cn(
                    "ps-spacer",
                    isFill && "ps-spacer--fill",
                    className,
                )}
                aria-hidden
            />
        );
    },
);

const MemoizedSpacer = memo(Spacer);

MemoizedSpacer.displayName = "Spacer";

export default MemoizedSpacer;

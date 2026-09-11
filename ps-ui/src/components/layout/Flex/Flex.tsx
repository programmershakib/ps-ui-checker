import { resolveSpace } from "../../../utils/resolvers/resolve-space";
import { forwardRef, memo, type CSSProperties } from "react";
import { cn } from "../../../utils/class-names/cn";
import type { FlexProps } from "./Flex.types";
import { flexRecipe } from "./Flex.recipe";
import "./Flex.css";

function resolveFlexBasis(basis?: string | number): string | undefined {
    if (basis === undefined) return undefined;
    return typeof basis === "number" ? `${basis}px` : basis;
}

function resolveGrowShrink(value?: boolean | number): number | undefined {
    if (value === undefined) return undefined;
    if (value === true) return 1;
    if (value === false) return 0;
    return value;
}

const Flex = forwardRef<HTMLElement, FlexProps>(
    (
        {
            as: Component = "div",
            id,
            style,
            className,
            direction = "row",
            align = "stretch",
            justify = "start",
            alignContent,
            wrap = "nowrap",
            gap,
            gapX,
            gapY,
            grow,
            shrink,
            basis,
            inline = false,
            children,
            ...rest
        },
        ref,
    ) => {
        const resolvedStyle: CSSProperties = { ...style };

        const resolvedGap = resolveSpace(gap);
        if (resolvedGap) resolvedStyle.gap = resolvedGap;
        const resolvedGapX = resolveSpace(gapX);
        if (resolvedGapX) resolvedStyle.columnGap = resolvedGapX;
        const resolvedGapY = resolveSpace(gapY);
        if (resolvedGapY) resolvedStyle.rowGap = resolvedGapY;

        const resolvedGrow = resolveGrowShrink(grow);
        if (resolvedGrow !== undefined) resolvedStyle.flexGrow = resolvedGrow;
        const resolvedShrink = resolveGrowShrink(shrink);
        if (resolvedShrink !== undefined)
            resolvedStyle.flexShrink = resolvedShrink;
        const resolvedBasis = resolveFlexBasis(basis);
        if (resolvedBasis !== undefined)
            resolvedStyle.flexBasis = resolvedBasis;

        return (
            <Component
                {...rest}
                ref={ref}
                id={id}
                style={resolvedStyle}
                className={cn(
                    flexRecipe({
                        direction,
                        align,
                        justify,
                        wrap,
                        alignContent,
                    }),
                    inline && "ps-flex--inline",
                    className,
                )}
            >
                {children}
            </Component>
        );
    },
);

const MemoizedFlex = memo(Flex);

MemoizedFlex.displayName = "Flex";

export default MemoizedFlex;

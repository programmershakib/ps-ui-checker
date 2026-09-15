import { cn, resolveSpace } from "../../../utils";
import type { FlexProps } from "./Flex.types";
import { flexRecipe } from "./Flex.recipe";
import "./Flex.css";
import {
    forwardRef,
    type CSSProperties,
    type ElementType,
    type ReactElement,
    type Ref,
} from "react";

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

function FlexRender<C extends ElementType = "div">(
    {
        as,
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
    }: FlexProps<C>,
    ref: Ref<Element>,
) {
    const Component = (as ?? "div") as ElementType;

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
    if (resolvedShrink !== undefined) resolvedStyle.flexShrink = resolvedShrink;
    const resolvedBasis = resolveFlexBasis(basis);
    if (resolvedBasis !== undefined) resolvedStyle.flexBasis = resolvedBasis;

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
}

const Flex = forwardRef(FlexRender) as <C extends ElementType = "div">(
    props: FlexProps<C>,
) => ReactElement | null;

(Flex as unknown as { displayName: string }).displayName = "Flex";

export default Flex;

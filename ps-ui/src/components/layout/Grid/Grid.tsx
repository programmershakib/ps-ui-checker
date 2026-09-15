import { cn, resolveSpace } from "../../../utils";
import type { GridProps } from "./Grid.types";
import { gridRecipe } from "./Grid.recipe";
import "./Grid.css";
import {
    forwardRef,
    type CSSProperties,
    type ElementType,
    type ReactElement,
    type Ref,
} from "react";

function GridRender<C extends ElementType = "div">(
    {
        as,
        id,
        style,
        className,
        columns,
        minColumnWidth,
        columnMode = "auto-fit",
        templateColumns,
        templateRows,
        align = "stretch",
        justify = "stretch",
        alignContent,
        justifyContent,
        flow = "row",
        gap,
        gapX,
        gapY,
        inline = false,
        children,
        ...rest
    }: GridProps<C>,
    ref: Ref<Element>,
) {
    const Component = (as ?? "div") as ElementType;

    const resolvedStyle: CSSProperties = { ...style };

    if (templateColumns) {
        resolvedStyle.gridTemplateColumns = templateColumns;
    } else if (minColumnWidth) {
        resolvedStyle.gridTemplateColumns = `repeat(${columnMode}, minmax(${minColumnWidth}, 1fr))`;
    } else if (columns) {
        resolvedStyle.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    }

    if (templateRows) resolvedStyle.gridTemplateRows = templateRows;

    const resolvedGap = resolveSpace(gap);
    if (resolvedGap) resolvedStyle.gap = resolvedGap;
    const resolvedGapX = resolveSpace(gapX);
    if (resolvedGapX) resolvedStyle.columnGap = resolvedGapX;
    const resolvedGapY = resolveSpace(gapY);
    if (resolvedGapY) resolvedStyle.rowGap = resolvedGapY;

    return (
        <Component
            {...rest}
            ref={ref}
            id={id}
            style={resolvedStyle}
            className={cn(
                gridRecipe({
                    align,
                    justify,
                    flow,
                    alignContent,
                    justifyContent,
                }),
                inline && "ps-grid--inline",
                className,
            )}
        >
            {children}
        </Component>
    );
}

const Grid = forwardRef(GridRender) as <C extends ElementType = "div">(
    props: GridProps<C> & { ref?: Ref<Element> },
) => ReactElement | null;

(Grid as unknown as { displayName: string }).displayName = "Grid";

export default Grid;

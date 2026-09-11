import { resolveSpace } from "../../../utils/resolvers/resolve-space";
import { forwardRef, memo, type CSSProperties } from "react";
import { cn } from "../../../utils/class-names/cn";
import type { GridProps } from "./Grid.types";
import { gridRecipe } from "./Grid.recipe";
import "./Grid.css";

const Grid = forwardRef<HTMLElement, GridProps>(
    (
        {
            as: Component = "div",
            id,
            style,
            className,
            columns,
            minColumnWidth,
            columnMode = "fit",
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
        },
        ref,
    ) => {
        const resolvedStyle: CSSProperties = { ...style };

        if (templateColumns) {
            resolvedStyle.gridTemplateColumns = templateColumns;
        } else if (minColumnWidth) {
            const mode = columnMode === "fill" ? "auto-fill" : "auto-fit";
            resolvedStyle.gridTemplateColumns = `repeat(${mode}, minmax(${minColumnWidth}, 1fr))`;
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
    },
);

const MemoizedGrid = memo(Grid);

MemoizedGrid.displayName = "Grid";

export default MemoizedGrid;

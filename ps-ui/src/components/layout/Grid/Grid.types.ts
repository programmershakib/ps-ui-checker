import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";
import type { Base, Space } from "../../../types";

type GridAlign = "start" | "center" | "end" | "stretch" | "baseline";

type GridJustify = "start" | "center" | "end" | "stretch";

type GridAlignContent =
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "between"
    | "around"
    | "evenly";

type GridJustifyContent =
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "between"
    | "around"
    | "evenly";

type GridFlow = "row" | "column" | "dense" | "row-dense" | "column-dense";

type GridColumnMode = "auto-fit" | "auto-fill";

type SpaceOrRaw = Space | number | (string & {});

interface GridOwnProps extends Base {
    columns?: number;

    minColumnWidth?: string;
    columnMode?: GridColumnMode;

    templateColumns?: string;
    templateRows?: string;

    align?: GridAlign;
    justify?: GridJustify;

    alignContent?: GridAlignContent;
    justifyContent?: GridJustifyContent;

    flow?: GridFlow;

    gap?: SpaceOrRaw;
    gapX?: SpaceOrRaw;
    gapY?: SpaceOrRaw;

    inline?: boolean;

    children?: ReactNode;
}

export type GridProps<C extends ElementType = "div"> = GridOwnProps & {
    as?: C;
} & Omit<ComponentPropsWithRef<C>, keyof GridOwnProps | "as">;

import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { Base, Space } from "../../../types/common";

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

type GridFlow = "row" | "column" | "row-dense" | "column-dense";

type GridColumnMode = "fit" | "fill";

type SpaceOrRaw = Space | number | (string & {});

interface GridOwnProps extends Base {
    as?: ElementType;

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

export interface GridProps
    extends
        GridOwnProps,
        Omit<HTMLAttributes<HTMLElement>, keyof GridOwnProps> {}

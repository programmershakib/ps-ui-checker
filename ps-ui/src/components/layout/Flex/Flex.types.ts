import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { Base, Space } from "../../../types/common";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";

type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

type FlexAlignContent =
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "between"
    | "around"
    | "evenly";

type SpaceOrRaw = Space | number | (string & {});

type FlexGrow = boolean | number;

type FlexShrink = boolean | number;

type FlexBasis = string | number;

interface FlexOwnProps extends Base {
    as?: ElementType;

    direction?: FlexDirection;
    align?: FlexAlign;
    justify?: FlexJustify;
    alignContent?: FlexAlignContent;
    wrap?: FlexWrap;

    gap?: SpaceOrRaw;
    gapX?: SpaceOrRaw;
    gapY?: SpaceOrRaw;

    grow?: FlexGrow;
    shrink?: FlexShrink;
    basis?: FlexBasis;

    inline?: boolean;

    children?: ReactNode;
}

export interface FlexProps
    extends
        FlexOwnProps,
        Omit<HTMLAttributes<HTMLElement>, keyof FlexOwnProps> {}

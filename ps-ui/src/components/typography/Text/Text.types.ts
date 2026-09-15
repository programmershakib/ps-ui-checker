import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";
import type {
    Base,
    ColorScale,
    FontFamily,
    FontSize,
    FontWeight,
    LetterSpacing,
    LineHeight,
} from "../../../types";

type TextColor = ColorScale | "current" | (string & {});

type TextAlign = "left" | "center" | "right" | "justify" | "start" | "end";

type TextDecoration = "none" | "underline" | "line-through" | "overline";

type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

type TextLineHeight = LineHeight | number | (string & {});

type TextLetterSpacing = LetterSpacing | number | (string & {});

type TextWordBreak = "normal" | "break-all" | "keep-all" | "break-word";

type TextWhiteSpace = "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";

interface TextOwnProps extends Base {
    color?: TextColor;

    size?: FontSize | number | (string & {});
    weight?: FontWeight;
    family?: FontFamily;

    align?: TextAlign;
    decoration?: TextDecoration;
    textTransform?: TextTransform;

    lineHeight?: TextLineHeight;
    letterSpacing?: TextLetterSpacing;

    italic?: boolean;

    truncate?: boolean;
    lineClamp?: number;

    wordBreak?: TextWordBreak;
    whiteSpace?: TextWhiteSpace;

    children?: ReactNode;
}

export interface TextStyle<T extends string> {
    token?: T;
    inline?: string;
}

export type TextProps<C extends ElementType = "p"> = TextOwnProps & {
    as?: C;
} & Omit<ComponentPropsWithRef<C>, keyof TextOwnProps | "as" | "color">;

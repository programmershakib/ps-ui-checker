import type { TextProps, TextStyle } from "./Text.types";
import { textRecipe } from "./Text.recipe";
import "./Text.css";
import {
    isColorToken,
    isFontSizeToken,
    isLetterSpacingToken,
    isLineHeightToken,
    resolveColor,
    resolveFontSize,
    resolveLetterSpacing,
    resolveLineHeight,
    cn,
} from "../../../utils";
import {
    forwardRef,
    type ElementType,
    type ReactElement,
    type CSSProperties,
} from "react";

function textStyle<T extends string, V>(
    isToken: (value: unknown) => value is T,
    value: V | undefined,
    toInline: (value: V | undefined) => string | undefined,
): TextStyle<T> {
    if (isToken(value)) return { token: value };
    return { inline: toInline(value) };
}

function TextRender<C extends ElementType = "p">(
    {
        as,
        id,
        style,
        className,
        color = "foreground",
        size = "md",
        weight = "normal",
        family = "sans",
        align,
        decoration = "none",
        textTransform = "none",
        lineHeight,
        letterSpacing,
        italic = false,
        truncate = false,
        lineClamp,
        wordBreak,
        whiteSpace,
        children,
        ...rest
    }: TextProps<C>,
    ref: React.Ref<Element>,
) {
    const Component = (as ?? "p") as ElementType;

    const resolvedColor = textStyle(isColorToken, color, resolveColor);
    const resolvedSize = textStyle(isFontSizeToken, size, resolveFontSize);
    const resolvedLineHeight = textStyle(
        isLineHeightToken,
        lineHeight,
        resolveLineHeight,
    );
    const resolvedLetterSpacing = textStyle(
        isLetterSpacingToken,
        letterSpacing,
        resolveLetterSpacing,
    );

    return (
        <Component
            {...rest}
            ref={ref}
            id={id}
            style={
                {
                    ...style,
                    ...(resolvedColor.inline && {
                        color: resolvedColor.inline,
                    }),
                    ...(resolvedSize.inline && {
                        fontSize: resolvedSize.inline,
                    }),
                    ...(resolvedLineHeight.inline && {
                        lineHeight: resolvedLineHeight.inline,
                    }),
                    ...(resolvedLetterSpacing.inline && {
                        letterSpacing: resolvedLetterSpacing.inline,
                    }),
                    ...(lineClamp && { WebkitLineClamp: lineClamp, lineClamp }),
                } as CSSProperties
            }
            className={cn(
                textRecipe({
                    color: resolvedColor.token,
                    size: resolvedSize.token,
                    lineHeight: resolvedLineHeight.token,
                    letterSpacing: resolvedLetterSpacing.token,
                    weight,
                    family,
                    decoration,
                    textTransform,
                    align,
                    wordBreak,
                    whiteSpace,
                }),
                italic && "ps-text--italic",
                !lineClamp && truncate && "ps-text--truncate",
                !!lineClamp && "ps-text--line-clamp",
                className,
            )}
        >
            {children}
        </Component>
    );
}

const Text = forwardRef(TextRender) as <C extends ElementType = "p">(
    props: TextProps<C> & { ref?: React.Ref<Element> },
) => ReactElement | null;

export default Text;

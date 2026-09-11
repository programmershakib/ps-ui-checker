import { resolveLineHeight } from "../../../utils/resolvers/resolve-line-height";
import { resolveColor } from "../../../utils/resolvers/resolve-color";
import type { ElementType, ReactElement, CSSProperties } from "react";
import { cn } from "../../../utils/class-names/cn";
import type { TextProps } from "./Text.types";
import { textRecipe } from "./Text.recipe";
import { forwardRef } from "react";
import "./Text.css";
import {
    isFontSizeToken,
    resolveFontSize,
} from "../../../utils/resolvers/resolve-font-size";

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

    const sizeIsToken = isFontSizeToken(size);
    const inlineFontSize = sizeIsToken ? undefined : resolveFontSize(size);
    const resolvedLineHeight = resolveLineHeight(lineHeight);

    return (
        <Component
            {...rest}
            ref={ref}
            id={id}
            style={
                {
                    ...style,
                    color: resolveColor(color),
                    ...(inlineFontSize && { fontSize: inlineFontSize }),
                    ...(letterSpacing && { letterSpacing }),
                    ...(resolvedLineHeight && {
                        lineHeight: resolvedLineHeight,
                    }),
                    ...(lineClamp && { WebkitLineClamp: lineClamp, lineClamp }),
                } as CSSProperties
            }
            className={cn(
                textRecipe({
                    size: sizeIsToken ? size : undefined,
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

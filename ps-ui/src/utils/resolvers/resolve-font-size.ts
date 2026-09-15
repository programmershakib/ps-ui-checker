import type { FontSize } from "../../types";

const FONT_SIZE_TOKENS = new Set<FontSize>([
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
]);

export function isFontSizeToken(value: unknown): value is FontSize {
    return typeof value === "string" && FONT_SIZE_TOKENS.has(value as FontSize);
}

export function resolveFontSize(
    value: FontSize | number | string | undefined,
): string | undefined {
    if (value === undefined) return undefined;
    if (typeof value === "number") return `${value}px`;
    if (isFontSizeToken(value)) return `var(--ps-font-${value})`;
    return value;
}

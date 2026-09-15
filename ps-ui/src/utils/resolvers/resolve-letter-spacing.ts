import type { LetterSpacing } from "../../types";

const LETTER_SPACING_TOKENS = new Set<LetterSpacing>([
    "tighter",
    "tight",
    "normal",
    "wide",
    "wider",
    "widest",
]);

export function isLetterSpacingToken(value: unknown): value is LetterSpacing {
    return (
        typeof value === "string" &&
        LETTER_SPACING_TOKENS.has(value as LetterSpacing)
    );
}

export function resolveLetterSpacing(
    value: LetterSpacing | number | string | undefined,
): string | undefined {
    if (value === undefined) return undefined;
    if (typeof value === "number") return `${value}px`;
    if (isLetterSpacingToken(value)) return `var(--ps-letter-spacing-${value})`;
    return value;
}

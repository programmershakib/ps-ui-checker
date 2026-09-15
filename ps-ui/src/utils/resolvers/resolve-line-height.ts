import type { LineHeight } from "../../types";

const LINE_HEIGHT_TOKENS = new Set<LineHeight>([
    "tight",
    "normal",
    "relaxed",
    "loose",
]);

export function isLineHeightToken(value: unknown): value is LineHeight {
    return (
        typeof value === "string" && LINE_HEIGHT_TOKENS.has(value as LineHeight)
    );
}

export function resolveLineHeight(
    value: LineHeight | number | string | undefined,
): string | undefined {
    if (value === undefined) return undefined;
    if (typeof value === "number") return String(value);
    if (isLineHeightToken(value)) return `var(--ps-line-height-${value})`;
    return value;
}

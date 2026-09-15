import type { ColorScale } from "../../types";

const COLOR_TOKENS = new Set<ColorScale>([
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "white",
    "black",
    "background",
    "foreground",
    "muted",
    "subtle",
    "disabled",
]);

export function isColorToken(value: unknown): value is ColorScale {
    return typeof value === "string" && COLOR_TOKENS.has(value as ColorScale);
}

export function resolveColor(
    value: ColorScale | "current" | (string & {}) | undefined,
): string | undefined {
    if (value === undefined) return undefined;
    if (value === "current") return "currentColor";
    if (isColorToken(value)) return `var(--ps-${value})`;
    return value;
}

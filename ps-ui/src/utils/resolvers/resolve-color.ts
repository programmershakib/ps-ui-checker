import type { ColorScale } from "../../types/common";

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

export function resolveColor(color: string): string {
    if (color === "current") return "currentColor";
    if (isColorToken(color)) return `var(--ps-${color})`;
    return color;
}

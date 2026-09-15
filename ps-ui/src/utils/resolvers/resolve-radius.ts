import type { RadiusScale } from "../../types";

const RADIUS_TOKENS = new Set<RadiusScale>([
    "none",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "full",
]);

export function isRadiusToken(value: unknown): value is RadiusScale {
    return typeof value === "string" && RADIUS_TOKENS.has(value as RadiusScale);
}

export function resolveRadius(
    value: RadiusScale | number | string | undefined,
): string | undefined {
    if (value === undefined) return undefined;
    if (typeof value === "number") return `${value}px`;
    if (isRadiusToken(value)) return `var(--ps-radius-${value})`;
    return value;
}

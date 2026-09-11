import type { Radius } from "../../types/common";

const RADIUS_TOKENS = new Set<Radius>(["none", "sm", "md", "lg", "full"]);

export function isRadiusToken(value: unknown): value is Radius {
    return typeof value === "string" && RADIUS_TOKENS.has(value as Radius);
}

export function resolveRadius(
    value: Radius | number | string | undefined,
): string | undefined {
    if (value === undefined) return undefined;
    if (typeof value === "number") return `${value}px`;
    if (isRadiusToken(value)) return `var(--ps-component-radius-${value})`;
    return value;
}

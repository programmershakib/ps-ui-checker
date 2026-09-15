import type { Shadow } from "../../types";

const SHADOW_TOKENS = new Set<Shadow>(["none", "sm", "md", "lg"]);

export function isShadowToken(value: unknown): value is Shadow {
    return typeof value === "string" && SHADOW_TOKENS.has(value as Shadow);
}

export function resolveShadow(
    value: Shadow | (string & {}) | undefined,
): string | undefined {
    if (value === undefined) return undefined;
    if (isShadowToken(value)) return `var(--ps-shadow-${value})`;
    return value;
}

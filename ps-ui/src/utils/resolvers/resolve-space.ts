import type { Space } from "../../types";

const SPACE_TOKENS = new Set<Space>([
    "none",
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

export function isSpaceToken(value: unknown): value is Space {
    return typeof value === "string" && SPACE_TOKENS.has(value as Space);
}

export function resolveSpace(
    value: Space | number | string | undefined,
): string | undefined {
    if (value === undefined) return undefined;
    if (typeof value === "number") return `${value}px`;
    if (isSpaceToken(value)) return `var(--ps-space-${value})`;
    return value;
}

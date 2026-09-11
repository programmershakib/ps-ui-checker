const LINE_HEIGHT_PRESETS: Record<string, string> = {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
};

export function resolveLineHeight(value?: string | number): string | undefined {
    if (value === undefined) return undefined;
    const key = String(value);
    return LINE_HEIGHT_PRESETS[key] ?? key;
}

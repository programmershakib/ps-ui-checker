import type { ColorOverride } from "./theme.types";

interface HSL {
    h: number;
    s: number;
    l: number;
}

function hexToRgb(hex: string): [number, number, number] {
    let h = hex.replace("#", "");
    if (h.length === 3) {
        h = h
            .split("")
            .map((c) => c + c)
            .join("");
    }
    const num = parseInt(h, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
    const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
    return (
        "#" +
        [clamp(r), clamp(g), clamp(b)]
            .map((n) => n.toString(16).padStart(2, "0"))
            .join("")
    );
}

function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            default:
                h = (r - g) / d + 4;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h /= 360;
    s /= 100;
    l /= 100;
    if (s === 0) {
        const v = l * 255;
        return [v, v, v];
    }
    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return [
        hue2rgb(p, q, h + 1 / 3) * 255,
        hue2rgb(p, q, h) * 255,
        hue2rgb(p, q, h - 1 / 3) * 255,
    ];
}

const clampL = (l: number) => Math.max(0, Math.min(100, l));

function shade(base: HSL, deltaL: number, deltaS = 0): string {
    const [r, g, b] = hslToRgb(
        base.h,
        Math.max(0, Math.min(100, base.s + deltaS)),
        clampL(base.l + deltaL),
    );
    return rgbToHex(r, g, b);
}

function lightenHeadroom(l: number, max: number): number {
    return Math.max(0, Math.min(max, 90 - l));
}

function pickForeground(base: HSL): string {
    const [r, g, b] = hslToRgb(base.h, base.s, base.l);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? "#000000" : "#ffffff";
}

export function generateColorRamp(
    seedHex: string,
): Omit<ColorOverride, "DEFAULT"> {
    const [r, g, b] = hexToRgb(seedHex);
    const hsl = rgbToHsl(r, g, b);
    const darker = hsl.l < 20;

    return {
        hover: shade(hsl, darker ? 10 : -10),
        active: shade(hsl, darker ? 20 : -20),
        text: seedHex,
        border: seedHex,
        subtle: shade(hsl, lightenHeadroom(hsl.l, 40), -20),
        subtleHover: shade(hsl, lightenHeadroom(hsl.l, 30), -15),
        shadow: shade(hsl, lightenHeadroom(hsl.l, 35), -15),
        foreground: pickForeground(hsl),
    };
}

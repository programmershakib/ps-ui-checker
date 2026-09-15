import { generateColorRamp } from "./generate-color-ramp";
import type { CSSProperties } from "react";
import type {
    ColorOverride,
    ControlSizeOverride,
    ThemeConfig,
} from "./theme.types";
import type {
    Color,
    Duration,
    Easing,
    FontSize,
    FontWeight,
    LetterSpacing,
    LineHeight,
    Radius,
    Shadow,
    Size,
    Space,
} from "../types";

const COLOR_KEY_SUFFIX: Record<keyof ColorOverride, string> = {
    DEFAULT: "",
    hover: "-hover",
    active: "-active",
    foreground: "-foreground",
    text: "-text",
    border: "-border",
    subtle: "-subtle",
    subtleHover: "-subtle-hover",
    shadow: "-shadow",
};

const CONTROL_SIZE_SUFFIX: Record<keyof ControlSizeOverride, string> = {
    height: "height",
    paddingX: "padding-x",
    gap: "gap",
    font: "font",
};

export function createTheme(config: ThemeConfig): CSSProperties {
    const vars: Record<string, string> = {};

    const {
        colors,
        fontSizes,
        fontWeights,
        fontFamily,
        lineHeights,
        letterSpacings,
        radius,
        controlSizes,
        compactSizes,
        spacing,
        shadows,
        durations,
        easings,
        tokens,
    } = config;

    if (colors) {
        for (const role in colors) {
            const override = colors[role as Color];
            if (!override) continue;
            const resolved: ColorOverride = override.DEFAULT
                ? { ...generateColorRamp(override.DEFAULT), ...override }
                : override;
            for (const key in resolved) {
                const value = resolved[key as keyof ColorOverride];
                if (!value) continue;
                const suffix = COLOR_KEY_SUFFIX[key as keyof ColorOverride];
                vars[`--ps-${role}${suffix}`] = value;
            }
        }
    }

    if (fontSizes) {
        for (const key in fontSizes) {
            const value = fontSizes[key as FontSize];
            if (value) vars[`--ps-font-${key}`] = value;
        }
    }

    if (fontWeights) {
        for (const key in fontWeights) {
            const value = fontWeights[key as FontWeight];
            if (value) vars[`--ps-font-weight-${key}`] = value;
        }
    }

    if (fontFamily) {
        vars["--ps-font-family"] = fontFamily;
    }

    if (lineHeights) {
        for (const key in lineHeights) {
            const value = lineHeights[key as LineHeight];
            if (value) vars[`--ps-line-height-${key}`] = value;
        }
    }

    if (letterSpacings) {
        for (const key in letterSpacings) {
            const value = letterSpacings[key as LetterSpacing];
            if (value) vars[`--ps-letter-spacing-${key}`] = value;
        }
    }

    if (radius) {
        for (const key in radius) {
            const value = radius[key as Radius];
            if (value) vars[`--ps-radius-${key}`] = value;
        }
    }

    if (controlSizes) {
        for (const size in controlSizes) {
            const override = controlSizes[size as Size];
            if (!override) continue;
            for (const key in override) {
                const value = override[key as keyof ControlSizeOverride];
                if (!value) continue;
                const suffix =
                    CONTROL_SIZE_SUFFIX[key as keyof ControlSizeOverride];
                vars[`--ps-control-${size}-${suffix}`] = value;
            }
        }
    }

    if (compactSizes) {
        for (const size in compactSizes) {
            const value = compactSizes[size as Size];
            if (value) vars[`--ps-compact-${size}`] = value;
        }
    }

    if (spacing) {
        for (const key in spacing) {
            const value = spacing[key as Space];
            if (value) vars[`--ps-space-${key}`] = value;
        }
    }

    if (shadows) {
        for (const key in shadows) {
            const value = shadows[key as Shadow];
            if (value) vars[`--ps-shadow-${key}`] = value;
        }
    }

    if (durations) {
        for (const key in durations) {
            const value = durations[key as Duration];
            if (value) vars[`--ps-duration-${key}`] = value;
        }
    }

    if (easings) {
        for (const key in easings) {
            const value = easings[key as Easing];
            if (value) vars[`--ps-ease-${key}`] = value;
        }
    }

    if (tokens) {
        for (const key in tokens) {
            vars[key.startsWith("--") ? key : `--${key}`] = tokens[key];
        }
    }

    return vars as CSSProperties;
}

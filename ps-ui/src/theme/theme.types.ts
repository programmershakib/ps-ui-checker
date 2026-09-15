import type { ElementType, ReactNode } from "react";
import type {
    Base,
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

export interface ColorOverride {
    DEFAULT?: string;
    hover?: string;
    active?: string;
    foreground?: string;
    text?: string;
    border?: string;
    subtle?: string;
    subtleHover?: string;
    shadow?: string;
}

export interface ControlSizeOverride {
    height?: string;
    paddingX?: string;
    gap?: string;
    font?: string;
}

export interface ThemeConfig {
    colors?: Partial<Record<Color, ColorOverride>>;
    fontSizes?: Partial<Record<FontSize, string>>;
    fontWeights?: Partial<Record<FontWeight, string>>;
    fontFamily?: string;
    lineHeights?: Partial<Record<LineHeight, string>>;
    letterSpacings?: Partial<Record<LetterSpacing, string>>;
    radius?: Partial<Record<Radius, string>>;
    controlSizes?: Partial<Record<Size, ControlSizeOverride>>;
    compactSizes?: Partial<Record<Size, string>>;
    spacing?: Partial<Record<Space, string>>;
    shadows?: Partial<Record<Shadow, string>>;
    durations?: Partial<Record<Duration, string>>;
    easings?: Partial<Record<Easing, string>>;
    tokens?: Record<string, string>;
}

export interface ThemeProviderProps extends Base {
    as?: ElementType;
    theme?: ThemeConfig;
    mode?: "light" | "dark";
    children: ReactNode;
}

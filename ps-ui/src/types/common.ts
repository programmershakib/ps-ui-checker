import type { CSSProperties } from "react";

export interface Base {
    id?: string;
    style?: CSSProperties;
    className?: string;
}

export type Color =
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error";

export type ColorScale =
    | Color
    | "white"
    | "black"
    | "background"
    | "foreground"
    | "muted"
    | "subtle"
    | "disabled";

export type FontSize =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";

export type FontWeight =
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";

export type FontFamily = "sans" | "mono";

export type LineHeight = "tight" | "normal" | "relaxed" | "loose";

export type LetterSpacing =
    | "tighter"
    | "tight"
    | "normal"
    | "wide"
    | "wider"
    | "widest";

export type Radius = "none" | "sm" | "md" | "lg" | "full";

export type RadiusScale = Radius | "xs" | "xl" | "2xl" | "3xl" | "4xl";

export type Size = "sm" | "md" | "lg";

export type Space =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";

export type Shadow = "none" | "sm" | "md" | "lg";

export type Blur = "none" | "sm" | "md" | "lg";

export type ZIndexLayer =
    | "sticky"
    | "dropdown"
    | "overlay"
    | "modal"
    | "popover"
    | "tooltip"
    | "toast";

export type Duration = "instant" | "fast" | "base" | "slow";

export type Easing = "standard" | "spring";

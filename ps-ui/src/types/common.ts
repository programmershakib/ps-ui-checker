import type { CSSProperties } from "react";

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

export type Shadow = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type Blur = "none" | "sm" | "md" | "lg" | "xl";

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

export interface Base {
    id?: string;
    style?: CSSProperties;
    className?: string;
}

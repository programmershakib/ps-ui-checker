"use client";

import type { ThemeProviderProps } from "./theme.types";
import { createTheme } from "./theme";
import { useMemo } from "react";

export function ThemeProvider({
    as: Component = "div",
    id,
    style,
    className,
    theme,
    mode,
    children,
}: ThemeProviderProps) {
    const themeStyle = useMemo(
        () => (theme ? createTheme(theme) : undefined),
        [theme],
    );

    return (
        <Component
            id={id}
            data-theme={mode}
            style={{ ...themeStyle, ...style }}
            className={className}
        >
            {children}
        </Component>
    );
}

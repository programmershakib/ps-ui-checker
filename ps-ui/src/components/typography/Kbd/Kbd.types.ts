import type { HTMLAttributes, ReactNode } from "react";
import type { Base } from "../../../types";

export type KbdKey =
    | "command"
    | "shift"
    | "ctrl"
    | "option"
    | "alt"
    | "win"
    | "enter"
    | "delete"
    | "escape"
    | "tab"
    | "space"
    | "pageup"
    | "pagedown"
    | "home"
    | "end"
    | "up"
    | "down"
    | "left"
    | "right"
    | "fn"
    | (string & {});

export interface KbdProps
    extends Base, Omit<HTMLAttributes<HTMLElement>, keyof Base> {
    variant?: "default" | "light";
    keyValue?: KbdKey;
    children?: ReactNode;
}

export interface KbdAbbrProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

export interface KbdContentProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

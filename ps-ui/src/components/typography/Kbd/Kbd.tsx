"use client";

/* eslint-disable react-refresh/only-export-components */
import { cn } from "../../../utils";
import { forwardRef } from "react";
import "./Kbd.css";
import type {
    KbdAbbrProps,
    KbdContentProps,
    KbdKey,
    KbdProps,
} from "./Kbd.types";

const KEY_LABELS: Record<string, { label: string; title?: string }> = {
    command: { label: "⌘", title: "Command" },
    shift: { label: "⇧", title: "Shift" },
    ctrl: { label: "Ctrl", title: "Control" },
    option: { label: "⌥", title: "Option" },
    alt: { label: "Alt", title: "Alt" },
    win: { label: "⊞", title: "Windows" },
    enter: { label: "↵", title: "Enter" },
    delete: { label: "⌫", title: "Delete" },
    escape: { label: "Esc", title: "Escape" },
    tab: { label: "⇥", title: "Tab" },
    space: { label: "Space", title: "Space" },
    pageup: { label: "PgUp", title: "Page Up" },
    pagedown: { label: "PgDn", title: "Page Down" },
    home: { label: "Home" },
    end: { label: "End" },
    up: { label: "↑", title: "Arrow Up" },
    down: { label: "↓", title: "Arrow Down" },
    left: { label: "←", title: "Arrow Left" },
    right: { label: "→", title: "Arrow Right" },
    fn: { label: "Fn", title: "Function" },
};

function labelFor(keyValue?: KbdKey) {
    if (!keyValue) return null;
    return (
        KEY_LABELS[String(keyValue).toLowerCase()] ?? {
            label: String(keyValue),
        }
    );
}

const KbdRoot = forwardRef<HTMLElement, KbdProps>(
    ({ children, keyValue, variant = "default", className, ...props }, ref) => {
        const key = labelFor(keyValue);
        return (
            <kbd
                {...props}
                ref={ref}
                className={cn("ps-kbd", `ps-kbd--${variant}`, className)}
                data-slot="kbd"
            >
                {children ??
                    (key && (
                        <>
                            {key.title && (
                                <KbdAbbr title={key.title}>{key.label}</KbdAbbr>
                            )}
                            {!key.title && <KbdContent>{key.label}</KbdContent>}
                        </>
                    ))}
            </kbd>
        );
    },
);

KbdRoot.displayName = "Kbd";

export const KbdAbbr = forwardRef<HTMLElement, KbdAbbrProps>(
    ({ children, className, ...props }, ref) => (
        <abbr {...props} ref={ref} className={cn("ps-kbd__abbr", className)}>
            {children}
        </abbr>
    ),
);

KbdAbbr.displayName = "Kbd.Abbr";

export const KbdContent = forwardRef<HTMLElement, KbdContentProps>(
    ({ children, className, ...props }, ref) => (
        <span {...props} ref={ref} className={cn("ps-kbd__content", className)}>
            {children}
        </span>
    ),
);

KbdContent.displayName = "Kbd.Content";

export const Kbd = Object.assign(KbdRoot, {
    Abbr: KbdAbbr,
    Content: KbdContent,
});

export default Kbd;

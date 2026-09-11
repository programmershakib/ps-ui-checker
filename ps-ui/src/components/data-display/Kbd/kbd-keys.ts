export type KbdKey =
    | "command"
    | "shift"
    | "ctrl"
    | "option"
    | "enter"
    | "delete"
    | "escape"
    | "tab"
    | "capslock"
    | "up"
    | "right"
    | "down"
    | "left"
    | "pageup"
    | "pagedown"
    | "home"
    | "end"
    | "help"
    | "space"
    | "fn"
    | "win"
    | "alt";

interface KeyInfo {
    symbol: string;

    title: string;
}

export const KEY_MAP: Record<KbdKey, KeyInfo> = {
    command: { symbol: "⌘", title: "Command" },
    shift: { symbol: "⇧", title: "Shift" },
    ctrl: { symbol: "⌃", title: "Control" },
    option: { symbol: "⌥", title: "Option" },
    enter: { symbol: "↵", title: "Enter" },
    delete: { symbol: "⌫", title: "Delete" },
    escape: { symbol: "⎋", title: "Escape" },
    tab: { symbol: "⇥", title: "Tab" },
    capslock: { symbol: "⇪", title: "Caps Lock" },
    up: { symbol: "↑", title: "Up" },
    right: { symbol: "→", title: "Right" },
    down: { symbol: "↓", title: "Down" },
    left: { symbol: "←", title: "Left" },
    pageup: { symbol: "⇞", title: "Page Up" },
    pagedown: { symbol: "⇟", title: "Page Down" },
    home: { symbol: "↖", title: "Home" },
    end: { symbol: "↘", title: "End" },
    help: { symbol: "?", title: "Help" },
    space: { symbol: "␣", title: "Space" },
    fn: { symbol: "Fn", title: "Fn" },
    win: { symbol: "⌘", title: "Win" },
    alt: { symbol: "⌥", title: "Alt" },
};

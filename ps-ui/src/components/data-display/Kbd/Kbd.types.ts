import type { HTMLAttributes, ReactNode } from "react";
import type { Base } from "../../../types/common";
import type { KbdKey } from "./kbd-keys";

interface KbdClassNames {
    base?: string;
    abbr?: string;
    content?: string;
}

interface KbdOwnProps extends Base {
    children?: ReactNode;
    keys?: KbdKey | KbdKey[];
    classNames?: KbdClassNames;
}

export interface KbdProps
    extends KbdOwnProps, Omit<HTMLAttributes<HTMLElement>, keyof KbdOwnProps> {}

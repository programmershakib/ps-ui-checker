import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { Base } from "../../../types/common";
import type {
    AutoFocusEvent,
    EscapeKeyDownEvent,
    FocusOutsideEvent,
} from "../../../types/interaction";

interface FocusScopeOwnProps extends Base {
    as?: ElementType;

    contain?: boolean;
    loop?: boolean;

    autoFocus?: boolean;
    restoreFocus?: boolean;

    initialFocus?: HTMLElement | (() => HTMLElement | null);

    onMountAutoFocus?: (event: AutoFocusEvent) => void;
    onUnmountAutoFocus?: (event: AutoFocusEvent) => void;

    onFocusOutside?: (event: FocusOutsideEvent) => void;
    onEscapeKeyDown?: (event: EscapeKeyDownEvent) => void;

    children?: ReactNode;
}

export interface FocusScopeProps
    extends
        FocusScopeOwnProps,
        Omit<HTMLAttributes<HTMLElement>, keyof FocusScopeOwnProps> {}

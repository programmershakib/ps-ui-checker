import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { ContainerLike } from "../../../types";
import type {
    Base,
    AutoFocusEvent,
    EscapeKeyDownEvent,
    FocusOutsideEvent,
} from "../../../types";

interface FocusScopeOwnProps extends Base {
    as?: ElementType;

    contain?: boolean;
    loop?: boolean;

    autoFocus?: boolean;
    restoreFocus?: boolean;

    initialFocus?: HTMLElement | (() => HTMLElement | null);

    containers?: Array<ContainerLike>;

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

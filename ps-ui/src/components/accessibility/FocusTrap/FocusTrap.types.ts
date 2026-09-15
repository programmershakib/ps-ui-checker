import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type {
    Base,
    EscapeKeyDownEvent,
    FocusOutsideEvent,
    ContainerLike,
} from "../../../types";

interface FocusTrapOwnProps extends Base {
    as?: ElementType;

    active?: boolean;
    paused?: boolean;

    autoFocus?: boolean;
    restoreFocus?: boolean;

    initialFocus?: HTMLElement | (() => HTMLElement | null);
    fallbackFocus?: HTMLElement | (() => HTMLElement | null);

    containers?: Array<ContainerLike>;

    modal?: boolean;

    onActivate?: () => void;
    onDeactivate?: () => void;

    onFocusOutside?: (event: FocusOutsideEvent) => void;
    onEscapeKeyDown?: (event: EscapeKeyDownEvent) => void;

    children?: ReactNode;
}

export interface FocusTrapProps
    extends
        FocusTrapOwnProps,
        Omit<HTMLAttributes<HTMLElement>, keyof FocusTrapOwnProps> {}

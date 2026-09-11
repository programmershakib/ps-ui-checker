export interface FocusOutsideEvent {
    originalEvent: FocusEvent;
    preventDefault: () => void;
}

export interface EscapeKeyDownEvent {
    originalEvent: KeyboardEvent;
    preventDefault: () => void;
}

export interface AutoFocusEvent {
    preventDefault: () => void;
}

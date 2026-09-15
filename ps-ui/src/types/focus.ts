export type ContainerLike =
    | HTMLElement
    | { current: HTMLElement | null }
    | (() => HTMLElement | null | Array<HTMLElement | null>);

export interface StackableFocusScope {
    container: HTMLElement;
    paused: boolean;
    pause: () => void;
    resume: () => void;
}

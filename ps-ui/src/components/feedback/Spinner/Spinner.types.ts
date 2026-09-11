import type { Base, Color, Size } from "../../../types/common";

export type SpinnerVariant =
    | "default"
    | "fade"
    | "spinner"
    | "swirling"
    | "dots";

type StrokeLinecap = "round" | "butt" | "square";

interface SpinnerClassNames {
    default?: string;
    fade?: string;
    spinner?: string;
    swirling?: string;
    dots?: string;
}

export interface SpinnerProps extends Base {
    variant?: SpinnerVariant;
    color?: Color | "current" | (string & {});
    size?: Size | number | (string & {});

    speed?: number;
    reverse?: boolean;

    strokeLinecap?: StrokeLinecap;

    label?: string;

    classNames?: SpinnerClassNames;
}

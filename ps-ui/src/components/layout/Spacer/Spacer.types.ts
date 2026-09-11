import type { Base, Space } from "../../../types/common";
import type { HTMLAttributes } from "react";

type SpacerSize = Space | number | (string & {});

type SpacerAxis = "horizontal" | "vertical";

interface SpacerOwnProps extends Base {
    size?: SpacerSize;
    axis?: SpacerAxis;
    minSize?: SpacerSize;
    maxSize?: SpacerSize;
}

export interface SpacerProps
    extends
        SpacerOwnProps,
        Omit<HTMLAttributes<HTMLDivElement>, keyof SpacerOwnProps> {}

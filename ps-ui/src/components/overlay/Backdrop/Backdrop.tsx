"use client";

import type { BackdropProps } from "./Backdrop.types";
import { Portal } from "../../utility/Portal";
import { cn } from "../../../utils";
import "./Backdrop.css";

export function Backdrop({
    open = true,
    variant = "backdrop",
    opacity,
    className,
    style,
}: BackdropProps) {
    if (!open) return null;

    return (
        <Portal>
            <div
                className={cn("ps-backdrop", className)}
                data-open="true"
                data-variant={variant}
                style={{
                    ...(opacity !== undefined && {
                        "--ps-backdrop-opacity": opacity,
                    }),
                    ...style,
                }}
            />
        </Portal>
    );
}

export default Backdrop;

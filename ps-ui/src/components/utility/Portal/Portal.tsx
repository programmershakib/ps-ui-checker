"use client";

import type { ElementLike } from "../../../types";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

function resolveElement(target: ElementLike) {
    if (!target || typeof document === "undefined") return null;
    if (typeof target === "function") return target();
    if ("current" in target) return target.current;
    return target;
}

export function Portal({
    children,
    container,
}: {
    children: ReactNode;
    container?: ElementLike;
}) {
    if (typeof document === "undefined") return null;
    return createPortal(children, resolveElement(container) ?? document.body);
}

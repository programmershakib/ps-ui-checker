"use client";

import { cn } from "../../../utils/class-names/cn";
import type { KbdProps } from "./Kbd.types";
import { forwardRef, memo } from "react";
import { KEY_MAP } from "./kbd-keys";
import "./Kbd.css";

const Kbd = forwardRef<HTMLElement, KbdProps>(
    ({ id, style, className, classNames, children, keys, ...rest }, ref) => {
        const keyList = keys ? (Array.isArray(keys) ? keys : [keys]) : [];

        return (
            <kbd
                {...rest}
                ref={ref}
                id={id}
                style={style}
                className={cn("ps-kbd", className, classNames?.base)}
            >
                {keyList.map((key) => (
                    <abbr
                        key={key}
                        className={cn("ps-kbd__abbr", classNames?.abbr)}
                        title={KEY_MAP[key].title}
                    >
                        {KEY_MAP[key].symbol}
                    </abbr>
                ))}

                {children !== undefined && (
                    <span
                        className={cn("ps-kbd__content", classNames?.content)}
                    >
                        {children}
                    </span>
                )}
            </kbd>
        );
    },
);

const MemoizedKbd = memo(Kbd);

MemoizedKbd.displayName = "Kbd";

export default MemoizedKbd;

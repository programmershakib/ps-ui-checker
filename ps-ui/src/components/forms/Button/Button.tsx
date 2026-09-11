"use client";

import { cn } from "../../../utils/class-names/cn";
import type { ButtonProps } from "./Button.types";
import { Spinner } from "../../feedback/Spinner";
import { buttonRecipe } from "./Button.recipe";
import { Ripple } from "../../effects/Ripple";
import { forwardRef, memo } from "react";
import "./Button.css";

function resolveSpinnerSize(size: ButtonProps["size"]): number {
    switch (size) {
        case "sm":
            return 16;
        case "md":
            return 20;
        case "lg":
            return 24;
        default:
            return 20;
    }
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            type = "button",
            id,
            style,
            className,
            variant = "solid",
            color = "default",
            size = "md",
            radius = "md",
            fullWidth = false,
            iconOnly = false,
            startContent,
            endContent,
            spinner,
            spinnerVariant = "default",
            spinnerColor = "current",
            spinnerSize,
            spinnerPlacement = "start",
            loading = false,
            disableAnimation = false,
            disableRipple = false,
            disabled = false,
            children,
            ...rest
        },
        ref,
    ) => {
        const isDisabled = disabled || loading;

        const resolvedSpinnerSize = spinnerSize ?? resolveSpinnerSize(size);

        const spinnerElement = (
            <Spinner
                variant={spinnerVariant}
                color={spinnerColor}
                size={resolvedSpinnerSize}
            />
        );

        return (
            <button
                {...rest}
                id={id}
                ref={ref}
                type={type}
                style={style}
                disabled={isDisabled}
                aria-busy={loading || undefined}
                data-loading={loading || undefined}
                data-disable-animation={disableAnimation || undefined}
                data-ripple-disabled={disableRipple || undefined}
                className={cn(
                    buttonRecipe({ size, color, variant, radius }),
                    fullWidth && "ps-button--full-width",
                    iconOnly && "ps-button--icon-only",
                    className,
                )}
            >
                {loading && spinnerPlacement === "start"
                    ? (spinner ?? spinnerElement)
                    : startContent}

                {children}

                {loading && spinnerPlacement === "end"
                    ? (spinner ?? spinnerElement)
                    : endContent}

                {!disableRipple && !isDisabled && <Ripple />}
            </button>
        );
    },
);

const MemoizedButton = memo(Button);

MemoizedButton.displayName = "Button";

export default MemoizedButton;

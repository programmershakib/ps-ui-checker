"use client";

/* -------------------------------------------------------------------------------------------------
 * Button — packages/react/src/components/button/button.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef} from "react";

import React, {use} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {composeTwRenderProps} from "../lib/compose";
import {buttonVariants} from "../lib/styles/button.styles";

type ButtonVariants = ReturnType<typeof buttonVariants> extends string
  ? {
      fullWidth?: boolean;
      isIconOnly?: boolean;
      size?: "sm" | "md" | "lg";
      variant?:
        | "primary"
        | "secondary"
        | "tertiary"
        | "ghost"
        | "outline"
        | "danger"
        | "danger-soft";
    }
  : never;

export const BUTTON_GROUP_CHILD = Symbol.for("heroui.button-group-child");

interface ButtonRootProps extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {
  [BUTTON_GROUP_CHILD]?: boolean;
}

const ButtonRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  isIconOnly,
  size,
  slot,
  style,
  variant,
  ...rest
}: ButtonRootProps) => {
  const styles = buttonVariants({
    fullWidth: fullWidth ?? false,
    isIconOnly: isIconOnly ?? false,
    size: size ?? "md",
    variant: variant ?? "primary",
    className: typeof className === "string" ? className : undefined,
  }) as string;

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="button"
      isDisabled={isDisabled}
      slot={slot}
      style={style}
      {...rest}
    >
      {(renderProps: any) =>
        typeof children === "function" ? (children as any)(renderProps) : children
      }
    </ButtonPrimitive>
  );
};

export {ButtonRoot};
export type {ButtonRootProps};

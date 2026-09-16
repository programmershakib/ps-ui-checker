"use client";

/* -------------------------------------------------------------------------------------------------
 * Avatar — packages/react/src/components/avatar/avatar.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef} from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React, {createContext} from "react";

import {composeSlotClassName} from "../lib/compose";
import {avatarVariants} from "../lib/styles/avatar.styles";

/* ------------------------------------------------------------------------------------------------
 * Avatar Context
 * --------------------------------------------------------------------------------------------- */
type AvatarContext = {
  slots?: ReturnType<typeof avatarVariants>;
};

const AvatarContext = createContext<AvatarContext>({});

/* -------------------------------------------------------------------------------------------------
 * Avatar Root
 * -----------------------------------------------------------------------------------------------*/
interface AvatarRootProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Root> {
  color?: "default" | "accent" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "soft";
}

const AvatarRoot = ({children, className, color, size, variant, ...props}: AvatarRootProps) => {
  const slots = React.useMemo(
    () => avatarVariants({color, size, variant}),
    [color, size, variant],
  ) as any;

  return (
    <AvatarContext value={{slots}}>
      <AvatarPrimitive.Root className={slots.base({className})} {...props}>
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Avatar Image
 * -----------------------------------------------------------------------------------------------*/
interface AvatarImageProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Image> {}

const AvatarImage = ({
  className,
  crossOrigin,
  loading,
  onError,
  onLoad,
  sizes,
  src,
  srcSet,
  ...props
}: AvatarImageProps) => {
  const {slots} = React.use(AvatarContext) as AvatarContext;

  return (
    <AvatarPrimitive.Image
      className={composeSlotClassName((slots as any)?.image, className)}
      crossOrigin={crossOrigin}
      loading={loading}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      onError={onError}
      onLoad={onLoad}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Avatar Fallback
 * -----------------------------------------------------------------------------------------------*/
interface AvatarFallbackProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> {
  color?: AvatarRootProps["color"];
}

const AvatarFallback = ({className, color, ...props}: AvatarFallbackProps) => {
  const {slots} = React.use(AvatarContext) as AvatarContext;

  return (
    <AvatarPrimitive.Fallback
      className={composeSlotClassName((slots as any)?.fallback, className, {color})}
      data-slot="avatar-fallback"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};
export type {AvatarRootProps, AvatarImageProps, AvatarFallbackProps};

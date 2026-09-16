"use client";

/* -------------------------------------------------------------------------------------------------
 * Separator — packages/react/src/components/separator/separator.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef} from "react";

import {SeparatorContext, Separator as SeparatorPrimitive} from "react-aria-components/Separator";
import {useSlottedContext} from "react-aria-components/slots";

import {separatorVariants} from "../lib/styles/separator.styles";

interface SeparatorRootProps extends ComponentPropsWithRef<typeof SeparatorPrimitive> {
  variant?: "default" | "secondary" | "tertiary";
}

const SeparatorRoot = ({className, orientation, variant, ...props}: SeparatorRootProps) => {
  const context = useSlottedContext(SeparatorContext) as {orientation?: string} | undefined;
  const resolvedOrientation = (orientation ?? context?.orientation ?? "horizontal") as
    | "horizontal"
    | "vertical";

  return (
    <SeparatorPrimitive
      data-orientation={resolvedOrientation}
      data-slot="separator"
      orientation={resolvedOrientation}
      className={separatorVariants({
        orientation: resolvedOrientation,
        variant: variant ?? "default",
        className: typeof className === "string" ? className : undefined,
      })}
      {...props}
    />
  );
};

export {SeparatorRoot};
export type {SeparatorRootProps};

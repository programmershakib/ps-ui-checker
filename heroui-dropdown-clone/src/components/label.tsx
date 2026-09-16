"use client";

/* -------------------------------------------------------------------------------------------------
 * Label — packages/react/src/components/label/label.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef} from "react";

import {Label as LabelPrimitive} from "react-aria-components/Label";

import {labelVariants} from "../lib/styles/label.styles";

interface LabelRootProps extends ComponentPropsWithRef<typeof LabelPrimitive> {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
}

const LabelRoot = ({
  children,
  className,
  isDisabled,
  isInvalid,
  isRequired,
  ...rest
}: LabelRootProps) => {
  return (
    <LabelPrimitive
      className={labelVariants({
        isRequired,
        isDisabled,
        isInvalid,
        className: typeof className === "string" ? className : undefined,
      })}
      data-slot="label"
      {...rest}
    >
      {children}
    </LabelPrimitive>
  );
};

export {LabelRoot};
export type {LabelRootProps};

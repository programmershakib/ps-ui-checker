"use client";

/* -------------------------------------------------------------------------------------------------
 * Description — packages/react/src/components/description/description.tsx
 * -----------------------------------------------------------------------------------------------*/

import type {ComponentPropsWithRef} from "react";
import type {TextProps} from "react-aria-components/Text";

import {Text} from "react-aria-components/Text";

import {descriptionVariants} from "../lib/styles/description.styles";

interface DescriptionRootProps extends ComponentPropsWithRef<typeof Text>, TextProps {}

const DescriptionRoot = ({children, className, ...rest}: DescriptionRootProps) => {
  return (
    <Text
      className={descriptionVariants({
        className: typeof className === "string" ? className : undefined,
      })}
      data-slot="description"
      slot="description"
      {...rest}
    >
      {children}
    </Text>
  );
};

export {DescriptionRoot};
export type {DescriptionRootProps};

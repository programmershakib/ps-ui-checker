"use client";

import { useControllableState } from "../../../hooks/state/useControllableState";
import { useGroupValidation } from "../../../hooks/state/useGroupValidation";
import type { CheckboxGroupProps } from "./CheckboxGroup.types";
import { CheckboxGroupContext } from "./CheckboxGroup.context";
import { cn } from "../../../utils/class-names/cn";
import { forwardRef, memo, useId } from "react";
import { Text } from "../../typography/Text";
import { Flex } from "../../layout/Flex";
import "./CheckboxGroup.css";

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
    (
        {
            id,
            style,
            className,
            classNames,
            value,
            defaultValue,
            onChange,
            color = "primary",
            size = "md",
            orientation = "vertical",
            label,
            description,
            children,
            required = false,
            readOnly = false,
            disabled = false,
            invalid,
            errorMessage,
            validate,
            ...rest
        },
        ref,
    ) => {
        const labelId = useId();

        const [selected, setSelected] = useControllableState<string[]>({
            value,
            defaultValue: defaultValue ?? [],
            onChange,
        });

        const { isInvalid, resolvedErrorMessage } = useGroupValidation({
            value: selected,
            invalid,
            validate,
            errorMessage,
        });

        return (
            <Flex
                {...rest}
                as="div"
                ref={ref}
                id={id}
                style={style}
                direction="column"
                gap="sm"
                role="group"
                aria-required={required || undefined}
                aria-invalid={isInvalid || undefined}
                aria-labelledby={label ? labelId : undefined}
                aria-label={typeof label === "string" ? label : undefined}
                className={cn("ps-checkbox-group", className, classNames?.base)}
            >
                {label && (
                    <Text
                        as="span"
                        id={labelId}
                        size={size}
                        weight="semibold"
                        className={cn(
                            "ps-checkbox-group__label",
                            classNames?.label,
                        )}
                    >
                        {label}
                        {required && (
                            <span
                                className="ps-checkbox-group__required"
                                aria-hidden="true"
                            >
                                {" "}
                                *
                            </span>
                        )}
                    </Text>
                )}

                {description && (
                    <Text
                        as="span"
                        size="sm"
                        color="muted"
                        className={cn(
                            "ps-checkbox-group__description",
                            classNames?.description,
                        )}
                    >
                        {description}
                    </Text>
                )}

                <Flex
                    direction={orientation === "horizontal" ? "row" : "column"}
                    wrap={orientation === "horizontal" ? "wrap" : "nowrap"}
                    gap={orientation === "horizontal" ? "lg" : "sm"}
                    className={classNames?.wrapper}
                >
                    <CheckboxGroupContext.Provider
                        value={{
                            value: selected,
                            onChange: setSelected,
                            color,
                            size,
                            disabled,
                            readOnly,
                            required,
                            invalid: isInvalid,
                        }}
                    >
                        {children}
                    </CheckboxGroupContext.Provider>
                </Flex>

                {isInvalid && resolvedErrorMessage && (
                    <Text as="span" size="sm" color="error">
                        {resolvedErrorMessage}
                    </Text>
                )}
            </Flex>
        );
    },
);

const MemoizedCheckboxGroup = memo(CheckboxGroup);

MemoizedCheckboxGroup.displayName = "CheckboxGroup";

export default MemoizedCheckboxGroup;

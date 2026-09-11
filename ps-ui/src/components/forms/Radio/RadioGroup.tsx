"use client";

import { useControllableState } from "../../../hooks/state/useControllableState";
import { useGroupValidation } from "../../../hooks/state/useGroupValidation";
import type { RadioGroupProps } from "./RadioGroup.types";
import { RadioGroupContext } from "./RadioGroup.context";
import { cn } from "../../../utils/class-names/cn";
import { forwardRef, memo, useId } from "react";
import { Text } from "../../typography/Text";
import { Flex } from "../../layout/Flex";
import "./RadioGroup.css";

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            id,
            style,
            className,
            classNames,
            name,
            value,
            defaultValue,
            onChange,
            color = "primary",
            size = "md",
            orientation = "vertical",
            label,
            description,
            disabled = false,
            readOnly = false,
            required = false,
            invalid,
            errorMessage,
            validate,
            children,
            ...rest
        },
        ref,
    ) => {
        const generatedName = useId();
        const labelId = useId();
        const groupName = name ?? generatedName;

        const [selected, setSelected] = useControllableState<string | null>({
            value,
            defaultValue: defaultValue ?? null,
            onChange: (next) => {
                if (next !== null) onChange?.(next);
            },
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
                role="radiogroup"
                aria-required={required || undefined}
                aria-invalid={isInvalid || undefined}
                aria-labelledby={label ? labelId : undefined}
                aria-label={typeof label === "string" ? label : undefined}
                className={cn("ps-radio-group", className, classNames?.base)}
            >
                {label && (
                    <Text
                        as="span"
                        id={labelId}
                        size={size}
                        weight="semibold"
                        className={cn(
                            "ps-radio-group__label",
                            classNames?.label,
                        )}
                    >
                        {label}
                        {required && (
                            <span
                                className="ps-radio-group__required"
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
                            "ps-radio-group__description",
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
                    <RadioGroupContext.Provider
                        value={{
                            name: groupName,
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
                    </RadioGroupContext.Provider>
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

const MemoizedRadioGroup = memo(RadioGroup);

MemoizedRadioGroup.displayName = "RadioGroup";

export default MemoizedRadioGroup;

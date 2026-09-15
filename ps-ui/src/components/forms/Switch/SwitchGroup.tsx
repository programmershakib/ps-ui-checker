"use client";

import { useControllableState, useGroupValidation } from "../../../hooks";
import type { SwitchGroupProps } from "./SwitchGroup.types";
import { SwitchGroupContext } from "./SwitchGroup.context";
import { forwardRef, memo, useId } from "react";
import { Text } from "../../typography/Text";
import { Flex } from "../../layout/Flex";
import { cn } from "../../../utils";
import "./SwitchGroup.css";

const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(
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
                className={cn("ps-switch-group", className, classNames?.base)}
            >
                {label && (
                    <Text
                        as="span"
                        id={labelId}
                        size={size}
                        weight="semibold"
                        className={cn(
                            "ps-switch-group__label",
                            classNames?.label,
                        )}
                    >
                        {label}
                        {required && (
                            <span
                                className="ps-switch-group__required"
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
                            "ps-switch-group__description",
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
                    <SwitchGroupContext.Provider
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
                    </SwitchGroupContext.Provider>
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

const MemoizedSwitchGroup = memo(SwitchGroup);

MemoizedSwitchGroup.displayName = "SwitchGroup";

export default MemoizedSwitchGroup;

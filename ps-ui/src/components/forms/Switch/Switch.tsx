"use client";

import { forwardRef, memo, useId, type ChangeEvent } from "react";
import { useSwitchGroupContext } from "./SwitchGroup.context";
import { useControllableState } from "../../../hooks";
import type { SwitchProps } from "./Switch.types";
import { switchRecipe } from "./Switch.recipe";
import { cn } from "../../../utils";
import "./Switch.css";

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            id,
            style,
            className,
            classNames,
            value,
            color,
            size,
            checked,
            defaultChecked = false,
            startContent,
            endContent,
            thumbContent,
            children,
            childrenPlacement = "end",
            description,
            descriptionLayout = "stacked",
            alignIndicator = "center",
            onChange,
            required,
            readOnly,
            disabled,
            invalid,
            disableAnimation = false,
            ...rest
        },
        ref,
    ) => {
        const group = useSwitchGroupContext();
        const isGrouped = Boolean(group && value !== undefined);

        const generatedId = useId();
        const inputId = id ?? generatedId;

        const [standaloneChecked, setStandaloneChecked] = useControllableState({
            value: checked,
            defaultValue: defaultChecked,
            onChange,
        });

        const isChecked =
            isGrouped && group
                ? group.value.includes(value!)
                : standaloneChecked;

        const resolvedColor =
            color ?? (isGrouped && group ? group.color : "primary");
        const resolvedSize = size ?? (isGrouped && group ? group.size : "md");
        const isDisabled =
            disabled ?? (isGrouped && group ? group.disabled : false);
        const isReadOnly =
            readOnly ?? (isGrouped && group ? group.readOnly : false);
        const isRequired =
            required ?? (isGrouped && group ? group.required : false);
        const isInvalid =
            invalid ?? (isGrouped && group ? group.invalid : false);

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if (isDisabled || isReadOnly) return;

            if (isGrouped && group && value !== undefined) {
                const next = event.target.checked
                    ? [...group.value, value]
                    : group.value.filter((item) => item !== value);
                group.onChange(next);
                return;
            }

            setStandaloneChecked(event.target.checked);
        };

        const resolvedThumbContent =
            typeof thumbContent === "function"
                ? thumbContent(isChecked)
                : thumbContent;

        const descriptionNode = description && (
            <span
                className={cn(
                    "ps-switch__description",
                    classNames?.description,
                )}
            >
                {description}
            </span>
        );

        return (
            <label
                style={style}
                htmlFor={inputId}
                data-disable-animation={disableAnimation || undefined}
                className={cn(
                    switchRecipe({
                        color: resolvedColor,
                        size: resolvedSize,
                        childrenPlacement,
                    }),
                    `ps-switch--align-${alignIndicator}`,
                    `ps-switch--layout-${descriptionLayout}`,
                    isDisabled && "ps-switch--disabled",
                    isReadOnly && "ps-switch--readonly",
                    isInvalid && "ps-switch--invalid",
                    className,
                    classNames?.base,
                )}
            >
                <span className="ps-switch__row">
                    <input
                        {...rest}
                        ref={ref}
                        id={inputId}
                        type="checkbox"
                        role="switch"
                        value={value}
                        className="ps-switch__input"
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={isDisabled}
                        required={isRequired}
                        aria-invalid={isInvalid || undefined}
                        aria-readonly={isReadOnly || undefined}
                        data-readonly={isReadOnly || undefined}
                    />

                    <span
                        className={cn("ps-switch__track", classNames?.wrapper)}
                    >
                        {startContent && (
                            <span className="ps-switch__content ps-switch__content--start">
                                {startContent}
                            </span>
                        )}

                        <span
                            className={cn(
                                "ps-switch__thumb",
                                classNames?.thumb,
                            )}
                        >
                            {resolvedThumbContent && (
                                <span className="ps-switch__thumb-content">
                                    {resolvedThumbContent}
                                </span>
                            )}
                        </span>

                        {endContent && (
                            <span className="ps-switch__content ps-switch__content--end">
                                {endContent}
                            </span>
                        )}
                    </span>

                    {(children ||
                        (description && descriptionLayout !== "full")) && (
                        <span className="ps-switch__text">
                            {children && (
                                <span
                                    className={cn(
                                        "ps-switch__label",
                                        classNames?.label,
                                    )}
                                >
                                    {children}
                                    {isRequired && (
                                        <span
                                            className="ps-switch__required"
                                            aria-hidden="true"
                                        >
                                            {" "}
                                            *
                                        </span>
                                    )}
                                </span>
                            )}

                            {descriptionLayout !== "full" && descriptionNode}
                        </span>
                    )}
                </span>

                {descriptionLayout === "full" && descriptionNode}
            </label>
        );
    },
);

const MemoizedSwitch = memo(Switch);

MemoizedSwitch.displayName = "Switch";

export default MemoizedSwitch;

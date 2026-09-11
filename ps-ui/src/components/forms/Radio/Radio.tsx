"use client";

import { useControllableState } from "../../../hooks/state/useControllableState";
import { useRadioGroupContext } from "./RadioGroup.context";
import { cn } from "../../../utils/class-names/cn";
import { forwardRef, memo, useId } from "react";
import type { RadioProps } from "./Radio.types";
import { radioRecipe } from "./Radio.recipe";
import "./Radio.css";

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            id,
            style,
            className,
            classNames,
            value,
            checked,
            defaultChecked = false,
            color,
            size,
            description,
            childrenPlacement = "end",
            alignIndicator = "center",
            descriptionLayout = "stacked",
            disabled,
            required,
            readOnly,
            invalid,
            disableAnimation = false,
            onChange,
            children,
            ...rest
        },
        ref,
    ) => {
        const group = useRadioGroupContext();
        const isGrouped = Boolean(group && value !== undefined);

        const generatedId = useId();
        const inputId = id ?? generatedId;

        const [standaloneChecked, setStandaloneChecked] = useControllableState({
            value: checked,
            defaultValue: defaultChecked,
            onChange,
        });

        const isChecked =
            isGrouped && group ? group.value === value : standaloneChecked;

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

        const handleChange = () => {
            if (isDisabled || isReadOnly) return;

            if (isGrouped && group && value !== undefined) {
                group.onChange(value);
                return;
            }

            setStandaloneChecked(true);
        };

        const descriptionNode = description && (
            <span
                className={cn("ps-radio__description", classNames?.description)}
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
                    radioRecipe({
                        color: resolvedColor,
                        size: resolvedSize,
                        alignIndicator,
                        childrenPlacement,
                    }),
                    `ps-radio--layout-${descriptionLayout}`,
                    isDisabled && "ps-radio--disabled",
                    isReadOnly && "ps-radio--readonly",
                    isInvalid && "ps-radio--invalid",
                    className,
                    classNames?.base,
                )}
            >
                <span className={cn("ps-radio__row", classNames?.wrapper)}>
                    <input
                        {...rest}
                        ref={ref}
                        id={inputId}
                        type="radio"
                        name={isGrouped && group ? group.name : rest.name}
                        value={value}
                        className="ps-radio__input"
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={isDisabled}
                        required={isRequired}
                        readOnly={isReadOnly}
                        aria-readonly={isReadOnly || undefined}
                        aria-required={isRequired || undefined}
                        aria-invalid={isInvalid || undefined}
                    />

                    <span className="ps-radio__box">
                        <span className="ps-radio__dot" />
                    </span>

                    {(children ||
                        (description && descriptionLayout !== "full")) && (
                        <span className="ps-radio__text">
                            {children && (
                                <span
                                    className={cn(
                                        "ps-radio__label",
                                        classNames?.label,
                                    )}
                                >
                                    {children}
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

const MemoizedRadio = memo(Radio);

MemoizedRadio.displayName = "Radio";

export default MemoizedRadio;

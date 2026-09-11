"use client";

import { useControllableState } from "../../../hooks/state/useControllableState";
import { useCheckboxGroupContext } from "./CheckboxGroup.context";
import type { CheckboxProps } from "./Checkbox.types";
import { checkboxRecipe } from "./Checkbox.recipe";
import { cn } from "../../../utils/class-names/cn";
import "./Checkbox.css";
import {
    forwardRef,
    memo,
    useEffect,
    useId,
    useRef,
    type ChangeEvent,
} from "react";

function DefaultIcon() {
    return (
        <svg
            className="ps-checkbox__icon-svg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <polyline
                className="ps-checkbox__icon-check"
                points="4 12 9 17 20 6"
            />
            <path className="ps-checkbox__icon-dash" d="M5 12H19" />
        </svg>
    );
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            id,
            style,
            className,
            classNames,
            value,
            color,
            size,
            radius = "md",
            checked,
            defaultChecked = false,
            indeterminate = false,
            lineThrough = false,
            alignIndicator = "center",
            icon,
            children,
            childrenPlacement = "end",
            onChange,
            required,
            readOnly,
            disabled,
            invalid,
            description,
            descriptionLayout = "stacked",
            disableAnimation = false,
            ...rest
        },
        ref,
    ) => {
        const group = useCheckboxGroupContext();
        const isGrouped = Boolean(group && value !== undefined);

        const generatedId = useId();
        const inputId = id ?? generatedId;
        const internalRef = useRef<HTMLInputElement>(null);

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

        useEffect(() => {
            if (internalRef.current) {
                internalRef.current.indeterminate = indeterminate;
            }
        }, [indeterminate]);

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

        const setRefs = (node: HTMLInputElement | null) => {
            internalRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
        };

        const resolvedIcon =
            typeof icon === "function"
                ? icon({ checked: isChecked, indeterminate })
                : icon;

        const descriptionNode = description && (
            <span
                className={cn(
                    "ps-checkbox__description",
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
                    checkboxRecipe({
                        color: resolvedColor,
                        size: resolvedSize,
                        radius,
                        childrenPlacement,
                        alignIndicator,
                    }),
                    `ps-checkbox--layout-${descriptionLayout}`,
                    isDisabled && "ps-checkbox--disabled",
                    isReadOnly && "ps-checkbox--readonly",
                    isInvalid && "ps-checkbox--invalid",
                    className,
                    classNames?.base,
                )}
            >
                <span className="ps-checkbox__row">
                    <input
                        {...rest}
                        ref={setRefs}
                        id={inputId}
                        type="checkbox"
                        value={value}
                        className="ps-checkbox__input"
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={isDisabled}
                        readOnly={isReadOnly}
                        required={isRequired}
                        aria-readonly={isReadOnly || undefined}
                        aria-required={isRequired || undefined}
                        aria-invalid={isInvalid || undefined}
                        aria-checked={indeterminate ? "mixed" : isChecked}
                    />

                    <span
                        className={cn("ps-checkbox__box", classNames?.wrapper)}
                    >
                        <span
                            className={cn(
                                "ps-checkbox__icon",
                                classNames?.icon,
                            )}
                        >
                            {resolvedIcon ?? <DefaultIcon />}
                        </span>
                    </span>

                    {(children ||
                        (description && descriptionLayout !== "full")) && (
                        <span className="ps-checkbox__text">
                            {children && (
                                <span
                                    className={cn(
                                        "ps-checkbox__label",
                                        lineThrough &&
                                            isChecked &&
                                            "ps-checkbox__label--line-through",
                                        classNames?.label,
                                    )}
                                >
                                    {children}
                                    {isRequired && (
                                        <span
                                            className="ps-checkbox__required"
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

const MemoizedCheckbox = memo(Checkbox);

MemoizedCheckbox.displayName = "Checkbox";

export default MemoizedCheckbox;

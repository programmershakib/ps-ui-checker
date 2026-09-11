import { resolveColor } from "../../../utils/resolvers/resolve-color";
import type { DividerProps } from "./Divider.types";
import { cn } from "../../../utils/class-names/cn";
import { dividerRecipe } from "./Divider.recipe";
import type { ElementType } from "react";
import "./Divider.css";

const THICKNESS_TOKENS = new Set(["thin", "medium", "thick"]);

function isThicknessToken(
    value: unknown,
): value is "thin" | "medium" | "thick" {
    return typeof value === "string" && THICKNESS_TOKENS.has(value);
}

function resolveThickness(value: string | number): string {
    return typeof value === "number" ? `${value}px` : value;
}

const Divider = ({
    as,
    id,
    style,
    className,
    classNames,
    orientation = "horizontal",
    variant = "solid",
    color,
    thickness = "thin",
    inset = false,
    children,
    childrenAlign = "center",
    ...rest
}: DividerProps) => {
    const thicknessIsToken = isThicknessToken(thickness);
    const inlineThickness = thicknessIsToken
        ? undefined
        : resolveThickness(thickness);

    const resolvedColor = color ? resolveColor(color) : undefined;

    const sizeStyle = inlineThickness
        ? orientation === "horizontal"
            ? { borderTopWidth: inlineThickness }
            : { borderLeftWidth: inlineThickness }
        : undefined;

    const Component = (as ?? (children ? "div" : "hr")) as ElementType;

    const baseClassName = cn(
        dividerRecipe({
            orientation,
            variant,
            thickness: thicknessIsToken ? thickness : undefined,
        }),
        inset && "ps-divider--inset",
        className,
        classNames?.base,
    );

    if (!children) {
        return (
            <Component
                {...rest}
                id={id}
                role={Component === "hr" ? undefined : "separator"}
                aria-orientation={
                    orientation === "vertical" ? "vertical" : undefined
                }
                style={{
                    ...style,
                    ...sizeStyle,
                    ...(resolvedColor && { borderColor: resolvedColor }),
                }}
                className={baseClassName}
            />
        );
    }

    return (
        <Component
            {...rest}
            id={id}
            role="separator"
            aria-orientation={
                orientation === "vertical" ? "vertical" : undefined
            }
            style={style}
            className={cn(
                baseClassName,
                `ps-divider--children-${childrenAlign}`,
            )}
        >
            <span
                className={cn("ps-divider__line", classNames?.line)}
                style={{
                    ...sizeStyle,
                    ...(resolvedColor && { borderColor: resolvedColor }),
                }}
            />
            <span className={cn("ps-divider__label", classNames?.label)}>
                {children}
            </span>
            <span
                className={cn("ps-divider__line", classNames?.line)}
                style={{
                    ...sizeStyle,
                    ...(resolvedColor && { borderColor: resolvedColor }),
                }}
            />
        </Component>
    );
};

export default Divider;

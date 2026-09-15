import { createRecipe } from "../../../system";

export const buttonRecipe = createRecipe({
    base: "ps-button",
    variants: {
        size: {
            sm: "ps-button--sm",
            md: "ps-button--md",
            lg: "ps-button--lg",
        },
        color: {
            default: "ps-button--default",
            primary: "ps-button--primary",
            secondary: "ps-button--secondary",
            success: "ps-button--success",
            warning: "ps-button--warning",
            error: "ps-button--error",
        },
        variant: {
            solid: "ps-button--solid",
            bordered: "ps-button--bordered",
            shadow: "ps-button--shadow",
            text: "ps-button--text",
            flat: "ps-button--flat",
            ghost: "ps-button--ghost",
        },
        radius: {
            none: "ps-button--radius-none",
            sm: "ps-button--radius-sm",
            md: "ps-button--radius-md",
            lg: "ps-button--radius-lg",
            full: "ps-button--radius-full",
        },
    },
});

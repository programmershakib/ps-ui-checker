import { createRecipe } from "../../../system/create-recipe";

export const checkboxRecipe = createRecipe({
    base: "ps-checkbox",
    variants: {
        color: {
            default: "ps-checkbox--default",
            primary: "ps-checkbox--primary",
            secondary: "ps-checkbox--secondary",
            success: "ps-checkbox--success",
            warning: "ps-checkbox--warning",
            error: "ps-checkbox--error",
        },
        size: {
            sm: "ps-checkbox--sm",
            md: "ps-checkbox--md",
            lg: "ps-checkbox--lg",
        },
        radius: {
            none: "ps-checkbox--radius-none",
            sm: "ps-checkbox--radius-sm",
            md: "ps-checkbox--radius-md",
            lg: "ps-checkbox--radius-lg",
            full: "ps-checkbox--radius-full",
        },
        childrenPlacement: {
            start: "ps-checkbox--children-start",
            end: "ps-checkbox--children-end",
        },
        alignIndicator: {
            start: "ps-checkbox--align-start",
            center: "ps-checkbox--align-center",
            end: "ps-checkbox--align-end",
        },
    },
});

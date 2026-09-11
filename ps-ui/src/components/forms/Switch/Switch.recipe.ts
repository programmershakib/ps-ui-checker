import { createRecipe } from "../../../system/create-recipe";

export const switchRecipe = createRecipe({
    base: "ps-switch",
    variants: {
        color: {
            default: "ps-switch--default",
            primary: "ps-switch--primary",
            secondary: "ps-switch--secondary",
            success: "ps-switch--success",
            warning: "ps-switch--warning",
            error: "ps-switch--error",
        },
        size: {
            sm: "ps-switch--sm",
            md: "ps-switch--md",
            lg: "ps-switch--lg",
        },
        childrenPlacement: {
            start: "ps-switch--children-start",
            end: "ps-switch--children-end",
        },
    },
});

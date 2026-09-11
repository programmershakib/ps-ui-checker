import { createRecipe } from "../../../system/create-recipe";

export const radioRecipe = createRecipe({
    base: "ps-radio",
    variants: {
        color: {
            default: "ps-radio--default",
            primary: "ps-radio--primary",
            secondary: "ps-radio--secondary",
            success: "ps-radio--success",
            warning: "ps-radio--warning",
            error: "ps-radio--error",
        },
        size: {
            sm: "ps-radio--sm",
            md: "ps-radio--md",
            lg: "ps-radio--lg",
        },
        alignIndicator: {
            start: "ps-radio--align-start",
            center: "ps-radio--align-center",
            end: "ps-radio--align-end",
        },
        childrenPlacement: {
            start: "ps-radio--children-start",
            end: "ps-radio--children-end",
        },
    },
});

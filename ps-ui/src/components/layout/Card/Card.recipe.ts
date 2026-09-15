import { createRecipe } from "../../../system";

export const cardRecipe = createRecipe({
    base: "ps-card",
    variants: {
        variant: {
            transparent: "ps-card--transparent",
            default: "ps-card--default",
            secondary: "ps-card--secondary",
            tertiary: "ps-card--tertiary",
        },
        shadow: {
            none: "ps-card--shadow-none",
            sm: "ps-card--shadow-sm",
            md: "ps-card--shadow-md",
            lg: "ps-card--shadow-lg",
        },
    },
});

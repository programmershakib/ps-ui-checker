import { createRecipe } from "../../../system/create-recipe";

export const spinnerRecipe = createRecipe({
    base: "ps-spinner",
    variants: {
        size: {
            sm: "ps-spinner--sm",
            md: "ps-spinner--md",
            lg: "ps-spinner--lg",
        },
    },
});

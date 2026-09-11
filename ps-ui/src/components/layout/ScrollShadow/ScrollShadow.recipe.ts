import { createRecipe } from "../../../system/create-recipe";

export const scrollShadowRecipe = createRecipe({
    base: "ps-scroll-shadow",
    variants: {
        orientation: {
            vertical: "ps-scroll-shadow--vertical",
            horizontal: "ps-scroll-shadow--horizontal",
        },
    },
});

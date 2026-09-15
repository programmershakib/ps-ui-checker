import { createRecipe } from "../../../system";

export const scrollShadowRecipe = createRecipe({
    base: "ps-scroll-shadow",
    variants: {
        orientation: {
            vertical: "ps-scroll-shadow--vertical",
            horizontal: "ps-scroll-shadow--horizontal",
        },
        variant: {
            default: "ps-scroll-shadow--variant-default",
            minimal: "ps-scroll-shadow--variant-minimal",
        },
    },
});

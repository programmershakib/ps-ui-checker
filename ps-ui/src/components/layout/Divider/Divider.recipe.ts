import { createRecipe } from "../../../system";

export const dividerRecipe = createRecipe({
    base: "ps-divider",
    variants: {
        orientation: {
            horizontal: "ps-divider--horizontal",
            vertical: "ps-divider--vertical",
        },
        variant: {
            solid: "ps-divider--solid",
            dashed: "ps-divider--dashed",
            dotted: "ps-divider--dotted",
        },
        thickness: {
            thin: "ps-divider--thin",
            medium: "ps-divider--medium",
            thick: "ps-divider--thick",
        },
        childrenAlign: {
            start: "ps-divider--children-start",
            center: "ps-divider--children-center",
            end: "ps-divider--children-end",
        },
    },
});

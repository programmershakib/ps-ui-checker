import { createRecipe } from "../../../system/create-recipe";

export const flexRecipe = createRecipe({
    base: "ps-flex",
    variants: {
        direction: {
            row: "ps-flex--row",
            "row-reverse": "ps-flex--row-reverse",
            column: "ps-flex--column",
            "column-reverse": "ps-flex--column-reverse",
        },
        align: {
            start: "ps-flex--align-start",
            center: "ps-flex--align-center",
            end: "ps-flex--align-end",
            stretch: "ps-flex--align-stretch",
            baseline: "ps-flex--align-baseline",
        },
        justify: {
            start: "ps-flex--justify-start",
            center: "ps-flex--justify-center",
            end: "ps-flex--justify-end",
            between: "ps-flex--justify-between",
            around: "ps-flex--justify-around",
            evenly: "ps-flex--justify-evenly",
        },
        wrap: {
            nowrap: "ps-flex--nowrap",
            wrap: "ps-flex--wrap",
            "wrap-reverse": "ps-flex--wrap-reverse",
        },
        alignContent: {
            start: "ps-flex--align-content-start",
            center: "ps-flex--align-content-center",
            end: "ps-flex--align-content-end",
            stretch: "ps-flex--align-content-stretch",
            between: "ps-flex--align-content-between",
            around: "ps-flex--align-content-around",
            evenly: "ps-flex--align-content-evenly",
        },
    },
});

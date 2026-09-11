import { createRecipe } from "../../../system/create-recipe";

export const gridRecipe = createRecipe({
    base: "ps-grid",
    variants: {
        align: {
            start: "ps-grid--align-start",
            center: "ps-grid--align-center",
            end: "ps-grid--align-end",
            stretch: "ps-grid--align-stretch",
            baseline: "ps-grid--align-baseline",
        },
        justify: {
            start: "ps-grid--justify-start",
            center: "ps-grid--justify-center",
            end: "ps-grid--justify-end",
            stretch: "ps-grid--justify-stretch",
        },
        flow: {
            row: "ps-grid--flow-row",
            column: "ps-grid--flow-column",
            "row-dense": "ps-grid--flow-row-dense",
            "column-dense": "ps-grid--flow-column-dense",
        },
        alignContent: {
            start: "ps-grid--align-content-start",
            center: "ps-grid--align-content-center",
            end: "ps-grid--align-content-end",
            stretch: "ps-grid--align-content-stretch",
            between: "ps-grid--align-content-between",
            around: "ps-grid--align-content-around",
            evenly: "ps-grid--align-content-evenly",
        },
        justifyContent: {
            start: "ps-grid--justify-content-start",
            center: "ps-grid--justify-content-center",
            end: "ps-grid--justify-content-end",
            stretch: "ps-grid--justify-content-stretch",
            between: "ps-grid--justify-content-between",
            around: "ps-grid--justify-content-around",
            evenly: "ps-grid--justify-content-evenly",
        },
    },
});

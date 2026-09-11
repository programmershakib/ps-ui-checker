import { createRecipe } from "../../../system/create-recipe";

export const textRecipe = createRecipe({
    base: "ps-text",
    variants: {
        size: {
            xs: "ps-text--size-xs",
            sm: "ps-text--size-sm",
            md: "ps-text--size-md",
            lg: "ps-text--size-lg",
            xl: "ps-text--size-xl",
            "2xl": "ps-text--size-2xl",
            "3xl": "ps-text--size-3xl",
            "4xl": "ps-text--size-4xl",
            "5xl": "ps-text--size-5xl",
            "6xl": "ps-text--size-6xl",
        },
        weight: {
            thin: "ps-text--weight-thin",
            extralight: "ps-text--weight-extralight",
            light: "ps-text--weight-light",
            normal: "ps-text--weight-normal",
            medium: "ps-text--weight-medium",
            semibold: "ps-text--weight-semibold",
            bold: "ps-text--weight-bold",
            extrabold: "ps-text--weight-extrabold",
            black: "ps-text--weight-black",
        },
        family: {
            sans: "",
            mono: "ps-text--family-mono",
        },
        align: {
            left: "ps-text--align-left",
            center: "ps-text--align-center",
            right: "ps-text--align-right",
            justify: "ps-text--align-justify",
            start: "ps-text--align-start",
            end: "ps-text--align-end",
        },
        decoration: {
            none: "ps-text--decoration-none",
            underline: "ps-text--decoration-underline",
            "line-through": "ps-text--decoration-line-through",
            overline: "ps-text--decoration-overline",
        },
        textTransform: {
            none: "ps-text--case-none",
            uppercase: "ps-text--case-uppercase",
            lowercase: "ps-text--case-lowercase",
            capitalize: "ps-text--case-capitalize",
        },
        wordBreak: {
            normal: "ps-text--word-break-normal",
            "break-all": "ps-text--word-break-all",
            "keep-all": "ps-text--word-break-keep-all",
            "break-word": "ps-text--word-break-word",
        },
        whiteSpace: {
            normal: "ps-text--white-space-normal",
            nowrap: "ps-text--white-space-nowrap",
            pre: "ps-text--white-space-pre",
            "pre-line": "ps-text--white-space-pre-line",
            "pre-wrap": "ps-text--white-space-pre-wrap",
        },
    },
});

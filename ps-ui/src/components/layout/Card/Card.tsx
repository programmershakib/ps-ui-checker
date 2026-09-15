"use client";

import type { TextProps } from "../../typography/Text";
import { cn, resolveRadius } from "../../../utils";
import { Text } from "../../typography/Text";
import { cardRecipe } from "./Card.recipe";
import type { FlexProps } from "../Flex";
import { Flex } from "../Flex";
import "./Card.css";
import type {
    CardContentProps,
    CardDescriptionProps,
    CardFooterProps,
    CardHeaderProps,
    CardProps,
    CardTitleProps,
} from "./Card.types";
import {
    forwardRef,
    memo,
    type ElementType,
    type ReactElement,
    type Ref,
} from "react";

function CardRender<C extends ElementType = "div">(
    {
        as,
        id,
        style,
        className,
        variant = "default",
        radius = "md",
        shadow = "sm",
        border = true,
        fullWidth = false,
        children,
        ...rest
    }: CardProps<C>,
    ref: Ref<Element>,
) {
    const Component = (as ?? "div") as ElementType;

    return (
        <Component
            {...rest}
            ref={ref}
            id={id}
            style={{ ...style, borderRadius: resolveRadius(radius) }}
            data-slot="card"
            data-variant={variant}
            className={cn(
                cardRecipe({ variant, shadow }),
                fullWidth && "ps-card--full-width",
                border === false && "ps-card--no-border",
                className,
            )}
        >
            {children}
        </Component>
    );
}

const Card = memo(forwardRef(CardRender)) as <C extends ElementType = "div">(
    props: CardProps<C>,
) => ReactElement | null;

function CardHeaderComponent({
    id,
    style,
    className,
    "data-slot": dataSlot = "card-header",
    children,
    ...rest
}: CardHeaderProps) {
    return (
        <Flex
            {...rest}
            {...({ "data-slot": dataSlot } as FlexProps)}
            id={id}
            style={style}
            direction="column"
            gap="xs"
            align="start"
            className={cn("ps-card__header", className)}
        >
            {children}
        </Flex>
    );
}

function CardTitleComponent({
    id,
    style,
    className,
    "data-slot": dataSlot = "card-title",
    children,
    ...rest
}: CardTitleProps) {
    return (
        <Text
            {...rest}
            {...({ "data-slot": dataSlot } as TextProps)}
            id={id}
            style={style}
            as="h3"
            color="foreground"
            size="lg"
            weight="semibold"
            className={cn("ps-card__title", className)}
        >
            {children}
        </Text>
    );
}

function CardDescriptionComponent({
    id,
    style,
    className,
    "data-slot": dataSlot = "card-description",
    children,
    ...rest
}: CardDescriptionProps) {
    return (
        <Text
            {...rest}
            {...({ "data-slot": dataSlot } as TextProps)}
            id={id}
            style={style}
            as="p"
            color="muted"
            size="sm"
            className={cn("ps-card__description", className)}
        >
            {children}
        </Text>
    );
}

function CardContentComponent({
    id,
    style,
    className,
    "data-slot": dataSlot = "card-content",
    children,
    ...rest
}: CardContentProps) {
    return (
        <Flex
            {...rest}
            {...({ "data-slot": dataSlot } as FlexProps)}
            id={id}
            style={style}
            direction="column"
            gap="sm"
            className={cn("ps-card__content", className)}
        >
            {children}
        </Flex>
    );
}

function CardFooterComponent({
    id,
    style,
    className,
    "data-slot": dataSlot = "card-footer",
    children,
    ...rest
}: CardFooterProps) {
    return (
        <Flex
            {...rest}
            {...({ "data-slot": dataSlot } as FlexProps)}
            id={id}
            style={style}
            align="center"
            gap="sm"
            wrap="wrap"
            className={cn("ps-card__footer", className)}
        >
            {children}
        </Flex>
    );
}

CardHeaderComponent.displayName = "Card.Header";
CardTitleComponent.displayName = "Card.Title";
CardDescriptionComponent.displayName = "Card.Description";
CardContentComponent.displayName = "Card.Content";
CardFooterComponent.displayName = "Card.Footer";

const CardWithParts = Object.assign(Card, {
    Header: CardHeaderComponent,
    Title: CardTitleComponent,
    Description: CardDescriptionComponent,
    Content: CardContentComponent,
    Footer: CardFooterComponent,
});

(CardWithParts as unknown as { displayName: string }).displayName = "Card";

export default CardWithParts;

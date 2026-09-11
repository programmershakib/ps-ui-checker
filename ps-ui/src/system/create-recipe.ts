type VariantGroup = Record<string, string>;

type VariantMap = Record<string, VariantGroup>;

type VariantSelection<V extends VariantMap> = {
    [K in keyof V]?: keyof V[K];
};

type CompoundVariant<V extends VariantMap> = VariantSelection<V> & {
    className: string;
};

interface RecipeConfig<V extends VariantMap> {
    base?: string;
    variants: V;
    compoundVariants?: CompoundVariant<V>[];
    defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>;
}

export function createRecipe<V extends VariantMap>(config: RecipeConfig<V>) {
    return (props?: VariantSelection<V>): string => {
        const resolved = {
            ...(config.defaultVariants ?? {}),
            ...(props ?? {}),
        } as VariantSelection<V>;

        const classes: string[] = [];
        if (config.base) classes.push(config.base);

        for (const key in config.variants) {
            const chosen = resolved[key];
            if (chosen === undefined) continue;
            const groupClass = config.variants[key][chosen as string];
            if (groupClass) classes.push(groupClass);
        }

        for (const compound of config.compoundVariants ?? []) {
            const { className, ...rawConditions } = compound;
            const conditions = rawConditions as unknown as VariantSelection<V>;
            const matches = (Object.keys(conditions) as (keyof V)[]).every(
                (key) => resolved[key] === conditions[key],
            );
            if (matches) classes.push(className);
        }

        return classes.join(" ");
    };
}

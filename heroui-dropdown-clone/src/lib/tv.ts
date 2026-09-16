/* -------------------------------------------------------------------------------------------------
 * A tiny, dependency-free re-implementation of `tailwind-variants`' `tv()` / `cx()`.
 *
 * HeroUI declares its class names with `tv({base, slots, variants, defaultVariants})`, so the
 * variant files in `src/lib/styles/*` can be kept byte-for-byte identical to the real package —
 * only the import source changes.
 * -----------------------------------------------------------------------------------------------*/

type ClassValue = string | number | null | boolean | undefined | ClassValue[];

export function cx(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    out.push(String(value));
  };

  inputs.forEach(walk);

  return out.join(" ");
}

type VariantValue = string | Record<string, string>;

export interface TVConfig {
  base?: string;
  slots?: Record<string, string>;
  variants?: Record<string, Record<string, VariantValue | undefined>>;
  defaultVariants?: Record<string, unknown>;
}

type SlotFn = (args?: {className?: string; class?: string} & Record<string, unknown>) => string;

export type TVReturnType = ((props?: Record<string, any>) => any) & {
  variantKeys?: string[];
  variants?: TVConfig["variants"];
  defaultVariants?: TVConfig["defaultVariants"];
};

/**
 * `tv` without `tailwind-merge`: class names are simply concatenated, which is exactly what
 * HeroUI needs because every variant maps to a distinct BEM class (`.button--primary`, …).
 */
export function tv(config: TVConfig): TVReturnType {
  const {base = "", slots, variants = {}, defaultVariants = {}} = config;

  const resolveVariantValue = (variantName: string, props: Record<string, any> = {}) => {
    let value = props[variantName] ?? defaultVariants[variantName];

    if (value === null || value === undefined || value === false) return undefined;
    if (value === true) value = "true";

    return variants[variantName]?.[String(value)];
  };

  const variantClasses = (props: Record<string, any> = {}): string[] =>
    Object.keys(variants)
      .map((name) => resolveVariantValue(name, props))
      .filter((value): value is string => typeof value === "string");

  const variantSlotClasses = (slot: string, props: Record<string, any> = {}): string[] =>
    Object.keys(variants)
      .map((name) => resolveVariantValue(name, props))
      .filter((value): value is Record<string, string> => typeof value === "object" && !!value)
      .map((value) => value[slot])
      .filter(Boolean);

  /**
   * tailwind-variants: with `slots`, a *string* variant value is attached to the `base`
   * slot (or to every slot when there is no `base` slot) — e.g. kbd's `kbd--light`.
   */
  const variantStringClasses = (slot: string, props: Record<string, any> = {}): string[] => {
    const strings = Object.keys(variants)
      .map((name) => resolveVariantValue(name, props))
      .filter((value): value is string => typeof value === "string");

    if (strings.length === 0) return [];

    return slots && "base" in slots ? (slot === "base" ? strings : []) : strings;
  };

  let fn: any;

  if (slots) {
    fn = (props: Record<string, any> = {}) => {
      const result: Record<string, SlotFn> = {};

      for (const [slot, slotBase] of Object.entries(slots)) {
        result[slot] = (slotProps: any = {}) => {
          const extra =
            typeof slotProps === "string" ? slotProps : (slotProps?.className ?? slotProps?.class);
          const merged = {...props, ...(typeof slotProps === "object" ? slotProps : {})};

          return cx(
            slotBase,
            ...variantStringClasses(slot, merged),
            ...variantSlotClasses(slot, merged),
            extra,
          );
        };
      }

      return result;
    };
  } else {
    fn = (props: Record<string, any> = {}) =>
      cx(base, ...variantClasses(props), props?.className ?? props?.class);
  }

  fn.variantKeys = Object.keys(variants);
  fn.variants = variants;
  fn.defaultVariants = defaultVariants;

  return fn as TVReturnType;
}

/** Stand-in for `VariantProps<typeof someTv>`. */
export type VariantProps<T> = T extends TVReturnType ? Record<string, any> : never;

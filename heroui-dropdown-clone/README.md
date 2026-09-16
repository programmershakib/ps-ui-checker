# HeroUI Dropdown — clone (pure CSS)

A faithful clone of the **HeroUI v3 `Dropdown`** component and its full documentation page, built
with **React + hand-written CSS only**. No Tailwind, no CSS-in-JS, no `@heroui/*` packages.

Everything visual comes from `src/styles/*.css`, where every Tailwind `@apply` from HeroUI's real
stylesheet (`packages/styles/components/*.css`) has been expanded into plain CSS by hand, keeping
the **exact BEM class names, CSS custom-property tokens, data-attributes, keyframes and DOM
structure** of the original.

The 17 demo files under `src/demos/` are copied **verbatim** from
`heroui.com/docs/components/dropdown` (apps/docs/src/demos/en/dropdown) — they still
`import {…} from "@heroui/react"` and `from "@gravity-ui/icons"`, which Vite aliases to the local
clone.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

## What's inside

| Path | What it is |
| --- | --- |
| `src/styles/theme.css` | HeroUI default-theme tokens (`--background`, `--overlay`, `--default`, `--accent`, oklch colors, radius scale, easings, shadows) — light + dark |
| `src/styles/base.css` | Tailwind-v4 preflight subset + HeroUI `base.css` border-color inheritance + scrollbar system |
| `src/styles/components.css` | The ported component layer: `status-*`, `.surface`, `.button`, `.label`, `.description`, `.header`, `.kbd`, `.separator`, `.avatar`, `.menu`, `.menu-section`, `.menu-item`, `.popover`, `.dropdown` (+ popover enter/exit keyframes) |
| `src/styles/utilities.css` | The small set of utility classes the docs demos use (`.ms-auto`, `.size-4`, `.rounded-full`, `data-[focused=true]:bg-default`, …) written as plain CSS |
| `src/styles/docs.css` | The docs-page furniture (preview containers, code panels, tables, TOC) in its own `docs` layer |
| `src/lib/tv.ts` | A tiny dependency-free re-implementation of `tailwind-variants`' `tv()`/`cx()` so the `*.styles.ts` files stay byte-identical to HeroUI's |
| `src/lib/styles/*.styles.ts` | Verbatim copies of HeroUI's variant files (`dropdown.styles.ts`, `menu-item.styles.ts`, `button.styles.ts`, …) — only the `tv` import path changed |
| `src/components/*` | React ports of HeroUI's `dropdown.tsx`, `menu-item.tsx`, `menu-section.tsx`, `button.tsx`, `label.tsx`, `description.tsx`, `header.tsx`, `kbd.tsx`, `separator.tsx`, `avatar.tsx` on top of `react-aria-components` (the same primitives HeroUI uses) |
| `src/components/icons.tsx` | The `@gravity-ui/icons` set used by the demos (same 16×16 path data) + HeroUI's `IconChevronRight` |
| `src/heroui.tsx` | The `@heroui/react` surface: compound `Dropdown`, `Kbd`, `Avatar`, plus `Button/Label/Description/Header/Separator` and the `Selection` type |
| `src/demos/*.tsx` | The 17 docs demos, verbatim |
| `src/App.tsx` | The docs page: Usage → Anatomy → Examples → Customization → Styling Reference → API Reference → Accessibility → Related Components, with collapsible "Expand code" panels |

## Fidelity notes

- **Tokens**: identical oklch values, `--spacing: 0.25rem`, radius scale (`--radius-*` = multiples of
  `--radius`), the `--ease-*` bezier curves and `--overlay-shadow`/`--surface-shadow`.
- **Geometry**: button `h-9/md`, `rounded-3xl`; popover `min-w-55 (220px)`, `max-w-48svw`,
  `radius min(32px, 3xl)`, menu `p-1.5 gap-0.5`; item `min-h-9 px-2.5 py-1.5 rounded-2xl gap-3`,
  `ps-7` when an indicator is present; separator `w-[94%] ms-[3%]`; indicator `size-4 start-2`.
- **Focus ring**: reproduced with two stacked `box-shadow`s (`--ring-offset-width` background gap +
  `--focus` ring) exactly like Tailwind's `ring-2 ring-focus ring-offset-2 ring-offset-background`.
- **Animations**: the popover enter/exit are real CSS `@keyframes` (zoom-in-90 + directional slide,
  150ms in / 100ms out). `react-aria-components` detects them via `getAnimations()` and toggles
  `data-entering` / `data-exiting`, so the lifecycle matches the original.
- **Selection indicators**: same `stroke-dashoffset` checkmark (22/44/66) and same scale/opacity dot,
  with the same transition durations.
- **Behaviour**: keyboard nav, typeahead, submenus, long-press trigger, controlled open/selection,
  section-level selection, disabled keys — all come from the same React Aria primitives HeroUI uses.

## Verified

Rendered in headless Chrome and compared against the values the original CSS produces: popover
background/radius/shadow/min-width, menu padding & gap, item min-height/padding/radius/gap, trigger
height/radius/padding/typography, Inter font stack, light & dark themes, selection indicators,
separators, disabled opacity, danger variant and submenu nesting.

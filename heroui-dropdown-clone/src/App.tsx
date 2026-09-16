import {useEffect, useState} from "react";

import {ApiTable, CodeBlock, ComponentPreview} from "./ComponentPreview";
import {
  Controlled,
  ControlledOpenState,
  CustomStyles,
  CustomTrigger,
  Default,
  LongPressTrigger,
  SingleWithCustomIndicator,
  WithCustomSubmenuIndicator,
  WithDescriptions,
  WithDisabledItems,
  WithIcons,
  WithKeyboardShortcuts,
  WithMultipleSelection,
  WithSectionLevelSelection,
  WithSections,
  WithSingleSelection,
  WithSubmenus,
} from "./demos";
import {
  anatomyCode,
  basicUsageCode,
  controlledSelectionCode,
  globalCssCode,
  toc,
  usageCode,
  withSectionsCode,
  withSubmenusCode,
} from "./docs-content";

/* Raw demo sources — exactly what the docs show under "Expand code" */
import controlledCode from "./demos/controlled.tsx?raw";
import controlledOpenStateCode from "./demos/controlled-open-state.tsx?raw";
import customStylesCode from "./demos/custom-styles.tsx?raw";
import customTriggerCode from "./demos/custom-trigger.tsx?raw";
import defaultCode from "./demos/default.tsx?raw";
import longPressTriggerCode from "./demos/long-press-trigger.tsx?raw";
import singleWithCustomIndicatorCode from "./demos/single-with-custom-indicator.tsx?raw";
import withCustomSubmenuIndicatorCode from "./demos/with-custom-submenu-indicator.tsx?raw";
import withDescriptionsCode from "./demos/with-descriptions.tsx?raw";
import withDisabledItemsCode from "./demos/with-disabled-items.tsx?raw";
import withIconsCode from "./demos/with-icons.tsx?raw";
import withKeyboardShortcutsCode from "./demos/with-keyboard-shortcuts.tsx?raw";
import withMultipleSelectionCode from "./demos/with-multiple-selection.tsx?raw";
import withSectionLevelSelectionCode from "./demos/with-section-level-selection.tsx?raw";
import withSectionsDemoCode from "./demos/with-sections.tsx?raw";
import withSingleSelectionCode from "./demos/with-single-selection.tsx?raw";
import withSubmenusDemoCode from "./demos/with-submenus.tsx?raw";

const c = (children: string) => <code>{children}</code>;

function HeroLogo() {
  return (
    <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20">
      <path
        d="M12 2.5 21.5 12 12 21.5 2.5 12 12 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path d="M12 7.2 16.8 12 12 16.8 7.2 12 12 7.2Z" fill="currentColor" opacity=".85" />
    </svg>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="docs-page">
      <header className="docs-topbar">
        <span className="docs-topbar__logo">
          <HeroLogo />
          HeroUI
        </span>
        <span className="docs-topbar__crumb">Docs · Components · Collections · Dropdown</span>
        <span className="docs-topbar__spacer" />
        <a
          className="docs-topbar__link"
          href="https://storybook-v3.heroui.com/?path=/docs/components-collections-dropdown--docs"
          rel="noreferrer"
          target="_blank"
        >
          Storybook
        </a>
        <a
          className="docs-topbar__link"
          href="https://react-aria.adobe.com/Menu"
          rel="noreferrer"
          target="_blank"
        >
          React Aria
        </a>
        <button
          className="docs-topbar__toggle"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          type="button"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      <div className="docs-body">
        <main className="docs-main">
          <h1 className="docs-h1">Dropdown</h1>
          <p className="docs-lede">
            A dropdown displays a list of actions or options that a user can choose
          </p>
          <div className="docs-links">
            <a
              href="https://storybook-v3.heroui.com/?path=/docs/components-collections-dropdown--docs"
              rel="noreferrer"
              target="_blank"
            >
              Storybook
            </a>
            <a href="https://react-aria.adobe.com/Menu" rel="noreferrer" target="_blank">
              React Aria
            </a>
            <a
              href="https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/dropdown/dropdown.tsx"
              rel="noreferrer"
              target="_blank"
            >
              Source
            </a>
            <a
              href="https://github.com/heroui-inc/heroui/tree/v3/packages/styles/components/dropdown.css"
              rel="noreferrer"
              target="_blank"
            >
              Styles source
            </a>
          </div>

          <div className="docs-note">
            <strong>Pure CSS clone.</strong> Every class below (<code>.dropdown__popover</code>,{" "}
            <code>.menu-item</code>, <code>.button--secondary</code>, …) is hand-written CSS in{" "}
            <code>src/styles/*.css</code> — no Tailwind, no CSS-in-JS. The tokens, BEM names,
            data-attributes, animations and DOM structure are ported 1:1 from HeroUI v3, and the
            demos are copied verbatim from the docs.
          </div>

          {/* ======================= Usage ======================= */}
          <h2 className="docs-h2" id="usage">
            Usage
          </h2>
          <CodeBlock code={usageCode} />
          <ComponentPreview code={defaultCode} name="dropdown-default">
            <Default />
          </ComponentPreview>

          {/* ======================= Anatomy ======================= */}
          <h2 className="docs-h2" id="anatomy">
            Anatomy
          </h2>
          <CodeBlock code={anatomyCode} />

          {/* ======================= Examples ======================= */}
          <h2 className="docs-h2" id="examples">
            Examples
          </h2>

          <h3 className="docs-h3" id="with-icons">
            With Icons
          </h3>
          <ComponentPreview code={withIconsCode} name="dropdown-with-icons">
            <WithIcons />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-descriptions">
            With Descriptions
          </h3>
          <ComponentPreview code={withDescriptionsCode} name="dropdown-with-descriptions">
            <WithDescriptions />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-disabled-items">
            With Disabled Items
          </h3>
          <ComponentPreview code={withDisabledItemsCode} name="dropdown-with-disabled-items">
            <WithDisabledItems />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-sections">
            With Sections
          </h3>
          <ComponentPreview code={withSectionsDemoCode} name="dropdown-with-sections">
            <WithSections />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-multiple-selection">
            With Multiple Selection
          </h3>
          <ComponentPreview
            code={withMultipleSelectionCode}
            name="dropdown-with-multiple-selection"
          >
            <WithMultipleSelection />
          </ComponentPreview>

          <h3 className="docs-h3" id="controlled">
            Controlled
          </h3>
          <ComponentPreview code={controlledCode} name="dropdown-controlled">
            <Controlled />
          </ComponentPreview>

          <h3 className="docs-h3" id="controlled-open-state">
            Controlled Open State
          </h3>
          <ComponentPreview
            code={controlledOpenStateCode}
            name="dropdown-controlled-open-state"
          >
            <ControlledOpenState />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-single-selection">
            With Single Selection
          </h3>
          <ComponentPreview code={withSingleSelectionCode} name="dropdown-with-single-selection">
            <WithSingleSelection />
          </ComponentPreview>

          <h3 className="docs-h3" id="single-with-custom-indicator">
            Single With Custom Indicator
          </h3>
          <ComponentPreview
            code={singleWithCustomIndicatorCode}
            name="dropdown-single-with-custom-indicator"
          >
            <SingleWithCustomIndicator />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-section-level-selection">
            With Section Level Selection
          </h3>
          <ComponentPreview
            code={withSectionLevelSelectionCode}
            name="dropdown-with-section-level-selection"
          >
            <WithSectionLevelSelection />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-keyboard-shortcuts">
            With Keyboard Shortcuts
          </h3>
          <ComponentPreview
            code={withKeyboardShortcutsCode}
            name="dropdown-with-keyboard-shortcuts"
          >
            <WithKeyboardShortcuts />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-submenus">
            With Submenus
          </h3>
          <ComponentPreview code={withSubmenusDemoCode} name="dropdown-with-submenus">
            <WithSubmenus />
          </ComponentPreview>

          <h3 className="docs-h3" id="with-custom-submenu-indicator">
            With Custom Submenu Indicator
          </h3>
          <ComponentPreview
            code={withCustomSubmenuIndicatorCode}
            name="dropdown-with-custom-submenu-indicator"
          >
            <WithCustomSubmenuIndicator />
          </ComponentPreview>

          <h3 className="docs-h3" id="custom-trigger">
            Custom Trigger
          </h3>
          <ComponentPreview code={customTriggerCode} name="dropdown-custom-trigger">
            <CustomTrigger />
          </ComponentPreview>

          <h3 className="docs-h3" id="long-press-trigger">
            Long Press Trigger
          </h3>
          <ComponentPreview code={longPressTriggerCode} name="dropdown-long-press-trigger">
            <LongPressTrigger />
          </ComponentPreview>

          {/* ======================= Customization ======================= */}
          <h2 className="docs-h2" id="customization">
            Customization
          </h2>

          <h3 className="docs-h3" id="tailwind-css">
            Tailwind CSS
          </h3>
          <ComponentPreview code={customStylesCode} name="dropdown-custom-styles">
            <CustomStyles />
          </ComponentPreview>

          <h3 className="docs-h3" id="global-css">
            Global CSS
          </h3>
          <p className="docs-p">
            To customize the Dropdown component classes, you can use the{" "}
            {c("@layer components")} directive.{" "}
            <a
              href="https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes"
              rel="noreferrer"
              target="_blank"
            >
              Learn more
            </a>
          </p>
          <CodeBlock code={globalCssCode} />

          {/* ======================= Styling Reference ======================= */}
          <h2 className="docs-h2" id="styling-reference">
            Styling Reference
          </h2>
          <p className="docs-p">
            HeroUI follows the{" "}
            <a href="https://getbem.com/" rel="noreferrer" target="_blank">
              BEM
            </a>{" "}
            methodology to ensure component variants and states are reusable and easy to customize.
          </p>

          <h3 className="docs-h3" id="css-classes">
            CSS Classes
          </h3>
          <p className="docs-p">
            The Dropdown component uses these CSS classes (
            <a
              href="https://github.com/heroui-inc/heroui/blob/v3/packages/styles/components/dropdown.css"
              rel="noreferrer"
              target="_blank"
            >
              View source styles
            </a>
            ):
          </p>

          <h4 className="docs-h4">Base Classes</h4>
          <ul className="docs-ul">
            <li>{c(".dropdown")} - Base dropdown container</li>
            <li>{c(".dropdown__trigger")} - The button or element that triggers the dropdown</li>
            <li>{c(".dropdown__popover")} - The popover container</li>
            <li>{c(".dropdown__menu")} - The menu container inside the popover</li>
          </ul>

          <h4 className="docs-h4">State Classes</h4>
          <ul className="docs-ul">
            <li>{c('.dropdown__trigger[data-focus-visible="true"]')} - Focused trigger state</li>
            <li>{c('.dropdown__trigger[data-disabled="true"]')} - Disabled trigger state</li>
            <li>{c('.dropdown__trigger[data-pressed="true"]')} - Pressed trigger state</li>
            <li>{c(".dropdown__popover[data-entering]")} - Entering animation state</li>
            <li>{c(".dropdown__popover[data-exiting]")} - Exiting animation state</li>
            <li>
              {c('.dropdown__menu[data-selection-mode="single"]')} - Single selection mode
            </li>
            <li>
              {c('.dropdown__menu[data-selection-mode="multiple"]')} - Multiple selection mode
            </li>
          </ul>

          <h3 className="docs-h3" id="menu-component-classes">
            Menu Component Classes
          </h3>
          <p className="docs-p">
            The Dropdown component uses Menu, MenuItem, and MenuSection as base components. These
            classes are also available for customization:
          </p>

          <h4 className="docs-h4">Menu Classes</h4>
          <ul className="docs-ul">
            <li>
              {c(".menu")} - Base menu container (
              <a
                href="https://github.com/heroui-inc/heroui/blob/v3/packages/styles/components/menu.css"
                rel="noreferrer"
                target="_blank"
              >
                menu.css
              </a>
              )
              <ul className="docs-ul" style={{marginBlock: "6px 0"}}>
                <li>{c('[data-slot="separator"]')} - Separator elements within the menu</li>
              </ul>
            </li>
          </ul>

          <h4 className="docs-h4">MenuItem Classes</h4>
          <ul className="docs-ul">
            <li>
              {c(".menu-item")} - Base menu item container (
              <a
                href="https://github.com/heroui-inc/heroui/blob/v3/packages/styles/components/menu-item.css"
                rel="noreferrer"
                target="_blank"
              >
                menu-item.css
              </a>
              )
            </li>
            <li>
              {c(".menu-item__indicator")} - Selection indicator (checkmark or dot)
              <ul className="docs-ul" style={{marginBlock: "6px 0"}}>
                <li>
                  {c('[data-slot="menu-item-indicator--checkmark"]')} - Checkmark indicator SVG
                </li>
                <li>{c('[data-slot="menu-item-indicator--dot"]')} - Dot indicator SVG</li>
              </ul>
            </li>
            <li>{c(".menu-item__indicator--submenu")} - Submenu indicator (chevron)</li>
            <li>{c(".menu-item--default")} - Default variant styling</li>
            <li>{c(".menu-item--danger")} - Danger variant styling</li>
          </ul>

          <h4 className="docs-h4">MenuItem State Classes</h4>
          <ul className="docs-ul">
            <li>
              {c('.menu-item[data-focus-visible="true"]')} - Focused item state (keyboard focus)
            </li>
            <li>{c('.menu-item[data-focus="true"]')} - Focused item state</li>
            <li>{c(".menu-item[data-pressed]")} - Pressed item state</li>
            <li>{c(".menu-item[data-hovered]")} - Hovered item state</li>
            <li>{c('.menu-item[data-selected="true"]')} - Selected item state</li>
            <li>{c(".menu-item[data-disabled]")} - Disabled item state</li>
            <li>{c('.menu-item[data-has-submenu="true"]')} - Item with submenu</li>
            <li>{c('.menu-item[data-selection-mode="single"]')} - Single selection mode</li>
            <li>{c('.menu-item[data-selection-mode="multiple"]')} - Multiple selection mode</li>
            <li>{c('.menu-item[aria-checked="true"]')} - Checked item (ARIA)</li>
            <li>{c('.menu-item[aria-selected="true"]')} - Selected item (ARIA)</li>
          </ul>

          <h4 className="docs-h4">MenuSection Classes</h4>
          <ul className="docs-ul">
            <li>
              {c(".menu-section")} - Base menu section container (
              <a
                href="https://github.com/heroui-inc/heroui/blob/v3/packages/styles/components/menu-section.css"
                rel="noreferrer"
                target="_blank"
              >
                menu-section.css
              </a>
              )
            </li>
          </ul>

          <h3 className="docs-h3" id="interactive-states">
            Interactive States
          </h3>
          <p className="docs-p">
            The component supports both CSS pseudo-classes and data attributes for flexibility:
          </p>
          <ul className="docs-ul">
            <li>
              <strong>Hover</strong>: {c(":hover")} or {c('[data-hovered="true"]')} on trigger and
              items
            </li>
            <li>
              <strong>Focus</strong>: {c(":focus-visible")} or {c('[data-focus-visible="true"]')} on
              trigger and items
            </li>
            <li>
              <strong>Disabled</strong>: {c(":disabled")} or {c('[data-disabled="true"]')} on
              trigger and items
            </li>
            <li>
              <strong>Pressed</strong>: {c(":active")} or {c('[data-pressed="true"]')} on trigger
              and items
            </li>
            <li>
              <strong>Selected</strong>: {c('[data-selected="true"]')} or{" "}
              {c('[aria-selected="true"]')} on items
            </li>
          </ul>

          {/* ======================= API Reference ======================= */}
          <h2 className="docs-h2" id="api-reference">
            API Reference
          </h2>

          <h3 className="docs-h3">Dropdown</h3>
          <ApiTable
            rows={[
              [c("isOpen"), c("boolean"), "-", "Sets the open state of the menu (controlled)"],
              [
                c("defaultOpen"),
                c("boolean"),
                "-",
                "Sets the default open state of the menu (uncontrolled)",
              ],
              [
                c("onOpenChange"),
                c("(isOpen: boolean) => void"),
                "-",
                "Handler called when the open state changes",
              ],
              [
                c("trigger"),
                c('"press" | "longPress"'),
                c('"press"'),
                "The type of interaction that triggers the menu",
              ],
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [c("children"), c("ReactNode"), "-", "Dropdown content"],
            ]}
          />

          <h3 className="docs-h3">Dropdown.Trigger</h3>
          <ApiTable
            rows={[
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [
                c("children"),
                c("ReactNode | RenderFunction"),
                "-",
                "Trigger content or render function",
              ],
            ]}
          />
          <p className="docs-p">
            All{" "}
            <a
              href="https://react-spectrum.adobe.com/react-aria/Button.html"
              rel="noreferrer"
              target="_blank"
            >
              Button
            </a>{" "}
            props are also supported when using a Button as the trigger.
          </p>

          <h3 className="docs-h3">Dropdown.Popover</h3>
          <ApiTable
            rows={[
              [
                c("placement"),
                c(
                  '"bottom" | "bottom left" | "bottom right" | "bottom start" | "bottom end" | "top" | "top left" | "top right" | "top start" | "top end" | "left" | "left top" | "left bottom" | "start" | "start top" | "start bottom" | "right" | "right top" | "right bottom" | "end" | "end top" | "end bottom"',
                ),
                c('"bottom"'),
                "Placement of the popover relative to the trigger",
              ],
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [c("children"), c("ReactNode"), "-", "Content children"],
            ]}
          />
          <p className="docs-p">
            All{" "}
            <a
              href="https://react-spectrum.adobe.com/react-aria/Popover.html"
              rel="noreferrer"
              target="_blank"
            >
              Popover
            </a>{" "}
            props are also supported.
          </p>

          <h3 className="docs-h3">Dropdown.Menu</h3>
          <ApiTable
            rows={[
              [
                c("selectionMode"),
                c('"single" | "multiple" | "none"'),
                c('"none"'),
                "Whether single or multiple selection is enabled",
              ],
              [
                c("selectedKeys"),
                c("Iterable<Key>"),
                "-",
                "The currently selected keys (controlled)",
              ],
              [
                c("defaultSelectedKeys"),
                c("Iterable<Key>"),
                "-",
                "The initial selected keys (uncontrolled)",
              ],
              [
                c("onSelectionChange"),
                c("(keys: Selection) => void"),
                "-",
                "Handler called when the selection changes",
              ],
              [c("disabledKeys"), c("Iterable<Key>"), "-", "Keys of disabled items"],
              [
                c("onAction"),
                c("(key: Key) => void"),
                "-",
                "Handler called when an item is activated",
              ],
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [c("children"), c("ReactNode"), "-", "Menu content"],
            ]}
          />
          <p className="docs-p">
            All{" "}
            <a
              href="https://react-spectrum.adobe.com/react-aria/Menu.html#menu"
              rel="noreferrer"
              target="_blank"
            >
              Menu
            </a>{" "}
            props are also supported.
          </p>

          <h3 className="docs-h3">Dropdown.Section</h3>
          <ApiTable
            rows={[
              [
                c("selectionMode"),
                c('"single" | "multiple"'),
                "-",
                "Selection mode for items within this section",
              ],
              [
                c("selectedKeys"),
                c("Iterable<Key>"),
                "-",
                "The currently selected keys (controlled)",
              ],
              [
                c("defaultSelectedKeys"),
                c("Iterable<Key>"),
                "-",
                "The initial selected keys (uncontrolled)",
              ],
              [
                c("onSelectionChange"),
                c("(keys: Selection) => void"),
                "-",
                "Handler called when the selection changes",
              ],
              [c("disabledKeys"), c("Iterable<Key>"), "-", "Keys of disabled items"],
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [c("children"), c("ReactNode"), "-", "Section content"],
            ]}
          />
          <p className="docs-p">
            All{" "}
            <a
              href="https://react-spectrum.adobe.com/react-aria/Menu.html#menusection"
              rel="noreferrer"
              target="_blank"
            >
              MenuSection
            </a>{" "}
            props are also supported.
          </p>

          <h3 className="docs-h3">Dropdown.Item</h3>
          <ApiTable
            rows={[
              [c("id"), c("Key"), "-", "Unique identifier for the item"],
              [
                c("textValue"),
                c("string"),
                "-",
                "Text content of the item for typeahead",
              ],
              [
                c("variant"),
                c('"default" | "danger"'),
                c('"default"'),
                "Visual variant of the item",
              ],
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [
                c("children"),
                c("ReactNode | RenderFunction"),
                "-",
                "Item content or render function",
              ],
            ]}
          />
          <p className="docs-p">
            All{" "}
            <a
              href="https://react-spectrum.adobe.com/react-aria/Menu.html#menuitem"
              rel="noreferrer"
              target="_blank"
            >
              MenuItem
            </a>{" "}
            props are also supported.
          </p>

          <h3 className="docs-h3">Dropdown.ItemIndicator</h3>
          <ApiTable
            rows={[
              [
                c("type"),
                c('"checkmark" | "dot"'),
                c('"checkmark"'),
                "Type of indicator to display",
              ],
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [
                c("children"),
                c("ReactNode | RenderFunction"),
                "-",
                "Custom indicator content or render function",
              ],
            ]}
          />
          <p className="docs-p">When using a render function, these values are provided:</p>
          <ApiTable
            head={["Prop", "Type", "Description", ""]}
            rows={[
              [c("isSelected"), c("boolean"), "Whether the item is selected", ""],
              [
                c("isIndeterminate"),
                c("boolean"),
                "Whether the item is in an indeterminate state",
                "",
              ],
            ]}
          />

          <h3 className="docs-h3">Dropdown.SubmenuIndicator</h3>
          <ApiTable
            rows={[
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [c("children"), c("ReactNode"), "-", "Custom indicator content"],
            ]}
          />

          <h3 className="docs-h3">Dropdown.SubmenuTrigger</h3>
          <ApiTable
            rows={[
              [c("className"), c("string"), "-", "Additional CSS classes"],
              [c("children"), c("ReactNode"), "-", "Submenu trigger content"],
            ]}
          />
          <p className="docs-p">
            All{" "}
            <a
              href="https://react-spectrum.adobe.com/react-aria/Menu.html#submenutrigger"
              rel="noreferrer"
              target="_blank"
            >
              SubmenuTrigger
            </a>{" "}
            props are also supported.
          </p>

          <h3 className="docs-h3">Render Props</h3>
          <p className="docs-p">
            When using render functions with Dropdown.Item, these values are provided:
          </p>
          <ApiTable
            head={["Prop", "Type", "Description", ""]}
            rows={[
              [c("isSelected"), c("boolean"), "Whether the item is selected", ""],
              [c("isFocused"), c("boolean"), "Whether the item is focused", ""],
              [c("isDisabled"), c("boolean"), "Whether the item is disabled", ""],
              [c("isPressed"), c("boolean"), "Whether the item is being pressed", ""],
            ]}
          />

          {/* ======================= Examples (code only) ======================= */}
          <h2 className="docs-h2" id="more-examples">
            Examples
          </h2>

          <h3 className="docs-h3">Basic Usage</h3>
          <CodeBlock code={basicUsageCode} />

          <h3 className="docs-h3">With Sections</h3>
          <CodeBlock code={withSectionsCode} />

          <h3 className="docs-h3">Controlled Selection</h3>
          <CodeBlock code={controlledSelectionCode} />

          <h3 className="docs-h3">With Submenus</h3>
          <CodeBlock code={withSubmenusCode} />

          {/* ======================= Accessibility ======================= */}
          <h2 className="docs-h2" id="accessibility">
            Accessibility
          </h2>
          <p className="docs-p">
            The Dropdown component implements the ARIA menu pattern and provides:
          </p>
          <ul className="docs-ul">
            <li>Full keyboard navigation support (arrow keys, home/end, typeahead)</li>
            <li>Screen reader announcements for actions and selection changes</li>
            <li>Proper focus management</li>
            <li>Support for disabled states</li>
            <li>Long press interaction support</li>
            <li>Submenu navigation</li>
          </ul>
          <p className="docs-p">
            For more information, see the{" "}
            <a
              href="https://react-spectrum.adobe.com/react-aria/Menu.html#menu"
              rel="noreferrer"
              target="_blank"
            >
              React Aria Menu documentation
            </a>
            .
          </p>

          {/* ======================= Related Components ======================= */}
          <h2 className="docs-h2" id="related-components">
            Related Components
          </h2>
          <ul className="docs-ul">
            <li>
              <a
                href="https://heroui.com/docs/components/menu"
                rel="noreferrer"
                target="_blank"
              >
                Menu
              </a>{" "}
              — the standalone menu primitive Dropdown builds on
            </li>
            <li>
              <a
                href="https://heroui.com/docs/components/select"
                rel="noreferrer"
                target="_blank"
              >
                Select
              </a>{" "}
              — a dropdown that renders its selected value in a field
            </li>
            <li>
              <a
                href="https://heroui.com/docs/components/popover"
                rel="noreferrer"
                target="_blank"
              >
                Popover
              </a>{" "}
              — floating container used by the dropdown overlay
            </li>
            <li>
              <a
                href="https://heroui.com/docs/components/context-menu"
                rel="noreferrer"
                target="_blank"
              >
                Context Menu
              </a>{" "}
              — the same menu opened on right click / long press
            </li>
          </ul>
        </main>

        <nav aria-label="On this page" className="docs-toc">
          <p className="docs-toc__title">On this page</p>
          {toc.map((item) => (
            <a data-level={item.level} href={`#${item.id}`} key={item.id}>
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      <footer className="docs-footer">
        Dropdown — HeroUI v3 clone · React + hand-written CSS ·{" "}
        <a
          href="https://heroui.com/docs/components/dropdown"
          rel="noreferrer"
          style={{color: "inherit"}}
          target="_blank"
        >
          original docs
        </a>
      </footer>
    </div>
  );
}

/* Static code fences from apps/docs/content/docs/en/react/components/(collections)/dropdown.mdx */

export const usageCode = `import { Dropdown } from '@heroui/react';
`;

export const anatomyCode = `import { Dropdown, Button, Label, Description, Header, Kbd, Separator } from '@heroui/react';

export default () => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button />
    </Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Label />
          <Description />
          <Kbd slot="keyboard" />
          <Dropdown.ItemIndicator />
        </Dropdown.Item>
        <Separator />
        <Dropdown.Section>
          <Header />
          <Dropdown.Item />
        </Dropdown.Section>
        <Dropdown.SubmenuTrigger>
          <Dropdown.Item>
            <Label />
            <Dropdown.SubmenuIndicator />
          </Dropdown.Item>
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.SubmenuTrigger>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
)
`;

export const globalCssCode = `@layer components {
  .dropdown {
    @apply flex flex-col gap-1;
  }

  .dropdown__trigger {
    @apply outline-none;
  }

  .dropdown__popover {
    @apply rounded-lg border border-border bg-overlay p-2;
  }

  .dropdown__menu {
    @apply flex flex-col gap-1;
  }
}
`;

export const basicUsageCode = `import { Dropdown, Button, Label } from '@heroui/react';

<Dropdown>
  <Button aria-label="Menu" variant="secondary">
    Actions
  </Button>
  <Dropdown.Popover>
    <Dropdown.Menu onAction={(key) => alert(\`Selected: \${key}\`)}>
      <Dropdown.Item id="new-file" textValue="New file">
        <Label>New file</Label>
      </Dropdown.Item>
      <Dropdown.Item id="open-file" textValue="Open file">
        <Label>Open file</Label>
      </Dropdown.Item>
      <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
        <Label>Delete file</Label>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown>
`;

export const withSectionsCode = `import { Dropdown, Button, Label, Header, Separator } from '@heroui/react';

<Dropdown>
  <Button aria-label="Menu" variant="secondary">
    Actions
  </Button>
  <Dropdown.Popover>
    <Dropdown.Menu onAction={(key) => alert(\`Selected: \${key}\`)}>
      <Dropdown.Section>
        <Header>Actions</Header>
        <Dropdown.Item id="new-file" textValue="New file">
          <Label>New file</Label>
        </Dropdown.Item>
        <Dropdown.Item id="edit-file" textValue="Edit file">
          <Label>Edit file</Label>
        </Dropdown.Item>
      </Dropdown.Section>
      <Separator />
      <Dropdown.Section>
        <Header>Danger zone</Header>
        <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
          <Label>Delete file</Label>
        </Dropdown.Item>
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown>
`;

export const controlledSelectionCode = `import type { Selection } from '@heroui/react';

import { Dropdown, Button, Label } from '@heroui/react';
import { useState } from 'react';

function ControlledDropdown() {
  const [selected, setSelected] = useState<Selection>(new Set(['bold']));

  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          selectedKeys={selected}
          selectionMode="multiple"
          onSelectionChange={setSelected}
        >
          <Dropdown.Item id="bold" textValue="Bold">
            <Label>Bold</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item id="italic" textValue="Italic">
            <Label>Italic</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
`;

export const withSubmenusCode = `import { Dropdown, Button, Label } from '@heroui/react';

<Dropdown>
  <Button aria-label="Menu" variant="secondary">
    Share
  </Button>
  <Dropdown.Popover>
    <Dropdown.Menu onAction={(key) => alert(\`Selected: \${key}\`)}>
      <Dropdown.Item id="copy-link" textValue="Copy Link">
        <Label>Copy Link</Label>
      </Dropdown.Item>
      <Dropdown.SubmenuTrigger>
        <Dropdown.Item id="share" textValue="Share">
          <Label>Other</Label>
          <Dropdown.SubmenuIndicator />
        </Dropdown.Item>
        <Dropdown.Popover>
          <Dropdown.Menu>
            <Dropdown.Item id="whatsapp" textValue="WhatsApp">
              <Label>WhatsApp</Label>
            </Dropdown.Item>
            <Dropdown.Item id="telegram" textValue="Telegram">
              <Label>Telegram</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.SubmenuTrigger>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown>
`;

export const toc: {id: string; title: string; level: 2 | 3}[] = [
  {id: "usage", title: "Usage", level: 2},
  {id: "anatomy", title: "Anatomy", level: 2},
  {id: "examples", title: "Examples", level: 2},
  {id: "with-icons", title: "With Icons", level: 3},
  {id: "with-descriptions", title: "With Descriptions", level: 3},
  {id: "with-disabled-items", title: "With Disabled Items", level: 3},
  {id: "with-sections", title: "With Sections", level: 3},
  {id: "with-multiple-selection", title: "With Multiple Selection", level: 3},
  {id: "controlled", title: "Controlled", level: 3},
  {id: "controlled-open-state", title: "Controlled Open State", level: 3},
  {id: "with-single-selection", title: "With Single Selection", level: 3},
  {id: "single-with-custom-indicator", title: "Single With Custom Indicator", level: 3},
  {id: "with-section-level-selection", title: "With Section Level Selection", level: 3},
  {id: "with-keyboard-shortcuts", title: "With Keyboard Shortcuts", level: 3},
  {id: "with-submenus", title: "With Submenus", level: 3},
  {
    id: "with-custom-submenu-indicator",
    title: "With Custom Submenu Indicator",
    level: 3,
  },
  {id: "custom-trigger", title: "Custom Trigger", level: 3},
  {id: "long-press-trigger", title: "Long Press Trigger", level: 3},
  {id: "customization", title: "Customization", level: 2},
  {id: "styling-reference", title: "Styling Reference", level: 2},
  {id: "api-reference", title: "API Reference", level: 2},
  {id: "more-examples", title: "Examples", level: 2},
  {id: "accessibility", title: "Accessibility", level: 2},
  {id: "related-components", title: "Related Components", level: 2},
];

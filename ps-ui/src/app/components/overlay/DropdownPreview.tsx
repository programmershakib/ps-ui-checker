import { useMemo, useRef, useState, type ReactNode } from "react";
import {
    Button,
    ContextMenu,
    Divider,
    Dropdown,
    Flex,
    Kbd,
    Menu,
    Popover,
    ScrollShadow,
    SubMenu,
    Text,
    Tooltip,
    type MenuItemProps,
    type Selection,
} from "../../../index";
import type { PositionPlacement } from "../../../types";
import "./DropdownPreview.css";

const placementAnchors = [
    { placement: "bottom start", slot: "top-start" },
    { placement: "bottom center", slot: "top-center" },
    { placement: "bottom end", slot: "top-end" },
    { placement: "right top", slot: "left-top" },
    { placement: "right center", slot: "left-center" },
    { placement: "right bottom", slot: "left-bottom" },
    { placement: "left top", slot: "right-top" },
    { placement: "left center", slot: "right-center" },
    { placement: "left bottom", slot: "right-bottom" },
    { placement: "top start", slot: "bottom-start" },
    { placement: "top center", slot: "bottom-center" },
    { placement: "top end", slot: "bottom-end" },
] as const satisfies readonly { placement: PositionPlacement; slot: string }[];

const triggerModes = [
    "click",
    "hover",
    "longPress",
    "context",
    "both",
] as const;

type DemoTrigger = (typeof triggerModes)[number];

function Shortcut({ value }: { value: string }) {
    return (
        <Flex as="span" align="center" gap={1}>
            <Kbd keyValue="command" variant="light" />
            <Kbd>{value}</Kbd>
        </Flex>
    );
}

function ActionItem({
    id,
    label,
    description,
    shortcut,
    color,
}: {
    id: string;
    label: string;
    description?: string;
    shortcut?: ReactNode;
    color?: string;
}) {
    return (
        <Menu.Item
            id={id}
            textValue={label}
            style={color ? { color } : undefined}
        >
            <Flex direction="column" gap={0}>
                <Text as="span" size="sm" weight="semibold">
                    {label}
                </Text>
                {description && (
                    <Text as="span" size="xs" color="muted">
                        {description}
                    </Text>
                )}
            </Flex>
            {shortcut}
        </Menu.Item>
    );
}

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <Text as="span" size="xs" color="muted" weight="semibold">
            {children}
        </Text>
    );
}

function BasicMenu({ closeOnSelect = true }: { closeOnSelect?: boolean }) {
    return (
        <Menu
            aria-label="Composed project actions"
            closeOnSelect={closeOnSelect}
            selectionIndicator="none"
        >
            <Menu.Header>
                <SectionLabel>Project</SectionLabel>
            </Menu.Header>
            <ActionItem
                id="new"
                label="New file"
                shortcut={<Shortcut value="N" />}
            />
            <ActionItem
                id="copy"
                label="Copy link"
                description="Compose label and description with Text"
                shortcut={<Shortcut value="C" />}
            />
            <ActionItem id="rename" label="Rename" />
            <Menu.Separator />
            <ActionItem id="delete" label="Delete" color="var(--ps-error)" />
        </Menu>
    );
}

function SelectableItem({
    id,
    label,
    shortcut,
    indicator = "check",
    indicatorEnd = false,
}: {
    id: string;
    label: string;
    shortcut?: ReactNode;
    indicator?: "check" | "dot";
    indicatorEnd?: boolean;
}) {
    const indicatorNode = <Menu.Indicator variant={indicator} />;

    return (
        <Menu.Item id={id} textValue={label}>
            <Flex as="span" align="center" gap={2}>
                {!indicatorEnd && indicatorNode}
                <Text as="span" size="sm" weight="semibold">
                    {label}
                </Text>
            </Flex>
            <Flex as="span" align="center" gap={2}>
                {shortcut}
                {indicatorEnd && indicatorNode}
            </Flex>
        </Menu.Item>
    );
}

function SubMenuRow({
    label,
    id,
    ...props
}: { label: string } & Omit<MenuItemProps, "children" | "textValue">) {
    return (
        <Menu.Item
            {...props}
            id={id ?? label.toLowerCase().replace(/\s+/g, "-")}
            textValue={label}
        >
            <Text as="span" size="sm" weight="semibold">
                {label}
            </Text>
            <SubMenu.Indicator />
        </Menu.Item>
    );
}

function DeepChain({
    level = 1,
    max = 20,
    trigger = "click",
    mixed = false,
    prefix = "deep",
}: {
    level?: number;
    max?: number;
    trigger?: DemoTrigger;
    mixed?: boolean;
    prefix?: string;
}) {
    if (level > max) {
        return (
            <ActionItem
                id={`${prefix}-final-${max}`}
                label={`Final level ${max}`}
            />
        );
    }

    const currentTrigger = mixed
        ? triggerModes[(level - 1) % triggerModes.length]
        : trigger;
    const label = mixed
        ? `Level ${level} · ${currentTrigger}`
        : `Level ${level}`;

    return (
        <SubMenu trigger={currentTrigger} gap={3}>
            <SubMenu.Trigger>
                <SubMenuRow id={`${prefix}-level-${level}`} label={label} />
            </SubMenu.Trigger>
            <SubMenu.Content width={236} maxHeight={320} padding={4}>
                <Menu aria-label={`${prefix} level ${level + 1}`}>
                    <ActionItem
                        id={`${prefix}-action-${level}`}
                        label={`Action ${level}`}
                    />
                    <DeepChain
                        level={level + 1}
                        max={max}
                        trigger={trigger}
                        mixed={mixed}
                        prefix={prefix}
                    />
                </Menu>
            </SubMenu.Content>
        </SubMenu>
    );
}

function PrimitivePopoverCard() {
    return (
        <div className="dropdown-preview__panel">
            <Popover>
                <Popover.Trigger>
                    String trigger becomes Text span
                </Popover.Trigger>
                <Popover.Content
                    placement="bottom start"
                    width={300}
                    padding="lg"
                    radius="2xl"
                    background="var(--ps-content1)"
                    shadow="lg"
                >
                    <Text as="span" size="sm" weight="semibold">
                        One pop container.
                    </Text>
                    <Text as="span" size="sm" color="muted">
                        Only background, shadow, radius, padding, motion and
                        optional arrow live in Popover.Content. The trigger
                        receives no Popover CSS.
                    </Text>
                </Popover.Content>
            </Popover>
        </div>
    );
}

function ComposedMenuCard() {
    return (
        <Popover>
            <Popover.Trigger>
                <Button color="primary">Open composed menu</Button>
            </Popover.Trigger>
            <Popover.Content placement="bottom start" width={292} padding={6}>
                <BasicMenu />
            </Popover.Content>
        </Popover>
    );
}

function ScrollShadowCard() {
    const rows = useMemo(
        () =>
            Array.from({ length: 28 }, (_, index) => (
                <ActionItem
                    key={index}
                    id={`scroll-row-${index}`}
                    label={`Explicit scroll item ${index + 1}`}
                />
            )),
        [],
    );

    return (
        <Popover>
            <Popover.Trigger>
                <Button variant="bordered">Explicit ScrollShadow</Button>
            </Popover.Trigger>
            <Popover.Content
                placement="bottom start"
                width={320}
                maxHeight={280}
                padding={0}
                style={{ overflow: "hidden" }}
            >
                <ScrollShadow
                    variant="minimal"
                    size={36}
                    scrollbarSize={8}
                    style={{ width: "100%", maxHeight: 280 }}
                >
                    <Menu
                        aria-label="Explicit scroll shadow menu"
                        selectionIndicator="none"
                        style={{ padding: 8 }}
                    >
                        {rows}
                    </Menu>
                </ScrollShadow>
            </Popover.Content>
        </Popover>
    );
}

function SubMenuCard() {
    return (
        <Popover>
            <Popover.Trigger>
                <Button color="primary" variant="bordered">
                    SubMenu primitive
                </Button>
            </Popover.Trigger>
            <Popover.Content placement="bottom start" width={300} padding={6}>
                <Menu aria-label="Submenu demo" closeOnSelect={false}>
                    <ActionItem id="root-a" label="Root action" />
                    <SubMenu trigger="hover" gap={3}>
                        <SubMenu.Trigger>
                            <SubMenuRow label="Hover submenu" />
                        </SubMenu.Trigger>
                        <SubMenu.Content width={260} padding={6}>
                            <Menu
                                aria-label="Hover submenu"
                                closeOnSelect={false}
                            >
                                <ActionItem
                                    id="hover-child-a"
                                    label="Child action"
                                />
                                <SubMenu trigger="hover" gap={-3}>
                                    <SubMenu.Trigger>
                                        <SubMenuRow label="Overlapping child" />
                                    </SubMenu.Trigger>
                                    <SubMenu.Content width={250} padding={6}>
                                        <BasicMenu closeOnSelect={false} />
                                    </SubMenu.Content>
                                </SubMenu>
                            </Menu>
                        </SubMenu.Content>
                    </SubMenu>
                    <SubMenu trigger="click" gap={10}>
                        <SubMenu.Trigger>
                            <SubMenuRow label="Click submenu gap 10" />
                        </SubMenu.Trigger>
                        <SubMenu.Content width={260} padding={6}>
                            <BasicMenu closeOnSelect={false} />
                        </SubMenu.Content>
                    </SubMenu>
                </Menu>
            </Popover.Content>
        </Popover>
    );
}

function SelectionCard() {
    const [selected, setSelected] = useState<Selection>(new Set(["grid"]));
    const [multi, setMulti] = useState<Selection>(new Set(["bold", "italic"]));

    return (
        <Flex wrap="wrap" gap={3}>
            <Popover>
                <Popover.Trigger>
                    <Button color="primary">Indicators by JSX position</Button>
                </Popover.Trigger>
                <Popover.Content
                    placement="bottom start"
                    width={270}
                    padding={6}
                >
                    <Menu
                        aria-label="Single selection"
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={setSelected}
                        closeOnSelect={false}
                        selectionIndicator="none"
                    >
                        <SelectableItem
                            id="list"
                            label="List"
                            indicator="dot"
                            indicatorEnd
                        />
                        <SelectableItem
                            id="grid"
                            label="Grid"
                            indicator="dot"
                            indicatorEnd
                        />
                        <SelectableItem
                            id="kanban"
                            label="Kanban"
                            indicator="dot"
                            indicatorEnd
                        />
                    </Menu>
                </Popover.Content>
            </Popover>
            <Popover>
                <Popover.Trigger>
                    <Button variant="bordered">Multiple selection</Button>
                </Popover.Trigger>
                <Popover.Content
                    placement="bottom start"
                    width={290}
                    padding={6}
                >
                    <Menu
                        aria-label="Multiple selection"
                        selectionMode="multiple"
                        selectedKeys={multi}
                        onSelectionChange={setMulti}
                        closeOnSelect={false}
                        selectionIndicator="check"
                    >
                        <SelectableItem
                            id="bold"
                            label="Bold"
                            shortcut={<Shortcut value="B" />}
                        />
                        <SelectableItem
                            id="italic"
                            label="Italic"
                            shortcut={<Shortcut value="I" />}
                        />
                        <SelectableItem
                            id="underline"
                            label="Underline"
                            shortcut={<Shortcut value="U" />}
                        />
                    </Menu>
                </Popover.Content>
            </Popover>
        </Flex>
    );
}

function TriggerCard() {
    return (
        <Flex wrap="wrap" gap={3}>
            {triggerModes.map((trigger) => (
                <Popover
                    key={trigger}
                    trigger={trigger}
                    openDelay={120}
                    closeDelay={180}
                    longPressDelay={520}
                    closeOnHoverLeave={trigger === "hover" ? false : true}
                >
                    <Popover.Trigger>
                        <Button
                            variant={trigger === "both" ? "solid" : "bordered"}
                        >
                            {trigger}
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content
                        placement="bottom start"
                        width={260}
                        padding={6}
                    >
                        <BasicMenu />
                    </Popover.Content>
                </Popover>
            ))}
        </Flex>
    );
}

function PlacementCard() {
    const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={rootRef} className="dropdown-preview__placement-root">
            {placementAnchors.map(({ placement, slot }) => (
                <div
                    key={placement}
                    className={`dropdown-preview__placement-anchor dropdown-preview__placement-anchor--${slot}`}
                >
                    <Popover positioningRoot={rootRef}>
                        <Popover.Trigger>
                            <Button size="sm" variant="flat">
                                {placement}
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content
                            placement={placement}
                            width={230}
                            padding={6}
                        >
                            <BasicMenu />
                        </Popover.Content>
                    </Popover>
                </div>
            ))}
            <Text
                as="span"
                size="xs"
                color="muted"
                className="dropdown-preview__hint"
            >
                Anchors are pinned around this box so side + alignment is
                visible.
            </Text>
        </div>
    );
}

function ArrowCard() {
    return (
        <Flex wrap="wrap" gap={3}>
            <Popover>
                <Popover.Trigger>
                    <Button variant="bordered">No arrow, gap 4</Button>
                </Popover.Trigger>
                <Popover.Content
                    placement="bottom start"
                    width={248}
                    gap={4}
                    padding={6}
                >
                    <BasicMenu />
                </Popover.Content>
            </Popover>
            <Popover>
                <Popover.Trigger>
                    <Button color="primary">Arrow gap 0</Button>
                </Popover.Trigger>
                <Popover.Content
                    placement="bottom start"
                    width={248}
                    gap={10}
                    padding={6}
                    showArrow
                    arrowSize={10}
                    arrowGap={0}
                >
                    <BasicMenu />
                </Popover.Content>
            </Popover>
            <Popover>
                <Popover.Trigger>
                    <Button color="primary" variant="bordered">
                        Arrow gap 8
                    </Button>
                </Popover.Trigger>
                <Popover.Content
                    placement="right center"
                    width={248}
                    gap={16}
                    padding={6}
                    showArrow
                    arrowSize={16}
                    arrowGap={8}
                >
                    <BasicMenu />
                </Popover.Content>
            </Popover>
        </Flex>
    );
}

function DerivedCard() {
    return (
        <Flex wrap="wrap" gap={3}>
            <Tooltip>
                <Tooltip.Trigger>
                    <Button variant="bordered">Tooltip</Button>
                </Tooltip.Trigger>
                <Tooltip.Content padding="xs">
                    Tooltip from Popover.
                </Tooltip.Content>
            </Tooltip>
            <Dropdown>
                <Dropdown.Trigger>
                    <Button color="primary">Dropdown alias</Button>
                </Dropdown.Trigger>
                <Dropdown.Content
                    placement="bottom start"
                    width={270}
                    padding={6}
                >
                    <Dropdown.Menu aria-label="Dropdown alias menu">
                        <ActionItem id="dropdown-new" label="New file" />
                        <ActionItem id="dropdown-share" label="Share" />
                    </Dropdown.Menu>
                </Dropdown.Content>
            </Dropdown>
            <ContextMenu>
                <ContextMenu.Trigger>
                    <div className="dropdown-preview__context-target">
                        Right click context target
                    </div>
                </ContextMenu.Trigger>
                <ContextMenu.Content width={260} padding={6}>
                    <ContextMenu.Menu aria-label="Context menu">
                        <ActionItem id="context-copy" label="Copy" />
                        <ActionItem id="context-paste" label="Paste" />
                        <ContextMenu.Separator />
                        <ActionItem
                            id="context-delete"
                            label="Delete"
                            color="var(--ps-error)"
                        />
                    </ContextMenu.Menu>
                </ContextMenu.Content>
            </ContextMenu>
        </Flex>
    );
}

function DocsStyleExamples() {
    const [multiple, setMultiple] = useState<Selection>(
        () => new Set(["apple", "mango"]),
    );
    const [single, setSingle] = useState<Selection>(() => new Set(["grid"]));

    return (
        <div className="dropdown-preview__docs-grid">
            <Popover>
                <Popover.Trigger>
                    <Button size="sm" color="primary">
                        Basic
                    </Button>
                </Popover.Trigger>
                <Popover.Content width={250} padding={6}>
                    <BasicMenu />
                </Popover.Content>
            </Popover>

            <Popover>
                <Popover.Trigger>
                    <Button size="sm" variant="bordered">
                        Description + Kbd
                    </Button>
                </Popover.Trigger>
                <Popover.Content width={330} padding={6}>
                    <Menu aria-label="Description and shortcuts">
                        <ActionItem
                            id="doc-copy"
                            label="Copy link"
                            description="A row composed with Text"
                            shortcut={<Shortcut value="C" />}
                        />
                        <ActionItem
                            id="doc-rename"
                            label="Rename"
                            description="Shortcut stays user placed"
                            shortcut={<Shortcut value="R" />}
                        />
                        <ActionItem
                            id="doc-delete"
                            label="Delete"
                            color="var(--ps-error)"
                            shortcut={<Kbd keyValue="delete" />}
                        />
                    </Menu>
                </Popover.Content>
            </Popover>

            <Popover>
                <Popover.Trigger>
                    <Button size="sm" variant="bordered">
                        Disabled + sections
                    </Button>
                </Popover.Trigger>
                <Popover.Content width={260} padding={6}>
                    <Menu
                        aria-label="Disabled section menu"
                        disabledKeys={["doc-paste"]}
                    >
                        <Menu.Header>
                            <SectionLabel>Actions</SectionLabel>
                        </Menu.Header>
                        <ActionItem id="doc-new" label="New file" />
                        <ActionItem id="doc-paste" label="Paste" />
                        <Menu.Separator />
                        <ActionItem
                            id="doc-trash"
                            label="Move to trash"
                            color="var(--ps-error)"
                        />
                    </Menu>
                </Popover.Content>
            </Popover>

            <Popover>
                <Popover.Trigger>
                    <Button size="sm" variant="bordered">
                        Multiple select
                    </Button>
                </Popover.Trigger>
                <Popover.Content width={260} padding={6}>
                    <Menu
                        aria-label="Docs multiple selection"
                        selectionMode="multiple"
                        selectedKeys={multiple}
                        onSelectionChange={setMultiple}
                        closeOnSelect={false}
                    >
                        <SelectableItem id="apple" label="Apple" />
                        <SelectableItem id="banana" label="Banana" />
                        <SelectableItem id="mango" label="Mango" />
                    </Menu>
                </Popover.Content>
            </Popover>

            <Popover>
                <Popover.Trigger>
                    <Button size="sm" variant="bordered">
                        Dot select
                    </Button>
                </Popover.Trigger>
                <Popover.Content width={250} padding={6}>
                    <Menu
                        aria-label="Docs single selection"
                        selectionMode="single"
                        selectedKeys={single}
                        onSelectionChange={setSingle}
                        closeOnSelect={false}
                        selectionIndicator="dot"
                    >
                        <SelectableItem
                            id="list"
                            label="List"
                            indicator="dot"
                        />
                        <SelectableItem
                            id="grid"
                            label="Grid"
                            indicator="dot"
                        />
                        <SelectableItem
                            id="kanban"
                            label="Kanban"
                            indicator="dot"
                        />
                    </Menu>
                </Popover.Content>
            </Popover>

            <Popover trigger="longPress">
                <Popover.Trigger>
                    <Button size="sm" variant="bordered">
                        Long press
                    </Button>
                </Popover.Trigger>
                <Popover.Content width={240} padding={6}>
                    <Menu aria-label="Long press docs menu">
                        <ActionItem id="doc-preview" label="Preview" />
                        <ActionItem id="doc-select" label="Select" />
                    </Menu>
                </Popover.Content>
            </Popover>
        </div>
    );
}

function DeepStressCard() {
    return (
        <Popover>
            <Popover.Trigger>
                <Button color="primary">20-level click stack</Button>
            </Popover.Trigger>
            <Popover.Content
                placement="bottom start"
                width={260}
                maxHeight={360}
                padding={6}
            >
                <Menu aria-label="Deep stress">
                    <DeepChain max={20} prefix="click-stress" />
                </Menu>
            </Popover.Content>
        </Popover>
    );
}

function NoFlipCard() {
    const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={rootRef} className="dropdown-preview__no-flip">
            <Popover positioningRoot={rootRef}>
                <Popover.Trigger>
                    <Button size="sm" color="primary">
                        Flip + shrink
                    </Button>
                </Popover.Trigger>
                <Popover.Content placement="right top" width={260} padding={6}>
                    <BasicMenu />
                </Popover.Content>
            </Popover>
            <Popover positioningRoot={rootRef}>
                <Popover.Trigger>
                    <Button size="sm" variant="bordered">
                        No flip
                    </Button>
                </Popover.Trigger>
                <Popover.Content
                    placement="right top"
                    width={260}
                    padding={6}
                    shouldFlip={false}
                >
                    <BasicMenu />
                </Popover.Content>
            </Popover>
        </div>
    );
}

function BackdropCard() {
    return (
        <Flex wrap="wrap" gap={3}>
            {(["transparent", "backdrop", "opaque"] as const).map(
                (backdrop) => (
                    <Popover key={backdrop} backdrop={backdrop}>
                        <Popover.Trigger>
                            <Button variant="bordered">{backdrop}</Button>
                        </Popover.Trigger>
                        <Popover.Content width={270} padding={6}>
                            <BasicMenu />
                        </Popover.Content>
                    </Popover>
                ),
            )}
        </Flex>
    );
}

function DynamicStylesCard() {
    return (
        <Popover>
            <Popover.Trigger>
                <Button color="primary">Dynamic styles</Button>
            </Popover.Trigger>
            <Popover.Content
                placement="bottom start"
                width={320}
                padding={8}
                radius={22}
                background="linear-gradient(135deg, color-mix(in srgb, var(--ps-primary) 10%, var(--ps-content1)), var(--ps-content1))"
                shadow="0 22px 60px rgb(0 0 0 / 24%), 0 2px 8px rgb(0 0 0 / 10%)"
            >
                <Menu
                    aria-label="Dynamic style menu"
                    hoverColor="color-mix(in srgb, var(--ps-primary) 14%, transparent)"
                    selectedColor="color-mix(in srgb, var(--ps-primary) 18%, transparent)"
                >
                    <ActionItem id="theme-bg" label="Dynamic background" />
                    <ActionItem id="theme-radius" label="Dynamic radius" />
                    <ActionItem id="theme-hover" label="Custom hover color" />
                </Menu>
            </Popover.Content>
        </Popover>
    );
}

function ScrollOpenStackCard() {
    const rows = useMemo(
        () =>
            Array.from({ length: 30 }, (_, index) => (
                <ActionItem
                    key={index}
                    id={`open-scroll-row-${index}`}
                    label={`Scrollable child item ${index + 1}`}
                />
            )),
        [],
    );

    return (
        <Popover>
            <Popover.Trigger>
                <Button color="primary">Scroll while stack open</Button>
            </Popover.Trigger>
            <Popover.Content placement="bottom start" width={320} padding={6}>
                <Menu aria-label="Scroll stack root" closeOnSelect={false}>
                    <ActionItem id="scroll-root-a" label="Root action" />
                    <SubMenu trigger="click">
                        <SubMenu.Trigger>
                            <SubMenuRow
                                id="scroll-level-1"
                                label="Open level one"
                            />
                        </SubMenu.Trigger>
                        <SubMenu.Content
                            width={280}
                            maxHeight={300}
                            padding={6}
                        >
                            <Menu
                                aria-label="Scroll stack level one"
                                closeOnSelect={false}
                            >
                                <ActionItem
                                    id="scroll-child-a"
                                    label="Child action"
                                />
                                <SubMenu trigger="click">
                                    <SubMenu.Trigger>
                                        <SubMenuRow
                                            id="scroll-level-2"
                                            label="Open scrollable level"
                                        />
                                    </SubMenu.Trigger>
                                    <SubMenu.Content
                                        width={270}
                                        maxHeight={240}
                                        padding={6}
                                    >
                                        <Menu aria-label="Scrollable nested menu">
                                            {rows}
                                        </Menu>
                                    </SubMenu.Content>
                                </SubMenu>
                                <ActionItem
                                    id="scroll-child-b"
                                    label="Tail action"
                                />
                            </Menu>
                        </SubMenu.Content>
                    </SubMenu>
                    <ActionItem
                        id="scroll-root-b"
                        label="Another root action"
                    />
                </Menu>
            </Popover.Content>
        </Popover>
    );
}

function DeepTriggerGrid() {
    return (
        <Flex wrap="wrap" gap={3}>
            {triggerModes.map((trigger) => (
                <Popover key={trigger} trigger={trigger} closeDelay={220}>
                    <Popover.Trigger>
                        <Button size="sm" variant="bordered">
                            {trigger} 20L
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content width={260} maxHeight={360} padding={6}>
                        <Menu aria-label={`${trigger} deep menu`}>
                            <DeepChain
                                max={20}
                                trigger={trigger}
                                prefix={`${trigger}-deep`}
                            />
                        </Menu>
                    </Popover.Content>
                </Popover>
            ))}
        </Flex>
    );
}

function MixedDeepCard() {
    return (
        <Flex wrap="wrap" gap={3}>
            <Popover>
                <Popover.Trigger>
                    <Button color="primary">Mixed triggers 30L</Button>
                </Popover.Trigger>
                <Popover.Content width={270} maxHeight={380} padding={6}>
                    <Menu aria-label="Mixed deep menu">
                        <DeepChain max={30} mixed prefix="mixed-deep" />
                    </Menu>
                </Popover.Content>
            </Popover>
            <Popover>
                <Popover.Trigger>
                    <Button variant="bordered">Plain 30L</Button>
                </Popover.Trigger>
                <Popover.Content width={270} maxHeight={380} padding={6}>
                    <Menu aria-label="Plain deep menu">
                        <DeepChain max={30} prefix="plain-deep" />
                    </Menu>
                </Popover.Content>
            </Popover>
        </Flex>
    );
}

function AllPlacementDeepCard() {
    const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={rootRef} className="dropdown-preview__placement-root">
            {placementAnchors.map(({ placement, slot }) => (
                <div
                    key={`deep-${placement}`}
                    className={`dropdown-preview__placement-anchor dropdown-preview__placement-anchor--${slot}`}
                >
                    <Popover positioningRoot={rootRef}>
                        <Popover.Trigger>
                            <Button size="sm" variant="flat">
                                {placement} 10L
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content
                            placement={placement}
                            width={250}
                            maxHeight={320}
                            padding={6}
                        >
                            <Menu aria-label={`${placement} deep stack`}>
                                <DeepChain
                                    max={10}
                                    prefix={`place-${placement.replace(/\s+/g, "-")}`}
                                />
                            </Menu>
                        </Popover.Content>
                    </Popover>
                </div>
            ))}
        </div>
    );
}

function Card({
    title,
    description,
    children,
    wide = false,
}: {
    title: string;
    description: string;
    children: ReactNode;
    wide?: boolean;
}) {
    return (
        <section
            className="dropdown-preview__card"
            data-wide={wide || undefined}
        >
            <Flex direction="column" gap={1}>
                <Text as="h2" size="lg" weight="bold">
                    {title}
                </Text>
                <Text color="muted" size="sm">
                    {description}
                </Text>
            </Flex>
            {children}
        </section>
    );
}

export default function DropdownPreview() {
    return (
        <div className="dropdown-preview">
            <section className="dropdown-preview__hero">
                <Text as="span" size="sm" color="primary" weight="semibold">
                    Primitive overlay stack
                </Text>
                <Text as="h1" size="4xl" weight="bold" lineHeight={1.05}>
                    Popover opens the pop. Menu and SubMenu organize behavior.
                </Text>
                <Text size="md" color="muted">
                    ScrollShadow is restored as its own component and only
                    appears when composed explicitly. Menu.Item renders your JSX
                    directly: place Text, Kbd, Flex, Divider and indicators
                    exactly where you want them.
                </Text>
            </section>

            <Card
                title="Popover primitive"
                description="String trigger becomes Text as span; node triggers render directly with only behavior attached."
            >
                <PrimitivePopoverCard />
            </Card>

            <Card
                title="Menu composed with project components"
                description="No label/description/shortcut props: compose rows with Text, Flex, Kbd and Divider."
            >
                <ComposedMenuCard />
            </Card>

            <Card
                title="Explicit ScrollShadow"
                description="No primitive auto-wraps scroll. If a menu needs shadows, place ScrollShadow yourself."
            >
                <ScrollShadowCard />
            </Card>

            <Card
                title="Menu indicators"
                description="Menu.Indicator reads item state but placement is fully controlled by JSX."
            >
                <SelectionCard />
            </Card>

            <Card
                title="SubMenu primitive"
                description="SubMenu keeps open/close, keyboard and positioning behavior; row design stays in Menu.Item children."
            >
                <SubMenuCard />
            </Card>

            <Card
                title="Trigger modes"
                description="click, hover, longPress, context and both all use the same simple Popover primitives."
                wide
            >
                <TriggerCard />
            </Card>

            <Card
                title="Placements"
                description="All top/bottom/left/right placements with start/center/end and custom positioning root."
                wide
            >
                <PlacementCard />
            </Card>

            <Card
                title="Arrow and gaps"
                description="Arrow is opt-in. Padding/gap/arrowGap remain explicit content props."
            >
                <ArrowCard />
            </Card>

            <Card
                title="Thin derived components"
                description="Dropdown, ContextMenu and Tooltip are light aliases/compositions over Popover/Menu/SubMenu."
                wide
            >
                <DerivedCard />
            </Card>

            <Card
                title="Docs-style usage checks"
                description="Basic, descriptions, disabled items, sections, selection, custom composition and long press are all present again."
                wide
            >
                <DocsStyleExamples />
            </Card>

            <Card
                title="No flip"
                description="shouldFlip=false preserves side/size; default mode flips or shrinks naturally."
            >
                <NoFlipCard />
            </Card>

            <Card
                title="Backdrop modes"
                description="Transparent, backdrop and opaque modes stay separate."
            >
                <BackdropCard />
            </Card>

            <Card
                title="Scroll while stack is open"
                description="Open two submenu levels, then scroll the nested pop without changing structure."
            >
                <ScrollOpenStackCard />
            </Card>

            <Card
                title="Dynamic styles"
                description="Popover background/radius/shadow and Menu hover/selected colors stay prop-driven."
            >
                <DynamicStylesCard />
            </Card>

            <Card
                title="Deep behavior stress"
                description="A 20-level SubMenu chain validates stack close, keyboard behavior and fallback positioning without hidden design layers."
            >
                <DeepStressCard />
            </Card>

            <Card
                title="20-level trigger stress"
                description="One deep stack for every trigger: click, hover, longPress, context and both."
                wide
            >
                <DeepTriggerGrid />
            </Card>

            <Card
                title="30-level mixed stacks"
                description="Mixed and plain deep stacks check fallback, close behavior and scroll consistency."
                wide
            >
                <MixedDeepCard />
            </Card>

            <Card
                title="All placements + nested stack"
                description="Every placement opens its own nested stack so alignment remains testable."
                wide
            >
                <AllPlacementDeepCard />
            </Card>

            <Divider />
        </div>
    );
}

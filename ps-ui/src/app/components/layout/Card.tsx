import { Button, Card, Divider, Flex, Ripple, Text } from "../../../index";
import { CameraIcon } from "../../../icons/CameraIcon";
import { HeartIcon } from "../../../icons/HeartIcon";
import { PlusIcon } from "../../../icons/PlusIcon";

const cardWidth = { width: 320 } as const;

const avatarStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: 999,
    background:
        "linear-gradient(135deg, var(--ps-primary-subtle), var(--ps-primary-subtle-hover))",
    color: "var(--ps-primary-text)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    userSelect: "none",
    flexShrink: 0,
};

const imagePlaceholder: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
        "linear-gradient(135deg, var(--ps-content4), var(--ps-content2))",
};

const CardPreview = () => {
    return (
        <Flex direction="column" gap={20}>
            <Card radius="4xl" border={false} style={cardWidth}>
                <Ripple />
                <Card.Header>
                    <Card.Title>Community Hub</Card.Title>
                    <Card.Description>
                        Discover events, meet creators and share your work with
                        a thriving community.
                    </Card.Description>
                </Card.Header>

                <Card.Content
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <div style={avatarStyle}>MR</div>
                    <Flex direction="column" gap={2}>
                        <Text color="foreground" weight="medium" size="md">
                            Mara Ross
                        </Text>
                        <Text color="muted" size="sm">
                            Product designer · 3.2K followers
                        </Text>
                    </Flex>
                </Card.Content>

                <Card.Footer>
                    <Button color="primary" size="sm">
                        Follow
                    </Button>
                </Card.Footer>
            </Card>

            <Flex direction="column" gap={10}>
                <Text color="muted">Variants</Text>

                <Flex gap={12} align="stretch" wrap="wrap">
                    <Card variant="transparent" style={cardWidth}>
                        <Ripple />
                        <Card.Header>
                            <Card.Title>Transparent</Card.Title>
                            <Card.Description>
                                No surface at all. Pairs well inside nested
                                cards.
                            </Card.Description>
                        </Card.Header>
                    </Card>

                    <Card variant="default" style={cardWidth}>
                        <Ripple />
                        <Card.Header>
                            <Card.Title>Default</Card.Title>
                            <Card.Description>
                                Subtle border on a flat surface. The standard
                                start.
                            </Card.Description>
                        </Card.Header>
                    </Card>

                    <Card variant="secondary" style={cardWidth}>
                        <Ripple />
                        <Card.Header>
                            <Card.Title>Secondary</Card.Title>
                            <Card.Description>
                                Slightly elevated surface for grouping related
                                content.
                            </Card.Description>
                        </Card.Header>
                    </Card>

                    <Card variant="tertiary" style={cardWidth}>
                        <Ripple />
                        <Card.Header>
                            <Card.Title>Tertiary</Card.Title>
                            <Card.Description>
                                The most prominent surface. Use it to highlight
                                key panels.
                            </Card.Description>
                        </Card.Header>
                    </Card>
                </Flex>
            </Flex>

            <Flex direction="column" gap={10}>
                <Text color="muted">Horizontal layout</Text>

                <Flex gap={12} wrap="wrap">
                    <Card
                        style={{
                            width: 520,
                            flexDirection: "row",
                            alignItems: "stretch",
                            gap: 16,
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: 140,
                                borderRadius: "var(--ps-component-radius-lg)",
                                overflow: "hidden",
                                flexShrink: 0,
                                alignSelf: "stretch",
                                minHeight: 180,
                            }}
                        >
                            <div style={imagePlaceholder} />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CameraIcon size={24} fill="var(--ps-subtle)" />
                            </div>
                        </div>

                        <Flex direction="column" gap={10} style={{ flex: 1 }}>
                            <Card.Header>
                                <Card.Title>Studio Sessions</Card.Title>
                                <Card.Description>
                                    Weekly hands-on photoshoots lead by
                                    professional photographers.
                                </Card.Description>
                            </Card.Header>

                            <Card.Footer>
                                <Button
                                    color="primary"
                                    size="sm"
                                    endContent={<PlusIcon />}
                                >
                                    Book a slot
                                </Button>
                            </Card.Footer>
                        </Flex>
                    </Card>

                    <Card
                        style={{
                            width: 520,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <div style={avatarStyle}>
                            <HeartIcon />
                        </div>

                        <Flex direction="column" gap={2} style={{ flex: 1 }}>
                            <Card.Title>
                                Good insight, lets keep the code.
                            </Card.Title>
                            <Card.Description>
                                Emily Chen commented on your pull request.
                            </Card.Description>
                        </Flex>

                        <Button variant="text" size="sm" color="primary">
                            Reply
                        </Button>
                    </Card>
                </Flex>
            </Flex>

            <Flex direction="column" gap={10}>
                <Text color="muted">Featured card with cover</Text>

                <Card
                    style={{
                        ...cardWidth,
                        gap: 0,
                        padding: 0,
                        overflow: "hidden",
                    }}
                >
                    <div style={{ position: "relative", height: 200 }}>
                        <div style={imagePlaceholder} />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CameraIcon size={32} fill="var(--ps-subtle)" />
                        </div>
                    </div>

                    <Flex
                        direction="column"
                        style={{ padding: "var(--ps-space-lg)", gap: 12 }}
                    >
                        <Card.Title>Explore the world in 4K</Card.Title>
                        <Card.Description>
                            A cinematic collection of travel guides, filmed
                            across 40+ countries.
                        </Card.Description>

                        <Card.Footer>
                            <Button size="sm" variant="bordered">
                                View chapters
                            </Button>
                        </Card.Footer>
                    </Flex>
                </Card>
            </Flex>

            <Flex direction="column" gap={10}>
                <Text color="muted">With Divider</Text>

                <Card style={cardWidth}>
                    <Card.Header>
                        <Card.Title>Nest.js Starter</Card.Title>
                        <Card.Description>
                            Everything you need to ship your next API.
                        </Card.Description>
                    </Card.Header>

                    <Card.Content>
                        <Flex direction="column" gap={6}>
                            <Text size="sm">
                                Includes routing, validation, auth
                            </Text>
                            <Text size="sm">Zero config middleware</Text>
                        </Flex>

                        <Divider />

                        <Flex align="center" justify="between">
                            <Text color="muted" size="sm">
                                1.2k downloads
                            </Text>
                            <Button size="sm" startContent={<PlusIcon />}>
                                Install
                            </Button>
                        </Flex>
                    </Card.Content>
                </Card>
            </Flex>

            <Flex direction="column" gap={10}>
                <Text color="muted">Nested cards</Text>

                <Card variant="secondary" style={cardWidth}>
                    <Card.Header>
                        <Card.Title>Team workspace</Card.Title>
                        <Card.Description>
                            Groups keep projects organized and focused.
                        </Card.Description>
                    </Card.Header>

                    <Card.Content>
                        <Card variant="transparent">
                            <Card.Header>
                                <Card.Title>Product</Card.Title>
                                <Card.Description>
                                    12 projects · Design, Frontend, Marketing
                                </Card.Description>
                            </Card.Header>
                        </Card>

                        <Card variant="transparent">
                            <Card.Header>
                                <Card.Title>Engineering</Card.Title>
                                <Card.Description>
                                    8 projects · API, Infra, Mobile
                                </Card.Description>
                            </Card.Header>
                        </Card>
                    </Card.Content>
                </Card>
            </Flex>

            <Flex direction="column" gap={10}>
                <Text color="muted">Interactive (wrapped in a link)</Text>

                <a
                    href="#"
                    style={{
                        textDecoration: "none",
                        display: "block",
                        borderRadius: "var(--ps-component-radius-lg)",
                    }}
                >
                    <Card style={{ ...cardWidth, width: 360 }}>
                        <Card.Header>
                            <Card.Title>Read the changelog</Card.Title>
                            <Card.Description>
                                See what landed in the latest release and plan
                                your upgrades.
                            </Card.Description>
                        </Card.Header>
                    </Card>
                </a>
            </Flex>
        </Flex>
    );
};

export default CardPreview;

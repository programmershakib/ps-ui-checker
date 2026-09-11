import { CameraIcon } from "../../../icons/CameraIcon";
import { HeartIcon } from "../../../icons/HeartIcon";
import { Button, Flex } from "../../../index";

const ButtonPreview = () => {
    return (
        <Flex direction="column" gap={20}>
            <Flex gap={10}>
                <Button color="primary">Button</Button>
            </Flex>

            <Flex gap={10}>
                <Button color="primary" disabled>
                    Disabled
                </Button>
            </Flex>

            <Flex gap={10}>
                <Button color="primary">Solid</Button>

                <Button variant="bordered" color="primary">
                    Bordered
                </Button>

                <Button variant="shadow" color="primary">
                    Shadow
                </Button>

                <Button variant="text" color="primary">
                    Text
                </Button>

                <Button variant="flat" color="primary">
                    Flat
                </Button>

                <Button variant="ghost" color="primary">
                    Ghost
                </Button>
            </Flex>

            <Flex gap={10}>
                <Button>Default</Button>

                <Button color="primary">Primary</Button>

                <Button color="secondary">Secondary</Button>

                <Button color="success">Success</Button>

                <Button color="warning">Warning</Button>

                <Button color="error">Error</Button>
            </Flex>

            <Flex gap={10}>
                <Button radius="none">None</Button>

                <Button radius="sm">Small</Button>

                <Button radius="md">Medium</Button>

                <Button radius="lg">Large</Button>

                <Button
                    radius="full"
                    style={{
                        minWidth: "80px",
                    }}
                >
                    Full
                </Button>
            </Flex>

            <Flex align="center" gap={10}>
                <Button size="sm" loading>
                    Small
                </Button>

                <Button size="md">Medium</Button>

                <Button size="lg">Large</Button>
            </Flex>

            <Flex gap={10}>
                <Button color="error" iconOnly>
                    <HeartIcon />
                </Button>

                <Button color="secondary" iconOnly>
                    <CameraIcon />
                </Button>

                <Button color="error" endContent={<HeartIcon />}>
                    Heart
                </Button>

                <Button color="secondary" startContent={<CameraIcon />}>
                    Camera
                </Button>
            </Flex>

            <Flex gap={10}>
                <Button loading spinnerVariant="default">
                    Default
                </Button>

                <Button loading spinnerVariant="fade">
                    Simple
                </Button>

                <Button
                    color="error"
                    radius="full"
                    loading
                    spinnerVariant="spinner"
                    spinnerPlacement="end"
                >
                    Spinner
                </Button>

                <Button loading spinnerVariant="swirling">
                    Swirling
                </Button>

                <Button loading spinnerVariant="dots">
                    Dots
                </Button>
            </Flex>

            <Flex gap={10}>
                <Button
                    style={{
                        height: "56px",
                        padding: "0 28px",
                        fontSize: "var(--ps-font-size-lg)",
                    }}
                >
                    Custom
                </Button>
            </Flex>
        </Flex>
    );
};

export default ButtonPreview;

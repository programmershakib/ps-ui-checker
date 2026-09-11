import { Button, Flex, Text } from "../index";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

const Topbar = ({
    mode,
    setMode,
}: {
    mode: "light" | "dark";
    setMode: (mode: "light" | "dark") => void;
}) => {
    return (
        <Flex
            align="center"
            justify="between"
            gap={10}
            style={{
                position: "sticky",
                top: 0,
                zIndex: "var(--ps-z-sticky)",
                backgroundColor: "var(--ps-content2)",
                padding: "10px 20px",
            }}
        >
            <Text size="xl" weight="bold">
                PS
            </Text>

            <Button
                iconOnly
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
                {mode === "light" ? (
                    <MoonIcon
                        style={{
                            width: "60%",
                            height: "60%",
                        }}
                    />
                ) : (
                    <SunIcon
                        style={{
                            width: "60%",
                            height: "60%",
                        }}
                    />
                )}
            </Button>
        </Flex>
    );
};

export default Topbar;

import { Flex, Kbd } from "../../../index";

const KbdPreview = () => {
    return (
        <Flex direction="column" gap={20}>
            <Flex gap={10} align="center">
                <Kbd>Keyboard</Kbd>

                <Kbd keys="command" />

                <Kbd keys="enter" />

                <Kbd keys="escape" />

                <Kbd keys={["option", "command"]}>P</Kbd>
            </Flex>

            <Flex gap={10} align="center">
                <Kbd keys="command">Command</Kbd>

                <Kbd keys="shift">Shift</Kbd>

                <Kbd keys="ctrl">Control</Kbd>

                <Kbd keys="option">Option</Kbd>

                <Kbd keys="fn">Fn</Kbd>

                <Kbd keys="win">Win</Kbd>

                <Kbd keys="alt">Alt</Kbd>
            </Flex>

            <Flex gap={10} align="center">
                <Kbd keys="up" />

                <Kbd keys="right" />

                <Kbd keys="down" />

                <Kbd keys="left" />

                <Kbd keys="home" />

                <Kbd keys="end" />
            </Flex>

            <Flex gap={10} align="center">
                <Kbd keys="enter" />

                <Kbd keys="delete" />

                <Kbd keys="escape" />

                <Kbd keys="tab" />

                <Kbd keys="capslock" />

                <Kbd keys="space" />

                <Kbd keys="help" />
            </Flex>

            <Flex gap={10} align="center">
                <Kbd keys="pageup" />

                <Kbd keys="pagedown" />

                <Kbd keys="home" />

                <Kbd keys="end" />
            </Flex>

            {/* <Flex gap={10} align="center">
                <Kbd keys={["command", "c"]}>Copy</Kbd>

                <Kbd keys={["command", "v"]}>Paste</Kbd>

                <Kbd keys={["command", "x"]}>Cut</Kbd>

                <Kbd keys={["command", "z"]}>Undo</Kbd>
            </Flex> */}

            <Flex gap={10} align="center">
                <Kbd keys={["ctrl", "shift"]}>Ctrl + Shift</Kbd>

                <Kbd keys={["command", "shift"]}>Command + Shift</Kbd>

                <Kbd keys={["command", "option"]}>Command + Option</Kbd>

                <Kbd keys={["ctrl", "alt"]}>Ctrl + Alt</Kbd>
            </Flex>

            <Flex gap={10} align="center">
                <Kbd keys="enter">Submit</Kbd>

                <Kbd keys="escape">Close</Kbd>

                <Kbd keys="delete">Remove</Kbd>

                <Kbd keys="space">Pause</Kbd>
            </Flex>

            <Flex gap={10} align="center">
                {/* <Kbd keys={["command", "shift", "p"]}>Command Palette</Kbd>

                <Kbd keys={["command", "shift", "s"]}>Save As</Kbd> */}

                <Kbd keys={["command", "option", "escape"]}>Force Quit</Kbd>
            </Flex>

            <Flex gap={10} align="center">
                <Kbd
                    keys="command"
                    classNames={{
                        base: "custom-kbd",
                        abbr: "custom-kbd__abbr",
                        content: "custom-kbd__content",
                    }}
                >
                    Custom
                </Kbd>
            </Flex>

            <Flex gap={10} align="center">
                <Kbd
                    keys="command"
                    style={{
                        minWidth: "80px",
                        padding: "8px 14px",
                        fontSize: "var(--ps-font-size-lg)",
                    }}
                >
                    Custom
                </Kbd>
            </Flex>

            <Flex gap={10} align="center" wrap="wrap">
                <Kbd keys="command" />
                <Kbd keys="shift" />
                <Kbd keys="ctrl" />
                <Kbd keys="option" />
                <Kbd keys="enter" />
                <Kbd keys="delete" />
                <Kbd keys="escape" />
                <Kbd keys="tab" />
                <Kbd keys="capslock" />
                <Kbd keys="up" />
                <Kbd keys="right" />
                <Kbd keys="down" />
                <Kbd keys="left" />
                <Kbd keys="pageup" />
                <Kbd keys="pagedown" />
                <Kbd keys="home" />
                <Kbd keys="end" />
                <Kbd keys="help" />
                <Kbd keys="space" />
                <Kbd keys="fn" />
                <Kbd keys="win" />
                <Kbd keys="alt" />
            </Flex>
        </Flex>
    );
};

export default KbdPreview;

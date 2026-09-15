import { ScrollShadow, Flex, Text } from "../../../index";

const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

const ScrollShadowPreview = () => {
    return (
        <Flex direction="column" gap={30}>
            {/* Default */}
            <Flex direction="column" gap={10}>
                <Text>Default</Text>

                <ScrollShadow
                    hideScrollBar
                    variant="minimal"
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Vertical */}
            <Flex direction="column" gap={10}>
                <Text>Vertical</Text>

                <ScrollShadow
                    orientation="vertical"
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Horizontal */}
            <Flex direction="column" gap={10}>
                <Text>Horizontal</Text>

                <ScrollShadow
                    orientation="horizontal"
                    style={{
                        width: "400px",
                    }}
                >
                    <Flex gap={20} style={{ width: "1000px" }}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Both Directions */}
            <Flex direction="column" gap={10}>
                <Text>Both Directions</Text>

                <ScrollShadow
                    style={{
                        width: "300px",
                        height: "200px",
                    }}
                >
                    <div
                        style={{
                            width: "700px",
                            height: "500px",
                        }}
                    >
                        <Flex direction="column" gap={10}>
                            {items.map((item) => (
                                <Text key={item}>{item}</Text>
                            ))}
                        </Flex>
                    </div>
                </ScrollShadow>
            </Flex>

            {/* Size */}
            <Flex direction="column" gap={10}>
                <Text>Custom Shadow Size</Text>

                <ScrollShadow
                    size={40}
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Size with CSS Value */}
            <Flex direction="column" gap={10}>
                <Text>Custom Size with CSS Value</Text>

                <ScrollShadow
                    size="2rem"
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Offset */}
            <Flex direction="column" gap={10}>
                <Text>Shadow Offset</Text>

                <ScrollShadow
                    offset={20}
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Visibility */}
            <Flex direction="column" gap={10}>
                <Text>Visibility: Both</Text>

                <ScrollShadow
                    visibility="both"
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            <Flex direction="column" gap={10}>
                <Text>Visibility: Top</Text>

                <ScrollShadow
                    visibility="top"
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            <Flex direction="column" gap={10}>
                <Text>Visibility: Bottom</Text>

                <ScrollShadow
                    visibility="bottom"
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            <Flex direction="column" gap={10}>
                <Text>Visibility: None</Text>

                <ScrollShadow
                    visibility="none"
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Hide Scrollbar */}
            <Flex direction="column" gap={10}>
                <Text>Hide Scrollbar</Text>

                <ScrollShadow
                    hideScrollBar
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Disabled */}
            <Flex direction="column" gap={10}>
                <Text>Disabled</Text>

                <ScrollShadow
                    enabled={false}
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Visibility Change */}
            <Flex direction="column" gap={10}>
                <Text>Visibility Change</Text>

                <ScrollShadow
                    onVisibilityChange={(visibility) => {
                        console.log("Visibility:", visibility);
                    }}
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* ClassNames */}
            <Flex direction="column" gap={10}>
                <Text>Custom Class Names</Text>

                <ScrollShadow
                    classNames={{
                        base: "custom-scroll-shadow",
                        content: "custom-scroll-content",
                    }}
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* HTML Attributes */}
            <Flex direction="column" gap={10}>
                <Text>HTML Attributes</Text>

                <ScrollShadow
                    id="scroll-shadow"
                    aria-label="Scrollable content"
                    data-testid="scroll-shadow"
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Minimal Variant */}
            <Flex direction="column" gap={10}>
                <Text>Minimal Variant</Text>

                <ScrollShadow
                    variant="minimal"
                    barColor="#f97316"
                    arrowColor="#f97316"
                    hideScrollBar
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Minimal Variant Small Scrollbar */}
            <Flex direction="column" gap={10}>
                <Text>Minimal with Custom Scrollbar Size</Text>

                <ScrollShadow
                    variant="minimal"
                    scrollbarSize={12}
                    style={{
                        height: "200px",
                        width: "300px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>

            {/* Combined */}
            <Flex direction="column" gap={10}>
                <Text>Combined</Text>

                <ScrollShadow
                    orientation="vertical"
                    size={30}
                    offset={10}
                    hideScrollBar
                    enabled
                    visibility="auto"
                    onVisibilityChange={(visibility) => {
                        console.log("Current visibility:", visibility);
                    }}
                    classNames={{
                        base: "custom-scroll-shadow",
                        content: "custom-scroll-content",
                    }}
                    id="combined-scroll-shadow"
                    aria-label="Scrollable content"
                    style={{
                        height: "250px",
                        width: "350px",
                    }}
                >
                    <Flex direction="column" gap={10}>
                        {items.map((item) => (
                            <Text key={item}>{item}</Text>
                        ))}
                    </Flex>
                </ScrollShadow>
            </Flex>
        </Flex>
    );
};

export default ScrollShadowPreview;

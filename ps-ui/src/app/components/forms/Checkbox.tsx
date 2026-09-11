import { Checkbox, CheckboxGroup, Flex } from "../../../index";
import { HeartIcon } from "../../../icons/HeartIcon";
import { PlusIcon } from "../../../icons/PlusIcon";

const CheckboxPreview = () => {
    return (
        <Flex direction="column" gap={20}>
            <Flex gap={10}>
                <Checkbox value="basic">Basic</Checkbox>

                <Checkbox value="checked" defaultChecked>
                    Default Checked
                </Checkbox>

                <Checkbox value="disabled" disabled>
                    Disabled
                </Checkbox>

                <Checkbox value="disabled-checked" disabled defaultChecked>
                    Disabled Checked
                </Checkbox>

                <Checkbox value="readonly" readOnly defaultChecked>
                    Read Only
                </Checkbox>

                <Checkbox value="required" required>
                    Required
                </Checkbox>

                <Checkbox value="invalid" invalid>
                    Invalid
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox value="default" color="default">
                    Default
                </Checkbox>
                <Checkbox value="primary" color="primary">
                    Primary
                </Checkbox>
                <Checkbox value="secondary" color="secondary">
                    Secondary
                </Checkbox>
                <Checkbox value="success" color="success">
                    Success
                </Checkbox>
                <Checkbox value="warning" color="warning">
                    Warning
                </Checkbox>
                <Checkbox value="error" color="error">
                    Error
                </Checkbox>
            </Flex>

            <Flex gap={10} align="center">
                <Checkbox value="sm" size="sm">
                    Small
                </Checkbox>

                <Checkbox value="md" size="md">
                    Medium
                </Checkbox>

                <Checkbox value="lg" size="lg">
                    Large
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox value="none" radius="none">
                    None
                </Checkbox>

                <Checkbox value="sm" radius="sm">
                    Small
                </Checkbox>

                <Checkbox value="md" radius="md">
                    Medium
                </Checkbox>

                <Checkbox value="lg" radius="lg">
                    Large
                </Checkbox>

                <Checkbox value="full" radius="full">
                    Full
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox value="start" alignIndicator="start">
                    Indicator Start
                </Checkbox>

                <Checkbox value="center" alignIndicator="center">
                    Indicator Center
                </Checkbox>

                <Checkbox value="end" alignIndicator="end">
                    Indicator End
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox value="start" childrenPlacement="start">
                    Label Start
                </Checkbox>

                <Checkbox value="end" childrenPlacement="end">
                    Label End
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox value="line-through" lineThrough defaultChecked>
                    Line Through
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox value="indeterminate" indeterminate>
                    Indeterminate
                </Checkbox>

                <Checkbox
                    value="indeterminate-checked"
                    indeterminate
                    defaultChecked
                >
                    Indeterminate + Checked
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox value="animated">Animation</Checkbox>

                <Checkbox value="no-animation" disableAnimation>
                    Disable Animation
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox
                    value="custom-icon"
                    icon={({ checked, indeterminate }) =>
                        indeterminate ? (
                            <PlusIcon />
                        ) : checked ? (
                            <HeartIcon />
                        ) : (
                            ""
                        )
                    }
                >
                    Custom Icon
                </Checkbox>
            </Flex>

            <Flex gap={10}>
                <Checkbox
                    value="change"
                    onChange={(checked) => {
                        console.log("Checkbox:", checked);
                    }}
                >
                    onChange
                </Checkbox>
            </Flex>

            <CheckboxGroup
                name="interests"
                label="Interests"
                description="Select your interests."
                defaultValue={["react", "typescript"]}
                onChange={(value) => {
                    console.log("CheckboxGroup:", value);
                }}
            >
                <Checkbox value="react">React</Checkbox>
                <Checkbox value="typescript">TypeScript</Checkbox>
                <Checkbox value="javascript">JavaScript</Checkbox>
                <Checkbox value="css">CSS</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                name="technologies"
                label="Technologies"
                orientation="horizontal"
                color="primary"
                size="md"
            >
                <Checkbox value="react">React</Checkbox>
                <Checkbox value="vue">Vue</Checkbox>
                <Checkbox value="angular">Angular</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                name="states"
                label="States"
                description="Group state example."
                required
                invalid
                readOnly
                errorMessage="Please select a valid option."
            >
                <Checkbox value="one">One</Checkbox>
                <Checkbox value="two">Two</Checkbox>
                <Checkbox value="three">Three</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                name="disabled"
                label="Disabled Group"
                disabled
                defaultValue={["one"]}
            >
                <Checkbox value="one">One</Checkbox>
                <Checkbox value="two">Two</Checkbox>
                <Checkbox value="three">Three</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                name="classnames"
                label="Custom Class Names"
                classNames={{
                    base: "custom-checkbox-group",
                    wrapper: "custom-checkbox-wrapper",
                    label: "custom-checkbox-label",
                    description: "custom-checkbox-description",
                }}
            >
                <Checkbox
                    value="one"
                    classNames={{
                        base: "custom-checkbox-base",
                        wrapper: "custom-checkbox-wrapper",
                        icon: "custom-checkbox-icon",
                        label: "custom-checkbox-label",
                    }}
                >
                    Custom Classes
                </Checkbox>
            </CheckboxGroup>
        </Flex>
    );
};

export default CheckboxPreview;

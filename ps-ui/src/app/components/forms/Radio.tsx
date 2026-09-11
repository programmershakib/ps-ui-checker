import { Flex, Radio, RadioGroup } from "../../../index";

const RadioPreview = () => {
    return (
        <Flex direction="column" gap={20}>
            <RadioGroup
                name="basic"
                label="Basic Radio"
                description="Choose one option."
                defaultValue="one"
                onChange={(value) => {
                    console.log("Radio:", value);
                }}
            >
                <Radio value="one">One</Radio>
                <Radio value="two">Two</Radio>
                <Radio value="three">Three</Radio>
            </RadioGroup>

            <RadioGroup name="colors" label="Colors" orientation="horizontal">
                <Radio value="default" color="default">
                    Default
                </Radio>
                <Radio value="primary" color="primary">
                    Primary
                </Radio>
                <Radio value="secondary" color="secondary">
                    Secondary
                </Radio>
                <Radio value="success" color="success">
                    Success
                </Radio>
                <Radio value="warning" color="warning">
                    Warning
                </Radio>
                <Radio value="error" color="error">
                    Error
                </Radio>
            </RadioGroup>

            <RadioGroup name="sizes" label="Sizes" orientation="horizontal">
                <Radio value="sm" size="sm">
                    Small
                </Radio>

                <Radio value="md" size="md">
                    Medium
                </Radio>

                <Radio value="lg" size="lg">
                    Large
                </Radio>
            </RadioGroup>

            <RadioGroup
                name="alignment"
                label="Indicator Alignment"
                orientation="horizontal"
            >
                <Radio value="start" alignIndicator="start">
                    Start
                </Radio>

                <Radio value="center" alignIndicator="center">
                    Center
                </Radio>

                <Radio value="end" alignIndicator="end">
                    End
                </Radio>
            </RadioGroup>

            <RadioGroup
                name="descriptions"
                label="Plan"
                description="Choose the plan that works best for you."
            >
                <Radio value="free" description="Free forever.">
                    Free
                </Radio>

                <Radio value="pro" description="For professional users.">
                    Pro
                </Radio>

                <Radio value="enterprise" description="For large teams.">
                    Enterprise
                </Radio>
            </RadioGroup>

            <RadioGroup name="states" label="States" orientation="horizontal">
                <Radio value="required" required>
                    Required
                </Radio>

                <Radio value="readonly" readOnly>
                    Read Only
                </Radio>

                <Radio value="disabled" disabled>
                    Disabled
                </Radio>

                <Radio value="invalid" invalid>
                    Invalid
                </Radio>
            </RadioGroup>

            <RadioGroup
                name="disabled-checked"
                label="Disabled Checked"
                defaultValue="selected"
            >
                <Radio value="selected" disabled>
                    Selected & Disabled
                </Radio>

                <Radio value="other" disabled>
                    Other
                </Radio>
            </RadioGroup>

            <RadioGroup
                name="animation"
                label="Animation"
                orientation="horizontal"
            >
                <Radio value="animated">Animated</Radio>

                <Radio value="disabled-animation" disableAnimation>
                    Disable Animation
                </Radio>
            </RadioGroup>

            <RadioGroup
                name="validation"
                label="Validation"
                required
                invalid
                errorMessage="Please select an option."
            >
                <Radio value="one">One</Radio>
                <Radio value="two">Two</Radio>
            </RadioGroup>

            <RadioGroup
                name="disabled-group"
                label="Disabled Group"
                description="The entire group is disabled."
                disabled
                defaultValue="one"
            >
                <Radio value="one">One</Radio>
                <Radio value="two">Two</Radio>
                <Radio value="three">Three</Radio>
            </RadioGroup>

            <RadioGroup
                name="readonly-group"
                label="Read Only Group"
                readOnly
                defaultValue="one"
            >
                <Radio value="one">One</Radio>
                <Radio value="two">Two</Radio>
                <Radio value="three">Three</Radio>
            </RadioGroup>

            <RadioGroup
                name="classnames"
                label="Custom Class Names"
                classNames={{
                    base: "custom-radio-group",
                    wrapper: "custom-radio-wrapper",
                    label: "custom-radio-label",
                    description: "custom-radio-description",
                }}
            >
                <Radio
                    value="one"
                    classNames={{
                        base: "custom-radio-base",
                        wrapper: "custom-radio-wrapper",
                        label: "custom-radio-label",
                        description: "custom-radio-description",
                    }}
                >
                    Custom Classes
                </Radio>

                <Radio value="two">Two</Radio>
            </RadioGroup>

            <RadioGroup
                name="native"
                label="Native Props"
                id="radio-native"
                title="Native HTML attributes"
                aria-label="Native radio group"
                data-testid="radio-group"
            >
                <Radio
                    value="one"
                    id="radio-one"
                    title="Radio one"
                    aria-label="Radio one"
                    data-testid="radio-one"
                >
                    One
                </Radio>

                <Radio value="two">Two</Radio>
            </RadioGroup>
        </Flex>
    );
};

export default RadioPreview;

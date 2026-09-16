import { Flex, Switch, SwitchGroup } from "../../../index";
import { MoonIcon } from "../../../icons/MoonIcon";
import { SunIcon } from "../../../icons/SunIcon";

const SwitchPreview = () => {
    return (
        <Flex direction="column" gap={20}>
            <Flex gap={10}>
                <Switch value="basic">Basic</Switch>

                <Switch value="checked" defaultChecked>
                    Default Checked
                </Switch>

                <Switch value="disabled" disabled>
                    Disabled
                </Switch>

                <Switch value="disabled-checked" disabled defaultChecked>
                    Disabled Checked
                </Switch>

                <Switch value="readonly" readOnly defaultChecked>
                    Read Only
                </Switch>

                <Switch value="required" required>
                    Required
                </Switch>

                <Switch value="invalid" invalid>
                    Invalid
                </Switch>
            </Flex>

            <Flex gap={10}>
                <Switch value="default" color="default">
                    Default
                </Switch>

                <Switch value="primary" color="primary">
                    Primary
                </Switch>

                <Switch value="secondary" color="secondary">
                    Secondary
                </Switch>

                <Switch value="success" color="success">
                    Success
                </Switch>

                <Switch value="warning" color="warning">
                    Warning
                </Switch>

                <Switch value="error" color="error">
                    Error
                </Switch>
            </Flex>

            <Flex gap={10} align="center">
                <Switch value="sm" size="sm">
                    Small
                </Switch>

                <Switch value="md" size="md">
                    Medium
                </Switch>

                <Switch value="lg" size="lg">
                    Large
                </Switch>
            </Flex>

            <Flex gap={10}>
                <Switch value="start" childrenPlacement="start">
                    Label Start
                </Switch>

                <Switch value="end" childrenPlacement="end">
                    Label End
                </Switch>
            </Flex>

            <Flex gap={10}>
                <Switch
                    value="content"
                    startContent={<SunIcon />}
                    endContent={<MoonIcon />}
                >
                    Theme
                </Switch>

                <Switch value="start-content" startContent={<SunIcon />}>
                    Start Content
                </Switch>

                <Switch value="end-content" endContent={<MoonIcon />}>
                    End Content
                </Switch>
            </Flex>

            <Flex gap={10}>
                <Switch
                    value="thumb"
                    thumbContent={(checked) =>
                        checked ? <MoonIcon /> : <SunIcon />
                    }
                >
                    Custom Thumb
                </Switch>

                <Switch value="thumb-static" thumbContent={<MoonIcon />}>
                    Static Thumb
                </Switch>
            </Flex>

            <Flex gap={10}>
                <Switch value="controlled" checked>
                    Controlled
                </Switch>
            </Flex>

            <Flex gap={10}>
                <Switch value="required" required>
                    Required
                </Switch>

                <Switch value="readonly" readOnly defaultChecked>
                    Read Only
                </Switch>

                <Switch value="disabled" disabled>
                    Disabled
                </Switch>

                <Switch value="invalid" invalid>
                    Invalid
                </Switch>
            </Flex>

            <SwitchGroup
                name="notifications"
                label="Notifications"
                description="Choose which notifications you want."
                defaultValue={["email", "push"]}
            >
                <Switch value="email">Email</Switch>

                <Switch value="push">Push Notifications</Switch>

                <Switch value="sms">SMS</Switch>
            </SwitchGroup>

            <SwitchGroup
                name="features"
                label="Features"
                orientation="horizontal"
                color="primary"
                size="md"
            >
                <Switch value="analytics">Analytics</Switch>

                <Switch value="comments">Comments</Switch>

                <Switch value="sharing">Sharing</Switch>
            </SwitchGroup>

            <SwitchGroup
                name="states"
                label="Group States"
                description="Shared group state."
                required
                invalid
                errorMessage="Please select an option."
            >
                <Switch value="one">One</Switch>
                <Switch value="two">Two</Switch>
                <Switch value="three">Three</Switch>
            </SwitchGroup>

            <SwitchGroup
                name="disabled-group"
                label="Disabled Group"
                disabled
                defaultValue={["one"]}
            >
                <Switch value="one">One</Switch>
                <Switch value="two">Two</Switch>
                <Switch value="three">Three</Switch>
            </SwitchGroup>

            <SwitchGroup
                name="readonly-group"
                label="Read Only Group"
                readOnly
                defaultValue={["one"]}
            >
                <Switch value="one">One</Switch>
                <Switch value="two">Two</Switch>
                <Switch value="three">Three</Switch>
            </SwitchGroup>

            <SwitchGroup
                name="classnames"
                label="Custom Class Names"
                classNames={{
                    base: "custom-switch-group",
                    wrapper: "custom-switch-wrapper",
                    label: "custom-switch-label",
                    description: "custom-switch-description",
                }}
            >
                <Switch
                    value="one"
                    classNames={{
                        base: "custom-switch-base",
                        wrapper: "custom-switch-wrapper",
                        thumb: "custom-switch-thumb",
                        label: "custom-switch-label",
                    }}
                >
                    Custom Classes
                </Switch>

                <Switch value="two">Two</Switch>
            </SwitchGroup>

            <SwitchGroup
                name="native"
                label="Native Props"
                id="switch-native"
                title="Native HTML attributes"
                aria-label="Native switch group"
                data-testid="switch-group"
            >
                <Switch
                    value="one"
                    id="switch-one"
                    title="Switch one"
                    aria-label="Switch one"
                    data-testid="switch-one"
                >
                    One
                </Switch>

                <Switch value="two">Two</Switch>
            </SwitchGroup>
        </Flex>
    );
};

export default SwitchPreview;

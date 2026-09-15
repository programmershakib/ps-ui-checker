import ButtonPreview from "./components/forms/Button";
import SwitchPreview from "./components/forms/Switch";
import { Flex } from "../index";
import CheckboxPreview from "./components/forms/Checkbox";
import RadioPreview from "./components/forms/Radio";
import CardPreview from "./components/layout/Card";
import ScrollShadowPreview from "./components/layout/ScrollShadow";

const Content = () => {
    return (
        <Flex
            direction="column"
            gap={20}
            style={{
                padding: "20px",
            }}
        >
            <CardPreview />
            <ScrollShadowPreview />
            <RadioPreview />
            <CheckboxPreview />
            <SwitchPreview />
            <ButtonPreview />
        </Flex>
    );
};

export default Content;

// import ButtonPreview from "./components/forms/Button";
// import SwitchPreview from "./components/forms/Switch";
import { Flex } from "../index";
// import CheckboxPreview from "./components/forms/Checkbox";
// import RadioPreview from "./components/forms/Radio";
import KbdPreview from "./components/data-display/Kbd";

const Content = () => {
    return (
        <Flex
            direction="column"
            gap={20}
            style={{
                padding: "20px",
            }}
        >
            <KbdPreview />
            {/* <RadioPreview />
            <CheckboxPreview />
            <SwitchPreview /> */}
            {/* <ButtonPreview />
            <ButtonPreview />
            <ButtonPreview />
            <ButtonPreview />
            <ButtonPreview />
            <ButtonPreview />
            <ButtonPreview />
            <ButtonPreview /> */}
        </Flex>
    );
};

export default Content;

import "./styles/common.css";

export type {
    Base,
    Color,
    ColorScale,
    FontSize,
    FontWeight,
    FontFamily,
    Radius,
    RadiusScale,
    Size,
    Space,
    Shadow,
    Blur,
    ZIndexLayer,
    Duration,
    Easing,
} from "./types/common";

export { ThemeProvider, createTheme } from "./theme";
export type {
    ThemeProviderProps,
    ThemeConfig,
    ColorOverride,
    ControlSizeOverride,
} from "./theme";

export { cn } from "./utils/class-names/cn";

export { isColorToken, resolveColor } from "./utils/resolvers/resolve-color";
export {
    isFontSizeToken,
    resolveFontSize,
} from "./utils/resolvers/resolve-font-size";
export { isSpaceToken, resolveSpace } from "./utils/resolvers/resolve-space";
export { isRadiusToken, resolveRadius } from "./utils/resolvers/resolve-radius";
export { resolveLineHeight } from "./utils/resolvers/resolve-line-height";

export { useControllableState } from "./hooks/state/useControllableState";
export { useGroupValidation } from "./hooks/state/useGroupValidation";

export { Ripple } from "./components/effects/Ripple";
export type { RippleProps } from "./components/effects/Ripple";

export { Spinner } from "./components/feedback/Spinner";
export type { SpinnerProps } from "./components/feedback/Spinner";

export { Button } from "./components/forms/Button";
export type { ButtonProps } from "./components/forms/Button";

export { Text } from "./components/typography/Text";
export type { TextProps } from "./components/typography/Text";

export { Flex } from "./components/layout/Flex";
export type { FlexProps } from "./components/layout/Flex";

export { Grid } from "./components/layout/Grid";
export type { GridProps } from "./components/layout/Grid";

export { Divider } from "./components/layout/Divider";
export type { DividerProps } from "./components/layout/Divider";

export { ScrollShadow } from "./components/layout/ScrollShadow";
export type { ScrollShadowProps } from "./components/layout/ScrollShadow";

export { Kbd } from "./components/data-display/Kbd";
export type { KbdProps } from "./components/data-display/Kbd/Kbd.types";

export { Checkbox, CheckboxGroup } from "./components/forms/Checkbox";
export type {
    CheckboxProps,
    CheckboxGroupProps,
    CheckboxGroupContextValue,
} from "./components/forms/Checkbox";

export { Radio, RadioGroup } from "./components/forms/Radio";
export type {
    RadioProps,
    RadioGroupProps,
    RadioGroupContextValue,
} from "./components/forms/Radio";

export { Switch, SwitchGroup } from "./components/forms/Switch";
export type {
    SwitchProps,
    SwitchGroupProps,
    SwitchGroupContextValue,
} from "./components/forms/Switch";

export { VisuallyHidden } from "./components/accessibility/VisuallyHidden";
export type { VisuallyHiddenProps } from "./components/accessibility/VisuallyHidden";

export { FocusScope } from "./components/accessibility/FocusScope";
export type { FocusScopeProps } from "./components/accessibility/FocusScope";

export { FocusTrap } from "./components/accessibility/FocusTrap";
export type { FocusTrapProps } from "./components/accessibility/FocusTrap";

export { Spacer } from "./components/layout/Spacer";
export type { SpacerProps } from "./components/layout/Spacer";

export { Stack } from "./components/layout/Stack";
export type { StackProps } from "./components/layout/Stack";

export { Center } from "./components/layout/Center";
export type { CenterProps } from "./components/layout/Center";

export { AspectRatio } from "./components/layout/AspectRatio";
export type { AspectRatioProps } from "./components/layout/AspectRatio";

import { View, type ViewProps } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColors().background;
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

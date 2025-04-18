import { SafeAreaView, View } from "react-native";

import { useThemeColors } from "@/app/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";

export function ThemedView({ style, ...otherProps }: any) {
  const backgroundColor = useThemeColors().background;

  return (
    <LinearGradient
      colors={["#F7F5EF", "#F1EFE7", "#E6E1D1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[style, { flex: 1 }]}
    >
      <SafeAreaView>
        <View {...otherProps} />
      </SafeAreaView>
    </LinearGradient>
  );
}

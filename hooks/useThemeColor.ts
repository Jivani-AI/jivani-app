/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useThemeColors() {
  const theme = useColorScheme() ?? "light";
  // keeping only light theme for now
  return Colors.light;
  if (theme === "light") {
    return Colors.light;
  } else {
    return Colors.dark;
  }
}

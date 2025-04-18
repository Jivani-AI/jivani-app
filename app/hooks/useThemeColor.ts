/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/app/constants/Colors";
import { useColorScheme } from "@/app/hooks/useColorScheme";

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

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  border: string;
  shadow: string;
  overlay: string;
  cardBackground: string;
  progressBackground: string;
  progressFill: string;
  buttonBackground: string;
  buttonText: string;
  modalBackground: string;
  modalBorder: string;
  micIconStart: string;
  micIconEnd: string;
  micIconStroke: string;
  tabBarBackground: string;
  tabBarShadow: string;
  avatarBorder: string;
  avatarBackground: string;
  quoteText: string;
  quoteAuthor: string;
  heatmapColors: string[];
  quickAddBackground: string;
  quickAddText: string;
  taskBackground: string;
  taskText: string;
  financeCardBackground: string;
  goalsCardBackground: string;
  todosCardBackground: string;
  learningsCardBackground: string;
}

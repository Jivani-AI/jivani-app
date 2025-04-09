// get text in different fonts and font weights
import { Text } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColor";

export enum TextVariants {
  "GROTESK_EXTRA_BOLD" = "GROTESK_EXTRA_BOLD",
  "GROTESK_BOLD" = "GROTESK_BOLD",
  "GROTESK_REGULAR" = "GROTESK_REGULAR",
  "GROTESK_MEDIUM" = "GROTESK_MEDIUM",
  "GROTESK_LIGHT" = "GROTESK_LIGHT",
  "INTER_BOLD" = "INTER_BOLD",
  "INTER_SEMIBOLD" = "INTER_SEMIBOLD",
  "INTER_REGULAR" = "INTER_REGULAR",
  "INTER_MEDIUM" = "INTER_MEDIUM",
  "INTER_LIGHT" = "INTER_LIGHT",
  "INTER_ITALIC" = "INTER_ITALIC",
}

export const CustomText = ({
  variant,
  color = "#000000",
  fontSize = 14,
  ...props
}: {
  variant: TextVariants;
  color?: string;
  fontSize?: number;
} & React.ComponentProps<typeof Text>) => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          color,
          fontSize,
          fontFamily:
            variant === TextVariants.GROTESK_BOLD
              ? "CabinetGroteskBold"
              : variant === TextVariants.GROTESK_EXTRA_BOLD
              ? "CabinetGroteskExtraBold"
              : variant === TextVariants.GROTESK_REGULAR
              ? "CabinetGrotesk"
              : variant === TextVariants.GROTESK_MEDIUM
              ? "CabinetGroteskMedium"
              : variant === TextVariants.GROTESK_LIGHT
              ? "CabinetGroteskLight"
              : variant === TextVariants.INTER_BOLD
              ? "InterBold"
              : variant === TextVariants.INTER_SEMIBOLD
              ? "InterSemiBold"
              : variant === TextVariants.INTER_REGULAR
              ? "Inter"
              : variant === TextVariants.INTER_MEDIUM
              ? "InterMedium"
              : variant === TextVariants.INTER_LIGHT
              ? "InterLight"
              : variant === TextVariants.INTER_ITALIC
              ? "InterItalic"
              : "Inter",
        },
      ]}
    />
  );
};

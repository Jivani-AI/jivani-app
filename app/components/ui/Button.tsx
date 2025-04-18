import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { CustomText, TextVariants } from "./CustomText";

export const Button = ({
  title,
  onPress,
  textStyles = {},
  containerStyle = {},
}: {
  title: string;
  onPress: () => void;
  textStyles?: any;
  containerStyle?: ViewStyle;
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, containerStyle]}>
      <CustomText
        style={textStyles}
        color={"#F1EFE7"}
        fontSize={16}
        variant={TextVariants.GROTESK_BOLD}
      >
        {title}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#342B20",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.8,
  },
});

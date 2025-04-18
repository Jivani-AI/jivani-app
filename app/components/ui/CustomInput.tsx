import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../hooks/useThemeColor";

export const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  style = {},
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
}) => {
  const themeColors = useThemeColors();

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, { borderColor: themeColors.primary }]}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#000",
  },
});

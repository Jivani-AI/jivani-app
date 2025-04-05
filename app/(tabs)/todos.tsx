import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TodosScreen() {
  return (
    <ThemedView>
      <ThemedText>Todos</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    padding: 16,
  },
  row: {
    flexDirection: "row",
  },
});

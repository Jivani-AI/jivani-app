import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedText>Home</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});

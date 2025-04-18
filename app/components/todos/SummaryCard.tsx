import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CalendarDays,
  Clock,
  ListTodo,
  AlertTriangle,
} from "lucide-react-native";

const icons = {
  Today: <CalendarDays size={16} color="#F1A7A0" />, // Soft pinkish tone
  Scheduled: <Clock size={16} color="#6BBF70" />, // Soft dark green
  All: <ListTodo size={16} color="#6A8DFF" />, // Soft blue-gray
  Overdue: <AlertTriangle size={16} color="#FF5B5B" />, // Strong red for overdue
};

type SummaryCardProps = {
  title: "Today" | "Scheduled" | "All" | "Overdue";
  count: number;
  color: string;
  borderColor: string;
};

const SummaryCard = ({
  title,
  count,
  color,
  borderColor,
}: SummaryCardProps) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: color, borderColor, borderWidth: 0.5 },
      ]}
    >
      <View style={styles.iconWrapper}>{icons[title]}</View>

      <View style={{ marginTop: 8 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{count} tasks</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
  },
  iconWrapper: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    color: "#342B20", // Dark neutral color for title
    fontWeight: "600",
    marginBottom: 4,
  },
  count: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4C483D", // Slightly lighter neutral for count
  },
});

export default SummaryCard;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CircleCheck, XCircle } from "lucide-react-native";
import moment from "moment";
import { CustomText, TextVariants } from "./ui/CustomText";

const today = moment();
const startOfWeek = today.clone().startOf("isoWeek"); // Monday as first day

const weekData = Array.from({ length: 7 }, (_, i) => {
  const date = startOfWeek.clone().add(i, "days");
  return {
    day: date.format("ddd"), // Mon, Tue, etc.
    date: date.format("D"), // 1, 2, etc.
    perfect: [0, 2, 4, 6].includes(i), // Mock perfect days for demo
  };
});

const CalendarStrip = () => {
  const todayIndex = today.isoWeekday() - 1;

  return (
    <View style={styles.container}>
      <View style={styles.stripContainer}>
        <CustomText
          style={styles.title}
          fontSize={16}
          color="#333"
          variant={TextVariants.GROTESK_BOLD}
        >
          Perfect Days
        </CustomText>
        <View style={styles.strip}>
          {weekData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.dayContainer,
                index === todayIndex ? styles.activeDay : styles.inActiveDay,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  index == todayIndex && { color: "#F1EFE7" },
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  index == todayIndex && { color: "#F1EFE7" },
                ]}
              >
                {item.date}
              </Text>
              {item.perfect ? (
                <CircleCheck size={20} color="#32CD32" />
              ) : (
                <XCircle size={20} color="#FF6B6B" />
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    marginBottom: 10,
  },
  stripContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#3A3228",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  strip: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayContainer: {
    alignItems: "center",
    padding: 6,
    flex: 1,
    marginHorizontal: 3,
  },
  dayText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
  },
  dateText: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  activeDay: {
    backgroundColor: "#342B20",
    borderRadius: 12,
  },
  inActiveDay: {
    backgroundColor: "rgba(254, 199, 132, 0.15)",
    borderRadius: 12,
  },
});

export default CalendarStrip;

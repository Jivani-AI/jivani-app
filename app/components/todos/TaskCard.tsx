import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  CheckCircle,
  Trash2,
  Clock,
  Calendar,
  Edit,
} from "lucide-react-native";

interface Props {
  id: number;
  title: string;
  time: string;
  date: string;
  completed: boolean;
  subTasks?: string[];
  description?: string;
  priority?: string;
  onComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskCard = ({
  title,
  time,
  date,
  completed,
  subTasks = [],
  description,
  priority = "Medium",
  onComplete,
  onDelete,
  onEdit,
}: Props) => {
  const priorityColors = {
    High: "#FF5B5B",
    Medium: "#FFAC33",
    Low: "#6BBF70",
  };

  const priorityColor = priorityColors[priority] || "#FFAC33";

  return (
    <Animated.View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <TouchableOpacity
              onPress={onComplete}
              style={styles.checkContainer}
            >
              <CheckCircle
                size={22}
                color={completed ? "#32CD32" : "#C3A77D"}
                strokeWidth={completed ? 3 : 1}
              />
            </TouchableOpacity>
            <Text style={[styles.title, completed && styles.completed]}>
              {title}
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
              <Edit size={20} color="#342B20" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
              <Trash2 size={20} color="#FF5B5B" />
            </TouchableOpacity>
          </View>
        </View>

        {description && <Text style={styles.description}>{description}</Text>}

        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Clock size={14} color="#8E8268" style={styles.infoIcon} />
            <Text style={styles.infoText}>{time}</Text>
          </View>
          <View style={styles.infoItem}>
            <Calendar size={14} color="#8E8268" style={styles.infoIcon} />
            <Text style={styles.infoText}>{date}</Text>
          </View>
          <View
            style={[styles.priorityBadge, { backgroundColor: priorityColor }]}
          >
            <Text style={styles.priorityText}>{priority}</Text>
          </View>
        </View>

        {subTasks.length > 0 && (
          <View style={styles.subTaskContainer}>
            {subTasks.map((item, idx) => (
              <View key={idx} style={styles.subTaskRow}>
                <View style={styles.subTaskDot} />
                <Text style={styles.subTask}>{item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFDF7",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#3A3228",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkContainer: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#342B20",
    flex: 1,
    fontFamily: "CabinetGroteskBold",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#A7A7A7",
  },
  description: {
    fontFamily: "CabinetGrotesk",
    fontSize: 14,
    color: "#5F5B57",
    lineHeight: 20,
    marginLeft: 34,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
    marginLeft: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 34, // Align with title text
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  infoIcon: {
    marginRight: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#8E8268",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: "auto",
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
  },
  subTaskContainer: {
    marginTop: 12,
    marginLeft: 34, // Align with title text
  },
  subTaskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  subTaskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#7A6B47",
    marginRight: 8,
  },
  subTask: {
    fontSize: 12,
    color: "#7A6B47",
  },
});

export default TaskCard;

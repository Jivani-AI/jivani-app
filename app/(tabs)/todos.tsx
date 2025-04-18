import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  Animated,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import {
  Plus,
  Calendar,
  Clock,
  Flag,
  Edit3,
  X,
  Filter,
} from "lucide-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BlurView } from "expo-blur";
import SummaryCard from "../components/todos/SummaryCard";
import { CustomText, TextVariants } from "../components/ui/CustomText";
import TaskCard from "../components/todos/TaskCard";
import { ThemedView } from "../components/ThemedView";
import { useThemeColors } from "../hooks/useThemeColor";
import useTodoStore from "../store/useTodoStore";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
// Import SummaryCardProps type or define it here
type SummaryCardProps = {
  title: "Today" | "Scheduled" | "All" | "Overdue";
  count: number;
  color: string;
  borderColor: string;
};

// Define Todo interface to fix type errors
interface Todo {
  id: number;
  title: string;
  time: string;
  date: string;
  completed: boolean;
  description?: string;
  priority?: string;
  subtasks?: string[];
}

// For currentTodo, let's define a custom interface to handle date/time fields
interface TodoFormData {
  id: number | null;
  title: string;
  description: string;
  dueDate: Date;
  time: Date;
  priority: string;
  subtasks: string[];
}

const TodosScreen = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodoStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoFormData>({
    id: null,
    title: "",
    description: "",
    dueDate: new Date(),
    time: new Date(),
    priority: "Medium",
    subtasks: [],
  });

  console.log(todos);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  const themeColors = useThemeColors();

  // Animate modal opening/closing
  const animateModal = (visible: boolean) => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
        resetForm();
      });
    }
  };

  const handleAddOrUpdateTodo = () => {
    if (currentTodo.title?.trim() === "") return;

    const newTodo = {
      title: currentTodo.title || "",
      time: currentTodo.time.toLocaleTimeString(),
      date: currentTodo.dueDate.toLocaleDateString(),
      description: currentTodo.description,
      priority: currentTodo.priority,
      completed: false,
      subtasks: currentTodo.subtasks || [],
    };

    if (isEditing && currentTodo.id) {
      updateTodo(currentTodo.id, newTodo);
    } else {
      addTodo(newTodo);
    }

    animateModal(false);
  };

  const resetForm = () => {
    setCurrentTodo({
      id: null,
      title: "",
      description: "",
      dueDate: new Date(),
      time: new Date(),
      priority: "Medium",
      subtasks: [],
    });
    setIsEditing(false);
  };

  const handleEditTodo = (todo: Todo) => {
    // Convert date and time strings to Date objects
    const todoDate = new Date();
    const todoParts = todo.date.split("/");
    if (todoParts.length === 3) {
      todoDate.setMonth(parseInt(todoParts[0]) - 1);
      todoDate.setDate(parseInt(todoParts[1]));
      todoDate.setFullYear(parseInt(todoParts[2]));
    }

    const todoTime = new Date();
    const timeParts = todo.time.split(":");
    if (timeParts.length >= 2) {
      todoTime.setHours(parseInt(timeParts[0]));
      todoTime.setMinutes(parseInt(timeParts[1]));
    }

    setCurrentTodo({
      id: todo.id,
      title: todo.title,
      description: todo.description || "",
      dueDate: todoDate,
      time: todoTime,
      priority: todo.priority || "Medium",
      subtasks: todo.subtasks || [],
    });
    setIsEditing(true);
    animateModal(true);
  };

  const showDatePicker = () => {
    // We're having z-index issues, let's delay the showing of the date picker
    // to ensure the modal structure is correctly rendered
    // setTimeout(() => {
    setDatePickerVisibility(true);
    // }, 100);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);

    // Restore modal opacity
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleConfirmDate = (date: Date) => {
    setCurrentTodo({ ...currentTodo, dueDate: date });
    hideDatePicker();
  };

  const showTimePicker = () => {
    // Same timeout approach for time picker
    setTimeout(() => {
      setTimePickerVisibility(true);
    }, 100);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);

    // Restore modal opacity
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleConfirmTime = (time: Date) => {
    setCurrentTodo({ ...currentTodo, time: time });
    hideTimePicker();
  };

  // Ensure summaryData has the correct title types
  const summaryData: SummaryCardProps[] = [
    {
      title: "Today",
      count: todos.filter(
        (todo: Todo) => todo.date === new Date().toLocaleDateString()
      ).length,
      color: "#FCE8E6",
      borderColor: "#F1C1B3",
    },
    {
      title: "Scheduled",
      count: todos.filter(
        (todo: Todo) => new Date(todo.date).getTime() > new Date().getTime()
      ).length,
      color: "#E4F7EC",
      borderColor: "#A6E1C9",
    },
    {
      title: "All",
      count: todos.length,
      color: "#E3F2FD",
      borderColor: "#A7CFF9",
    },
    {
      title: "Overdue",
      count: todos.filter(
        (todo: Todo) =>
          new Date(todo.date).getTime() < new Date().getTime() &&
          !todo.completed
      ).length,
      color: "#FFF3D9",
      borderColor: "#F2D49A",
    },
  ];

  const priorityOptions = ["High", "Medium", "Low"];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  console.log(isDatePickerVisible);

  return (
    <>
      {/* Date and Time pickers at root level */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        date={currentTodo.dueDate}
        pickerContainerStyleIOS={{ zIndex: 9999 }}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
        date={currentTodo.time}
      />
      <LinearGradient
        colors={["#F7F5EF", "#F1EFE7", "#E6E1D1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.header}>
                <CustomText
                  fontSize={24}
                  color={themeColors.primary}
                  variant={TextVariants.GROTESK_BOLD}
                  style={styles.headerText}
                >
                  My Tasks
                </CustomText>
                <TouchableOpacity style={styles.filterButton}>
                  <Filter size={20} color="#342B20" />
                </TouchableOpacity>
              </View>

              {/* Summary Cards */}
              <View style={styles.summaryGrid}>
                {summaryData.map((item, index) => (
                  <View key={index} style={styles.summaryGridItem}>
                    <SummaryCard key={index} {...item} />
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  paddingHorizontal: 8,
                }}
              >
                <CustomText
                  fontSize={18}
                  color="#342B20"
                  variant={TextVariants.GROTESK_BOLD}
                  style={styles.sectionTitle}
                >
                  Today's Tasks
                </CustomText>
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => animateModal(true)}
                >
                  <Plus size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              {/* Task List - use todos directly instead of filteredTodos */}
              {todos.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    No tasks yet. Add some!
                  </Text>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.taskList}>
                    {todos.map((task: Todo) => (
                      <TaskCard
                        key={task.id}
                        {...task}
                        onComplete={() =>
                          updateTodo(task.id, { completed: !task.completed })
                        }
                        onDelete={() => deleteTodo(task.id)}
                        onEdit={() => handleEditTodo(task)}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}

              {/* Floating Action Button */}
              {/* <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => animateModal(true)}
              >
                <Plus size={24} color="#FFFFFF" />
              </TouchableOpacity> */}

              {/* Modal for Adding/Editing Todos */}
              <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => animateModal(false)}
                style={{
                  zIndex: 10,
                }}
              >
                <Pressable
                  style={styles.modalOverlay}
                  onPress={() => animateModal(false)}
                >
                  <BlurView intensity={10} style={StyleSheet.absoluteFill} />
                  <Animated.View
                    style={[
                      styles.modalContainer,
                      {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                      },
                    ]}
                  >
                    <Pressable onPress={() => {}} style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                          {isEditing ? "Edit Task" : "New Task"}
                        </Text>
                        <TouchableOpacity
                          onPress={() => animateModal(false)}
                          style={styles.closeButton}
                        >
                          <X size={20} color="#342B20" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.formSection}>
                        <Text style={styles.formLabel}>Title</Text>
                        <View style={styles.inputRow}>
                          <Edit3
                            size={18}
                            color="#8E8268"
                            style={styles.inputIcon}
                          />
                          <TextInput
                            style={styles.input}
                            placeholder="Task title"
                            placeholderTextColor="#AAAAAA"
                            value={currentTodo.title}
                            onChangeText={(text) =>
                              setCurrentTodo({ ...currentTodo, title: text })
                            }
                          />
                        </View>
                      </View>

                      <View style={styles.formSection}>
                        <Text style={styles.formLabel}>Description</Text>
                        <View style={styles.inputRow}>
                          <TextInput
                            style={styles.input}
                            placeholder="Add description..."
                            placeholderTextColor="#AAAAAA"
                            // multiline
                            numberOfLines={1}
                            value={currentTodo.description}
                            onChangeText={(text) =>
                              setCurrentTodo({
                                ...currentTodo,
                                description: text,
                              })
                            }
                          />
                        </View>
                      </View>

                      <View style={styles.formRow}>
                        <View style={[styles.formSection, styles.halfWidth]}>
                          <Text style={styles.formLabel}>Due Date</Text>
                          <TouchableOpacity
                            onPress={showDatePicker}
                            style={styles.datePickerButton}
                          >
                            <Calendar
                              size={18}
                              color="#8E8268"
                              style={styles.inputIcon}
                            />
                            <Text style={styles.dateText}>
                              {formatDate(currentTodo.dueDate)}
                            </Text>
                          </TouchableOpacity>

                          {isDatePickerVisible && (
                            <DateTimePicker
                              value={currentTodo.dueDate}
                              mode="date"
                              display="calendar"
                              onChange={(event, selectedDate) => {
                                // setDatePickerVisibility(false);
                                if (selectedDate)
                                  handleConfirmDate(selectedDate);
                              }}
                              style={{
                                backgroundColor: "red",
                              }}
                            />
                          )}
                        </View>

                        <View style={[styles.formSection, styles.halfWidth]}>
                          <Text style={styles.formLabel}>Time</Text>
                          <TouchableOpacity
                            onPress={showTimePicker}
                            style={styles.datePickerButton}
                          >
                            <Clock
                              size={18}
                              color="#8E8268"
                              style={styles.inputIcon}
                            />
                            <Text style={styles.dateText}>
                              {formatTime(currentTodo.time)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.formSection}>
                        <Text style={styles.formLabel}>Priority</Text>
                        <View style={styles.prioritySelector}>
                          {priorityOptions.map((option) => (
                            <TouchableOpacity
                              key={option}
                              style={[
                                styles.priorityOption,
                                currentTodo.priority === option &&
                                  styles.prioritySelected,
                                currentTodo.priority === option && {
                                  backgroundColor:
                                    option === "High"
                                      ? "#FFECEC"
                                      : option === "Medium"
                                      ? "#FFF5E6"
                                      : "#EFF8F1",
                                  borderColor:
                                    option === "High"
                                      ? "#FFB0B0"
                                      : option === "Medium"
                                      ? "#FFCF90"
                                      : "#A6E1C9",
                                },
                              ]}
                              onPress={() =>
                                setCurrentTodo({
                                  ...currentTodo,
                                  priority: option,
                                })
                              }
                            >
                              <Text
                                style={[
                                  styles.priorityText,
                                  currentTodo.priority === option && {
                                    color:
                                      option === "High"
                                        ? "#FF5B5B"
                                        : option === "Medium"
                                        ? "#FFAC33"
                                        : "#6BBF70",
                                    fontWeight: "600",
                                  },
                                ]}
                              >
                                {option}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={() => animateModal(false)}
                        >
                          <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.saveButton}
                          onPress={handleAddOrUpdateTodo}
                        >
                          <Text style={styles.saveButtonText}>
                            {isEditing ? "Update" : "Save"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Pressable>
                  </Animated.View>
                </Pressable>
              </Modal>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 28,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
  },
  summaryGridItem: {
    width: "48%",
    marginBottom: 16,
    alignSelf: "stretch",
  },
  sectionTitle: {
    // marginTop: 16,
    // marginBottom: 8,
    marginRight: 8,
  },
  taskList: {
    paddingTop: 8,
    paddingBottom: 100, // Extra space for FAB
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#8E8268",
    textAlign: "center",
  },
  floatingButton: {
    backgroundColor: "#342B20",
    width: 32,
    height: 32,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#342B20",
  },
  closeButton: {
    padding: 4,
  },
  formSection: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#342B20",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#342B20",
  },
  textAreaContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
  },
  textArea: {
    fontSize: 14,
    color: "#342B20",
    textAlignVertical: "top",
    minHeight: 80,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#342B20",
  },
  prioritySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityOption: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  prioritySelected: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  priorityText: {
    fontSize: 14,
    color: "#8E8268",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8E8268",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#342B20",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  card: {
    width: "100%",
  },
});

export default TodosScreen;

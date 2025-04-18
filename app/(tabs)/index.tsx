import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { ThemeColors, useThemeColors } from "@/app/hooks/useThemeColor";
import { ThemedView } from "../components/ThemedView";
import { LineChart } from "react-native-chart-kit";
import { CustomText, TextVariants } from "../components/ui/CustomText";
import {
  PiggyBank,
  Target,
  CheckSquare,
  BookOpenCheck,
} from "lucide-react-native";
import WeekCalendarStrip from "../components/CalenderStrips";
import { HelloWave } from "../components/HelloWave";
import Male from "../assets/images/male.png";
import Female from "../assets/images/female.png";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const themeColors: ThemeColors = useThemeColors();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const rotate = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "20deg"],
  });

  const StatCard = ({ title, value, subtext, Icon, bgColor, progress }) => (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Icon color={themeColors.primary} size={24} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.subtext}>{subtext}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    inner: {
      padding: 16,
      paddingBottom: 100,
    },
    greetingContainer: {
      // marginBottom: 16,
    },
    greetingTextWrapper: {
      backgroundColor: themeColors.background,
      padding: 20,
      borderRadius: 18,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    greetingTitle: {
      marginBottom: 4,
    },
    greetingRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    greetingName: {
      marginRight: 8,
    },
    emojiWave: {
      fontSize: 26,
      marginLeft: 6,
    },
    greetingSub: {
      marginTop: 6,
    },
    sectionHeader: {
      fontSize: 22,
      fontWeight: "bold",
      color: themeColors.primary,
      marginVertical: 12,
    },
    cardStrip: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 12,
    },
    calendarDay: {
      padding: 10,
      borderRadius: 12,
      backgroundColor: themeColors.cardBackground,
      flex: 1,
      marginHorizontal: 4,
      alignItems: "center",
    },
    activeDay: {
      backgroundColor: themeColors.accent,
    },
    calendarDayText: {
      color: themeColors.primary,
      fontWeight: "600",
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 12,
    },
    statsCard: {
      padding: 16,
      borderRadius: 16,
      width: screenWidth / 3.3,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      alignItems: "center",
    },
    statsIcon: {
      fontSize: 22,
      marginBottom: 6,
    },
    statsTitle: {
      color: themeColors.primary,
      fontWeight: "600",
      marginBottom: 4,
      fontSize: 14,
    },
    statsValue: {
      fontSize: 20,
      fontWeight: "bold",
      color: themeColors.primary,
    },
    statsSubtext: {
      fontSize: 12,
      color: themeColors.textSecondary,
      marginTop: 4,
    },

    chartContainer: {
      marginVertical: 16,
      backgroundColor: themeColors.cardBackground,
      borderRadius: 16,
      padding: 12,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },

    dummyChart: {
      height: 140,
      backgroundColor: themeColors.cardBackground,
      borderRadius: 12,
    },
    taskItem: {
      padding: 10,
      backgroundColor: themeColors.background,
      borderRadius: 10,
      marginVertical: 4,
    },
    taskText: {
      color: themeColors.primary,
    },
    heatmapContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginVertical: 12,
    },
    heatmapBlock: {
      width: 22,
      height: 22,
      borderRadius: 4,
    },
    quickAddRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 12,
    },
    quickAddButton: {
      backgroundColor: themeColors.quickAddBackground,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 10,
    },
    quickAddText: {
      color: themeColors.primary,
      fontWeight: "600",
    },
    quoteCard: {
      marginTop: 20,
      backgroundColor: themeColors.cardBackground,
      padding: 16,
      borderRadius: 16,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    quoteText: {
      fontStyle: "italic",
      color: themeColors.secondary,
      marginBottom: 8,
      fontSize: 16,
      textAlign: "center",
    },
    quoteAuthor: {
      color: themeColors.primary,
      fontWeight: "bold",
      textAlign: "right",
    },
    cardGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 12,
      padding: 8,
    },
    card: {
      width: "48%",
      borderRadius: 16,
      padding: 16,
      borderWidth: 0.5,
      borderColor: themeColors.border,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
    },
    title: {
      fontSize: 14,
      fontWeight: "600",
      marginTop: 8,
      color: themeColors.primary,
    },
    value: {
      fontSize: 20,
      fontWeight: "700",
      marginTop: 4,
      color: themeColors.primary,
    },
    subtext: {
      fontSize: 12,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    progressBar: {
      height: 6,
      backgroundColor: themeColors.progressBackground,
      borderRadius: 3,
      marginTop: 10,
    },
    progressFill: {
      height: 6,
      backgroundColor: themeColors.primary,
      borderRadius: 3,
    },
    avatarWrapper: {
      backgroundColor: themeColors.background,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: themeColors.quickAddBackground,
      padding: 3,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
  });

  return (
    <ThemedView>
      <ScrollView
        contentContainerStyle={styles.inner}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Block */}
        <Animated.View
          style={[styles.greetingContainer, { opacity: fadeAnim }]}
        >
          <View style={styles.greetingTextWrapper}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <CustomText
                  style={styles.greetingTitle}
                  fontSize={22}
                  color={themeColors.secondary}
                  variant={TextVariants.GROTESK_MEDIUM}
                >
                  Good Morning,
                </CustomText>
                <View style={styles.greetingRow}>
                  <CustomText
                    style={styles.greetingName}
                    fontSize={28}
                    color={themeColors.primary}
                    variant={TextVariants.GROTESK_BOLD}
                  >
                    Chaitravi
                  </CustomText>
                  <HelloWave />
                </View>
              </View>
              <View style={styles.avatarWrapper}>
                <Image
                  source={Female}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                  }}
                />
              </View>
            </View>
            <CustomText
              style={styles.greetingSub}
              fontSize={14}
              color={themeColors.textAccent}
              variant={TextVariants.INTER_ITALIC}
            >
              It's a fresh new day to grow and glow 🌞
            </CustomText>
          </View>
        </Animated.View>

        {/* Calendar Strip */}
        <WeekCalendarStrip onDayPress={(date) => console.log(date)} />
        <View
          style={{
            height: 16,
          }}
        />
        {/* Stats Cards */}
        <View style={styles.cardGrid}>
          <StatCard
            title="Finance"
            value="₹1,250"
            subtext="Spent: ₹750 / ₹2,000"
            Icon={PiggyBank}
            bgColor={themeColors.financeCardBackground}
            progress={37.5}
          />
          <StatCard
            title="Goals"
            value="5 / 8"
            subtext="Most active: Health"
            Icon={Target}
            bgColor={themeColors.goalsCardBackground}
            progress={62.5}
          />
          <StatCard
            title="Todos"
            value="3 Today"
            subtext="2 Done"
            Icon={CheckSquare}
            bgColor={themeColors.todosCardBackground}
            progress={66}
          />
          <StatCard
            title="Learnings"
            value="4 Topics"
            subtext="This week"
            Icon={BookOpenCheck}
            bgColor={themeColors.learningsCardBackground}
            progress={80}
          />
        </View>
        {/* Charts & Graphs */}
        <View style={styles.chartContainer}>
          <CustomText
            style={styles.sectionHeader}
            fontSize={20}
            color={themeColors.primary}
            variant={TextVariants.GROTESK_BOLD}
          >
            Progress Graph
          </CustomText>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: [30, 50, 40, 65, 70, 60, 80],
                  strokeWidth: 3,
                },
              ],
            }}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              backgroundGradientFrom: themeColors.cardBackground,
              backgroundGradientTo: themeColors.background,
              decimalPlaces: 0,
              color: (opacity = 1) =>
                `rgba(${themeColors.primary}, ${opacity})`,
              labelColor: () => themeColors.secondary,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: themeColors.accent,
              },
            }}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        </View>

        {/* Today's Tasks */}
        <Text style={styles.sectionHeader}>Today's Tasks</Text>
        {["Write journal", "10-min meditation", "Review goals"].map(
          (task, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskText}>• {task}</Text>
            </View>
          )
        )}

        {/* Upcoming Tasks */}
        <Text style={styles.sectionHeader}>Upcoming Tasks</Text>
        {["Workout", "Call family", "Read book"].map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskText}>• {task}</Text>
          </View>
        ))}

        {/* Mood Map */}
        <Text style={styles.sectionHeader}>Jivani Mood Map</Text>
        <View style={styles.heatmapContainer}>
          {Array.from({ length: 28 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.heatmapBlock,
                {
                  backgroundColor: ["#D1CBB2", "#EACDA3", "#FFD6C0", "#BFAF8C"][
                    i % 4
                  ],
                },
              ]}
            />
          ))}
        </View>

        {/* Quick Add Flow */}
        <Text style={styles.sectionHeader}>Quick Add</Text>
        <View style={styles.quickAddRow}>
          {["+ Todo", "+ Goal", "+ Expense"].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.quickAddButton}>
              <Text style={styles.quickAddText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quote of the Day */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            "Discipline is choosing between what you want now and what you want
            most."
          </Text>
          <Text style={styles.quoteAuthor}>— Abraham Lincoln</Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

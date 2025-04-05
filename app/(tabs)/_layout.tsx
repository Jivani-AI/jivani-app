import { HapticTab } from "@/components/HapticTab";
import TabBar from "@/components/TabBar";
import { useThemeColors } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Mic from "../../assets/icons/mic.svg";

export default function TabLayout() {
  const { primary, secondary } = useThemeColors();

  return (
    <Tabs
      tabBar={(props) => (
        <View style={styles.bottomContainer}>
          <TabBar {...props} />
          <View style={styles.w12} />
          <HapticTab>
            <LinearGradient
              colors={[primary, secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.micIcon}
            >
              <Mic width={25} height={25} stroke="black" />
            </LinearGradient>
          </HapticTab>
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals",
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: "Finance",
        }}
      />
      {/* <Tabs.Screen
        name="more"
        options={{
          title: "More",
        }}
      /> */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 25,
    paddingHorizontal: 16,
  },
  w12: { width: 12 },
  micIcon: {
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Home from "../assets/icons/home.svg";
import Finance from "../assets/icons/finance.svg";
import Goals from "../assets/icons/goals.svg";
import More from "../assets/icons/more.svg";
import Todos from "../assets/icons/todos.svg";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { COLORS } from "@/app/constants/Colors";

const getTabIcon = (routeName: string, isActive: boolean) => {
  const iconColor = isActive ? "black" : "white";
  switch (routeName) {
    case "Home":
      return <Home width={24} height={24} stroke={iconColor} />;
    case "Finance":
      return <Finance width={24} height={24} stroke={iconColor} />;
    case "Goals":
      return <Goals width={24} height={24} stroke={iconColor} />;
    case "Todos":
      return <Todos width={24} height={24} stroke={iconColor} />;
    case "More":
      return <More width={24} height={24} stroke={iconColor} />;
  }
};

const TabBarButton = (props) => {
  const { isFocused, label, routeName } = props;
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.25]);
    const top = interpolate(scale.value, [0, 0], [0, 0]);

    return {
      // styles
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      // styles
      opacity,
    };
  });
  return (
    <Pressable {...props} style={styles.container}>
      <View style={isFocused ? styles.activeTab : styles.inActiveTab}>
        <Animated.View style={[animatedIconStyle]}>
          {getTabIcon(label, isFocused)}
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  activeTab: {
    height: 58,
    width: 58,
    borderRadius: 30,
    backgroundColor: COLORS.lightBrown,
    justifyContent: "center",
    alignItems: "center",
  },
  inActiveTab: {
    height: 58,
    width: 58,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
  },
});

export default TabBarButton;

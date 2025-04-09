import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const VoiceWaveform = ({ isListening = false }) => {
  const animatedValues = useRef(
    Array.from({ length: 10 }, () => new Animated.Value(0))
  ).current;

  const animate = () => {
    animatedValues.forEach((val, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: 1,
            duration: 300 + index * 50,
            useNativeDriver: false,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 300 + index * 50,
            useNativeDriver: false,
          }),
        ])
      ).start();
    });
  };

  useEffect(() => {
    if (isListening) {
      animate();
    } else {
      animatedValues.forEach((val) => {
        val.stopAnimation();
        val.setValue(0);
      });
    }
  }, [isListening]);

  return (
    <View style={styles.container}>
      {animatedValues.map((val, index) => {
        const barHeight = val.interpolate({
          inputRange: [0, 1.2],
          outputRange: [8, 56], // central growth
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                height: barHeight,
                backgroundColor: index % 2 === 0 ? "#BFA67A" : "#4E403F",
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    width: 4,
    marginHorizontal: 4,
    borderRadius: 3,
  },
});

export default VoiceWaveform;

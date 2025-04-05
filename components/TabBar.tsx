import { View, StyleSheet } from "react-native";
import React from "react";
import TabBarButton from "./TabButton";
import { COLORS } from "@/constants/Colors";

const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={{ ...styles.tabbar }}>
      {state.routes.map(
        (
          route: { key: string | number; name: string; params: any },
          index: any
        ) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          if (["_sitemap", "+not-found"].includes(route.name)) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              isFocused={isFocused}
              routeName={route.name}
              label={label}
            />
          );
        }
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.black,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 36,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});

export default TabBar;

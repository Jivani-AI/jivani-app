import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import "react-native-reanimated";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import AuthScreen from "./screens/AuthScreen";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { user } = useAuth();
  console.log("User in layout", user);

  return (
    <SafeAreaProvider>
      {user ? (
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Toast />
        </Stack>
      ) : (
        <>
          <AuthScreen />
          <Toast />
        </>
      )}
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    CabinetGrotesk: require("./assets/fonts/CabinetGrotesk-Regular.otf"),
    CabinetGroteskBold: require("./assets/fonts/CabinetGrotesk-Bold.otf"),
    CabinetGroteskExtraBold: require("./assets/fonts/CabinetGrotesk-Extrabold.otf"),
    CabinetGroteskMedium: require("./assets/fonts/CabinetGrotesk-Medium.otf"),
    CabinetGroteskLight: require("./assets/fonts/CabinetGrotesk-Light.otf"),
    Inter: require("./assets/fonts/Inter-Regular.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterItalic: require("./assets/fonts/Inter-Italic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AppLayout />
      </View>
    </AuthProvider>
  );
}

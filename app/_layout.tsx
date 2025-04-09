import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    CabinetGrotesk: require("../assets/fonts/CabinetGrotesk-Regular.otf"),
    CabinetGroteskBold: require("../assets/fonts/CabinetGrotesk-Bold.otf"),
    CabinetGroteskExtraBold: require("../assets/fonts/CabinetGrotesk-Extrabold.otf"),
    CabinetGroteskMedium: require("../assets/fonts/CabinetGrotesk-Medium.otf"),
    CabinetGroteskLight: require("../assets/fonts/CabinetGrotesk-Light.otf"),
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    InterLight: require("../assets/fonts/Inter-Light.ttf"),
    InterItalic: require("../assets/fonts/Inter-Italic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={Lightt}>
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
    // <StatusBar style="auto" />
    // </ThemeProvider>
  );
}

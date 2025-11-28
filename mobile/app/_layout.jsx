import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Slot } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { checkAuth, user, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  //handle navigation based on auth state

  useEffect(() => {
    if (segments.length === 0) return;

    const isAuthScreen = segments[0] === "(auth)";
    const isSigned = user && token;

    if (!isSigned && !isAuthScreen) router.replace("/(auth)");
    else if (isSigned && isAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments]);
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

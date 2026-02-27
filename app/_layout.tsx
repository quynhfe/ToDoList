import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";

export const unstable_settings = {
  anchor: "(tabs)"
};

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0
      );
    `);
  } catch (error) {}
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        const inTabsGroup = segments[0] === "(tabs)";

        if (isLoggedIn === "true" && !inTabsGroup) {
          router.replace("/(tabs)" as any);
        } else if (isLoggedIn !== "true" && inTabsGroup) {
          router.replace("/login" as any);
        }
      } finally {
        setIsReady(true);
      }
    };
    checkAuth();
  }, [segments]);

  if (!isReady) return null;

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#101c22" },
        headerShown: false
      }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="todos.db"
      onInit={migrateDbIfNeeded}>
      <RootLayoutNav />
      <StatusBar style="light" />
    </SQLiteProvider>
  );
}

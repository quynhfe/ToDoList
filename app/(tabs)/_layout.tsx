import { Tabs } from "expo-router";
import { House } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#13a4ec",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#101c22",
          borderTopWidth: 1,
          borderTopColor: "#233c48"
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center w-full h-full">
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -7,
                    left: -6,
                    width: 40,
                    height: 2,
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    backgroundColor: "#13a4ec"
                  }}
                />
              )}
              <House
                size={28}
                color={color}
              />
            </View>
          )
        }}
      />
    </Tabs>
  );
}

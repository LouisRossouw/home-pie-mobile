import React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/lib/constants";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const constColor = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerTitle: "Home Pie",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="motion" color={color} size={16} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          headerTitle: "Settings",
          tabBarShowLabel: false,

          headerStyle: {
            backgroundColor: constColor.background,
          },
          headerTitleStyle: { color: constColor.text, fontSize: 16 },
          tabBarStyle: { backgroundColor: constColor.background },

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={16}
            />
          ),
        }}
      />
    </Tabs>
  );
}

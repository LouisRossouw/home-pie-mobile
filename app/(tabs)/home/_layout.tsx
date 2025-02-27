import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeRoute from "./home-route";

import { View } from "react-native";
import { Home } from "lucide-react-native";

import { Text } from "~/components/ui/text";

const Tabs = createMaterialTopTabNavigator();

export default function TabLayout() {
  const isAuth = true; // temp
  //   const { isDarkColorScheme } = useColorScheme();

  if (!isAuth)
    return (
      <View className="flex-1 w-full h-full items-center justify-center">
        <Text>Loading..</Text>
      </View>
    );

  return (
    <>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: true,
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: 10 },
          tabBarItemStyle: {
            width: 100,
            height: 35,
            // backgroundColor: "rgba(2, 6, 23, 0.5)",
          },
        })}
      >
        <Tabs.Screen
          name={"houme-route"}
          options={{
            title: "Home",
            tabBarShowLabel: false,
            tabBarIcon: () => <Home color={"gray"} size={14} />,
          }}
          component={HomeRoute}
        />
      </Tabs.Navigator>
    </>
  );
}

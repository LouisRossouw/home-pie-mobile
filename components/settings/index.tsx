import { router } from "expo-router";
import { User } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "~/components//ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";

export function SettingsScreen() {
  const isAuth = false;

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="">
        <Text>Settings Screen</Text>
      </View>
      <View className="flex-2 items-center justify-center h-20 w-20">
        <ThemeToggle />
      </View>

      {isAuth ? (
        <Button
          variant={"default"}
          className="w-full"
          onPress={() => console.log("todo")}
        >
          <Text>Logout</Text>
        </Button>
      ) : (
        <Button
          variant={"outline"}
          className="flex-2 w-full items-center justify-center"
          onPress={() => router.push("/(auth)/login")}
        >
          <View className="flex-row gap-2">
            <User className="" size={20} color={"gray"} />
            <Text>Login</Text>
          </View>
        </Button>
      )}
    </View>
  );
}

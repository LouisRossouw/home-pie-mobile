import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useMutation } from "@tanstack/react-query";

import { getAsyncItem, saveAsyncItem } from "~/utils/storage";

import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
// import { useLocalNotifications } from "~/lib/hooks/use-notifications";
import { addSeconds } from "date-fns";

export default function DebugScreen() {
  // const {
  //   scheduleIntervalNotification,
  //   scheduleNotificationByDate,
  //   cancelAllNotifications,
  // } = useLocalNotifications();

  const [output, setOutput] = useState();

  const { mutateAsync: sendFeedback, isPending } = useMutation({
    mutationKey: ["get-stats"],
    mutationFn: PingServer,
    onSuccess: (data: any) => {
      setOutput(data);
    },
    onError: (err) => {
      console.error("error:", err.message);
    },
  });

  async function getAsyncKey(key: string) {
    const keyStr = await getAsyncItem(key);
    setOutput(keyStr ? JSON.parse(keyStr) : "null");
  }

  async function setNotificationByDateTest() {
    const futureTime = addSeconds(new Date(), 10);
    // scheduleNotificationByDate({
    //   title: "Test notification",
    //   date: futureTime,
    //   body: `Optional body`,
    // });
  }

  const isAuth = true; // TODO: Remove hard code
  const isStaff = true; // TODO: Remove hard code

  if (!isAuth || !isStaff) {
    return (
      <View className="flex w-full h-full justify-center items-center">
        <Text className="text-white">Not Auth</Text>
      </View>
    );
  }

  return (
    <>
      <View className="p-4 gap-4">
        <View className="flex-2 p-4 border rounded-md border-TPSBorder">
          <InfoRow label="isAuth" value={String(isAuth)} />
          <InfoRow label="isStaff" value={String(isStaff)} />

          {/* <InfoRow label="appEnv" value={APP_ENV} />
          <InfoRow label="webEnv" value={WEB_ENV} />

          <InfoRow label="webSiteURL" value={webSiteURL} />
          <InfoRow label="BaseUrl" value={baseURL} /> */}
        </View>
      </View>
      <View className="border border-TPSBorder rounded-lg p-4">
        <Text>{JSON.stringify(output, null, 2)}</Text>
      </View>

      <ScrollView>
        <View className="flex-1 w-full h-full gap-4">
          <Button onPress={() => sendFeedback()}>
            {isPending ? <Text>Busy..</Text> : <Text>Ping Server</Text>}
          </Button>

          <View className="w-full justify-center items-center gap-2">
            <Text>User</Text>
            <View className="w-full border rounded-lg border-TPSBorder p-4 gap-4">
              <Button variant={"outline"} onPress={() => console.log("todo")}>
                <Text>Get user session</Text>
              </Button>
              <Button variant={"outline"} onPress={() => console.log("todo")}>
                <Text>Get user profile</Text>
              </Button>
              <Button variant={"outline"} onPress={() => console.log("todo")}>
                <Text>Get my preferences</Text>
              </Button>
              <Button variant={"outline"} onPress={() => console.log("todo")}>
                <Text>Reset preferences</Text>
              </Button>
            </View>
          </View>

          <View className="w-full justify-center items-center gap-2">
            <Text>Notifications / Background</Text>
            <View className="w-full border rounded-lg border-TPSBorder p-4 gap-4">
              <Button variant={"outline"} onPress={setNotificationByDateTest}>
                <Text>Schedule Notification - in 10 seconds</Text>
              </Button>
              <Button variant={"outline"} onPress={() => console.log("todo")}>
                <Text>Notify Now</Text>
              </Button>
              <Button variant={"outline"} onPress={() => console.log("todo")}>
                <Text>Repeat Interval 10 seconds</Text>
              </Button>
              <Button variant={"outline"} onPress={() => console.log("todo")}>
                <Text>Cancel all Notification</Text>
              </Button>
              <Button variant={"outline"} onPress={() => console.log("todo")}>
                <Text>Background Fetcher</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-normal gap-2">
      <Text className="text-txt-dark">{label}:</Text>
      <Text className="text-txt-foreground">{value}</Text>
    </View>
  );
}

async function PingServer() {
  console.log("todo");
}

import { useEffect, useState } from "react";

import { useIsFocused } from "@react-navigation/native";

import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { usePoll } from "~/lib/hooks/use-poll-counter";

export default function HomeRoute() {
  const isAuth = true;

  const tabActive = useIsFocused();

  const poll = usePoll();
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (tabActive) {
      poll.startPolling();
    } else {
      poll.stopPolling();
    }
    return () => poll.stopPolling();
  }, [tabActive, poll.pollCount, poll.isPolling]);

  useEffect(() => {
    poll.pausePolling(2000);
    const timer = setTimeout(() => {
      setBusy(false);
    }, 2000);
    () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 w-full h-full items-center justify-center">
      <Text>TODO {poll.pollCount}</Text>
    </View>
  );
}

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveAsyncItem(key: string, value: string) {
  console.log("Saving  key:", key, value);
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error("* Error accessing AsyncStorage:", error);
    return false;
  }
}

export async function getAsyncItem(key: string) {
  console.log("Getting key:", key);
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error("* Error accessing AsyncStorage:", error);
    return undefined;
  }
}

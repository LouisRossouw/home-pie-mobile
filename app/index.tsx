import { Redirect } from "expo-router";

export default function Screen() {
  console.log("Startup - redirecting");
  return <Redirect href={"(tabs)/home"} />;
}

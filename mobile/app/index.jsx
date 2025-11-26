import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/(auth)/signup"}><Text>Sign Up</Text></Link>
      <Link href={"/(auth)"}><Text>Login</Text></Link>
    </View>
  );
}

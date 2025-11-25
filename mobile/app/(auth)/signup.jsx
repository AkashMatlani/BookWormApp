import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import styles from "../../assets/styles/signup.styles";
export default function SignupScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerTitle}>
            <Text style={styles.title}>BookWorm🐛</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

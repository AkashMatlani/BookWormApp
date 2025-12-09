import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import styles from "../../assets/styles/create.styles";

const CreateScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}></ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import styles from "../../assets/styles/create.styles";

const CreateScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subTitle}>
              Share your favorite reads with others
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

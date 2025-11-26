import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useState } from "react";

export default function SignupScreen() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* UserName Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                ></Ionicons>

                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={COLORS.placeholderText}
                  value={userName}
                  onChangeText={setUserName}
                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>
            {/* Email input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                ></Ionicons>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChange={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                ></TextInput>
              </View>
            </View>
            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                ></Ionicons>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={COLORS.placeholderText}
                  value={Password}
                  onChange={setPassword}
                  secureTextEntry={!showPassword}
                ></TextInput>

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

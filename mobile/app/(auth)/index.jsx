import { useState } from "react";
import { View, Image, Text, TextInput } from "react-native";
import styles from "../../assets/styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      {/* ILLUSTRATION Image */}
      <View style={styles.topIllustration}>
        <Image
          style={styles.illustrainImage}
          source={require("../../assets/images/i.png")}
          resizeMode="containr"
        ></Image>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.formConainer}>
          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}> Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              ></Ionicons>

              <TextInput
                style={styles.input}
                placeholder="Enter Your Email"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              ></TextInput>
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              ></Ionicons>
              {/* Input */}
               <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              ></TextInput>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

import { useState } from "react";
import { View,Image } from "react-native";
import styles from "../../assets/styles/login.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <View style={styles.container}>
        {/* ILLUSTRATION Image */}
        <View style={styles.topIllustration} >
            <Image style={styles.illustrainImage}
             source={require("../../assets/images/i.png")}
             resizeMode="containr"
             ></Image>
        </View>
    </View>
  );
}

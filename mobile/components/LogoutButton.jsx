import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useAuthStore } from "../../mobile/store/authStore";
import profileStyle from "../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const LogoutButton = () => {
  const { logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert("Logout","Are you sure want to Logout?",[
        {text:"Cancel", style:"cancel"},
        {text:"Logout",onPress:()=>logout(),style:"destructiveS"}
    ])
  };
  return (
    <TouchableOpacity style={profileStyle.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={profileStyle.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

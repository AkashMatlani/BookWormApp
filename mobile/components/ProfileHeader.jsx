import { View, Text } from "react-native";
import React from "react";
import { useAuthStore } from "../store/authStore";
import profileStyle from "../assets/styles/profile.styles";
import { Image } from "expo-image";
import { formatMemeberSince } from "../lib/utils";
const ProfileHeader = () => {
  const { user } = useAuthStore();
  if(!user) return null;
  return (
    <View style={profileStyle.profileHeader}>
      <Image
        source={{ uri: user.profileImage }}
        style={profileStyle.profileImage}
      ></Image>

      <View style={profileStyle.profileInfo}>
        <Text style={profileStyle.userName}>{user.userName}</Text>
        <Text style={profileStyle.email}>{user.email}</Text>
        <Text style={profileStyle.memberSince}>
         Joined {user?.createdAt ? formatMemeberSince(user.createdAt) : ""}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

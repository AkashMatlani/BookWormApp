import { View, Text, TouchableOpacity, Alert } from "react-native";
import profileStyle from "../../assets/styles/profile.styles";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
const ProfileTab = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const { token } = useAuthStore();
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resposne = await fetch(`${API_URL}/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resposne.json();
      if (!resposne.ok)
        throw new Error(data.message || "Failed to fetch user books");
      setBooks(data);
    } catch (error) {
      console.error("Error fetching data", error);
      Alert.alert("Error", "Failed to load profile data.pull down to refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={profileStyle.container}>
      <ProfileHeader />
      <LogoutButton />

      {/* Your Recommndations */}
      <View style={profileStyle.bookHeader}>
        <Text style={profileStyle.bookTitle}>Your Recommendation</Text>
        <Text style={profileStyle.booksCount}>{books.length} Books</Text>
      </View>
    </View>
  );
};

export default ProfileTab;

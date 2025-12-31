import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import profileStyle from "../../assets/styles/profile.styles";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
const ProfileTab = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const { token } = useAuthStore();

  const [deleteBookId, setDeleteBookId] = useState(null);

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

  const handleDeleteBook = async (bookId) => {
    try {
      setDeleteBookId(bookId);
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to delete book");
      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert("Success", "Recommendation delete successfully");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to delete recommendation");
    } finally {
      setDeleteBookId(null);
    }
  };
  const confirmDelete = (bookId) => {
    Alert.alert(
      "Delete Recommendation",
      "Are you sure want to delete this recommendation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteBook(bookId),
        },
      ]
    );
  };

  const renderBookItem = ({ item }) => (
    <View style={profileStyle.bookItem}>
      <Image source={item.image} style={profileStyle.bookImage} />
      <View style={profileStyle.bookInfo}>
        <Text style={profileStyle.bookTitle}>{item.title}</Text>
        <View style={profileStyle.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>
        <Text style={profileStyle.bookCaption} numberOfLines={2}>
          {item.caption}
        </Text>
        <Text style={profileStyle.bookDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={profileStyle.deleteButton}
        onPress={() => confirmDelete(item._id)}
      >
        {deleteBookId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Ionicons
            name="trash-outline"
            size={20}
            color={COLORS.primary}
          ></Ionicons>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderRatingStars = (rating) => {
    const starts = [];
    for (let i = 1; i <= 5; i++) {
      starts.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={14}
          style={{ marginRight: 2 }}
          color={i <= rating ? "#fb400" : COLORS.textSecondary}
        ></Ionicons>
      );
    }
    return starts;
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  return (
    <View style={profileStyle.container}>
      <ProfileHeader />
      <LogoutButton />

      {/* Your Recommndations */}
      <View style={profileStyle.bookHeader}>
        <Text style={profileStyle.bookTitle}>Your Recommendation</Text>
        <Text style={profileStyle.booksCount}>{books.length} Books</Text>
      </View>

      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={profileStyle.booksList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};

export default ProfileTab;

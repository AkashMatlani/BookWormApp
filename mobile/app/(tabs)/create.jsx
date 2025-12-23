import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

const CreateScreen = () => {
  const { title, setTitle } = useState("");

  const [rating, setRating] = useState(3);

  const [image, setImage] = useState(null);

  const [base64, setImageBase64] = useState();

  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  const randerRatingPicker = () => {
    const starts = [];
    for (let i = 1; i <= 5; i++) {
      starts.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.startButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#fb400" : COLORS.textSecondary}
          ></Ionicons>
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{starts}</View>;
  };

  const pickImage = async () => {
    try {
      //request permission if needed
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "We need camera roll permission to upload an image"
          );
          return;
        }
      }

      //launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        //if base64
        if (result.assets[0].base64) {
          setImageBase64((await result).assets[0].base64);
        } else {
          //otherwise,convert to base64
          const response = await fetch(result.assets[0].uri);
          const arrayBuffer = await response.arrayBuffer();
          const base64 = Buffer.from(arrayBuffer).toString("base64");

          setImageBase64(base64);
        }
      }
    } catch (error) {
      Alert.alert("Error", "There was a problem selecting your image");
    }
  };

  const hanldeSubmit = async () => {};
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
          {/*  Book Title */}
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                ></Ionicons>

                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChange={setTitle}
                ></TextInput>
              </View>
            </View>
            {/* Rating */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {randerRatingPicker()}
            </View>
            {/* Image */}
            <View style={styles.formGroup}>
              <Text style={styles.label} Book Image></Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.previewImage}
                    onProgress={pickImage}
                  />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons
                      name="image-outline"
                      size={40}
                      color={COLORS.textSecondary}
                    ></Ionicons>
                    <Text style={styles.placeholderText}>
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {/* Caption */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book.."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChange={setCaption}
                multiline
              ></TextInput>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => hanldeSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

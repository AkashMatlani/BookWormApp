import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },

  topIllustration: {
    alignItems: "center",
    width: "100%",
  },

  illustrainImage: {
    width: width * 0.75,
    height: width * 0.75,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginTop: -24,
  },
  formConainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
  },

  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
});

export default styles;

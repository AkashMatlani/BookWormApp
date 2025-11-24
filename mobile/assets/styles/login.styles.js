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
});

export default styles;

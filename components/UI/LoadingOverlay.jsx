import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Text } from "react-native";

const renderMessage = (message, fontSize) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageText, { fontSize: fontSize }]}>
        {message}
      </Text>
    </View>
  );
};

export default function LoadingOverlay({
  message,
  backgroundColor = GlobalStyles.colors.primary,
  color = "white",
  size = "large",
  fontSize,
}) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      {message ? renderMessage(message, fontSize) : ""}
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary,
  },
  messageContainer: {
    margin: 8,
  },
  messageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primaryWhite,
  },
});

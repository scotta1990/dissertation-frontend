import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Text } from "react-native";

const renderMessage = (message) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

export default function LoadingOverlay({ message }) {
  return (
    <View style={styles.container}>
      {message ? renderMessage(message) : ""}
      <ActivityIndicator size="large" color="white" />
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

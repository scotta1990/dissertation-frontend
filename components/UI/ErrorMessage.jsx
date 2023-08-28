import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";

export default function ErrorMessage({
  title,
  message,
  retryFunction = undefined,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <Text style={styles.text}>{message}</Text>
      {retryFunction ? (
        <View style={styles.buttonContainer}>
          <Button
            backgroundColor={GlobalStyles.colors.accent}
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={() => {
              retryFunction();
            }}
          >
            Try again
          </Button>
        </View>
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 10,
  },
  text: {
    textAlign: "left",
    margin: 4,
    color: GlobalStyles.colors.primary,
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  button: {
    width: "50%",
    alignItems: "flex-end",
    margin: 4,
  },
  buttonText: {
    fontSize: 10,
  },
});

import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";

export default function ErrorOverlay({ message, returnTo = undefined }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={styles.text}>{message}</Text>
      {returnTo ? (
        <Button
          backgroundColor={GlobalStyles.colors.accent}
          style={styles.button}
          onPress={() => {
            navigation.replace(returnTo);
          }}
        >
          Try again
        </Button>
      ) : (
        ""
      )}
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
  text: {
    textAlign: "center",
    margin: 8,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    margin: 8,
  },
});

import { Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const FormButton = ({ children, onPress, flat = false, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, flat ? styles.flat : styles.addShadow]}>
          <Text style={[styles.buttonText, flat && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    marginVertical: 5,
    backgroundColor: GlobalStyles.colors.primary,
  },
  addShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  flatText: {
    color: GlobalStyles.colors.primary,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  },
});

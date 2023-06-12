import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const Button = ({
  children,
  icon,
  onPress,
  backgroundColor,
  style,
  textStyle,
}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, { backgroundColor: backgroundColor }]}>
          {icon ? <View style={styles.icon}>{icon}</View> : ""}
          <Text style={[styles.buttonText, textStyle]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    color: GlobalStyles.colors.primaryWhite,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 8,
  },
});

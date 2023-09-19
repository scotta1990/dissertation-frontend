import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";
import { GlobalStyles } from "../../constants/styles";

const MessageBox = ({ messageSubject, messageBody, card=true }) => {
if (!card) {
  return (<View style={styles.messageContainer}>
    <Text style={styles.messageHeaderText}>{messageSubject}</Text>
    <Text>{messageBody}</Text>
  </View>)
}

  return (
    <Card>
      <View style={styles.messageContainer}>
        <Text style={styles.messageHeaderText}>{messageSubject}</Text>
        <Text>{messageBody}</Text>
      </View>
    </Card>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  messageContainer: {
    margin: 8,
    padding: 8,
    justifyContent: "space-around",
  },
  messageHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
    marginBottom: 3,
  },
});

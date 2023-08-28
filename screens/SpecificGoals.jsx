import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";

const SpecificGoals = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { type } = route?.params;

  const onPressHandler = () => {
    navigation.navigate("SpecificGoalManagement", { type: type });
  };

  return (
    <View style={styles.mainContainer}>
      <Text>SpecificGoals</Text>
      <Text>{type}</Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          backgroundColor={GlobalStyles.colors.accent}
          onPress={onPressHandler}
        >
          Add {type} Goal
        </Button>
      </View>
    </View>
  );
};

export default SpecificGoals;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 8,
    justifyContent: "flex-end",
    flex: 1,
  },
  button: {
    margin: 10,
    marginTop: 0,
  },
});

import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import BodyMeasurementsList from "../components/BodyMeasurements/BodyMeasurementsList";
import { GlobalStyles } from "../constants/styles";

const YouSummary = ({ navigation }) => {
  function measurementPressHandler() {
    navigation.navigate("Measurements");
  }

  return <View style={styles.mainContainer}></View>;
};

export default YouSummary;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 16,
    padding: 5,
  },
});

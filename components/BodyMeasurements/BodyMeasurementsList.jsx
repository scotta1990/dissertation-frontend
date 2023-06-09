import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import BodyMeasurementTile from "./BodyMeasurementTile";

const BodyMeasurementsList = () => {
  return (
    <View style={styles.measurementOuterContainer}>
      <BodyMeasurementTile />
    </View>
  );
};

export default BodyMeasurementsList;

const styles = StyleSheet.create({
  measurementOuterContainer: {
    flex: 1,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BodyMeasurementValueBox from "./BodyMeasurementValueBox";
import { GlobalStyles } from "../../constants/styles";

const BodyMeasurementTile = () => {
  return (
    <View style={styles.measurementInnerContainer}>
      <Text style={styles.measurementTitleText}>Body Weight (kg)</Text>

      <View style={styles.measurementContainer}>
        <BodyMeasurementValueBox
          title="Previous"
          value={77}
          metricType={"kg"}
        />
      </View>
    </View>
  );
};

export default BodyMeasurementTile;

const styles = StyleSheet.create({
  measurementInnerContainer: {
    margin: 6,
    padding: 6,
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
  },
  measurementTitleText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  measurementContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

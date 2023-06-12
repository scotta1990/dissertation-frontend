import { StyleSheet, Text, View } from "react-native";
import React from "react";
import YourMeasurementValueBox from "./YourMeasurementValueBox";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const YourMeasurementTile = () => {
  return (
    <View style={styles.measurementContainer}>
      <View style={styles.measurementInnerContainer}>
        <Text style={styles.measurementTitleText}>Body Weight (kg)</Text>
        <Text style={styles.measurementValueText}>77kg</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-down" size={17} />
      </View>
    </View>
  );
};

export default YourMeasurementTile;

const styles = StyleSheet.create({
  measurementContainer: {
    margin: 10,
    paddingHorizontal: 10,
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 8,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  measurementInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  measurementTitleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  measurementValueText: {
    color: GlobalStyles.colors.secondary,
  },
  iconContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

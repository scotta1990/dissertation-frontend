import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const BodyMeasurementValueBox = ({ title, value, metricType }) => {
  return (
    <View style={styles.measurementValueContainer}>
      <View style={styles.measurementValueTitleContainer}>
        <Text style={styles.measurementValueTitleText}>{title}</Text>
      </View>
      <Text style={styles.measurementValueText}>
        {value} {metricType}
      </Text>
    </View>
  );
};

export default BodyMeasurementValueBox;

const styles = StyleSheet.create({
  measurementValueContainer: {
    backgroundColor: GlobalStyles.colors.secondary3 + "70",
    flex: 1,
    margin: 10,
    padding: 5,
    alignItems: "center",
    borderColor: GlobalStyles.colors.primary,
    borderWidth: 0.75,
    borderRadius: 8,
  },
  measurementValueTitleContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: GlobalStyles.colors.primary,
    borderBottomWidth: 0.5,
  },
  measurementValueTitleText: {
    fontSize: 10,
    color: GlobalStyles.colors.primary2,
  },
  measurementValueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
});

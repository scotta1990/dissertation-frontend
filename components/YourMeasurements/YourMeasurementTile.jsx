import { StyleSheet, Text, View } from "react-native";
import React from "react";
import YourMeasurementValueBox from "./YourMeasurementValueBox";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const YourMeasurementTile = ({ measurement }) => {
  return (
    <View style={styles.measurementContainer}>
      <View style={styles.measurementInnerContainer}>
        <View style={styles.measurementTitleTextContainer}>
          <Text
            style={[
              styles.measurementTitleText,
              styles.measurementTitleTextCapitalize,
            ]}
          >
            {measurement.measurementType.name}
          </Text>
          <Text style={styles.measurementTitleText}>
            {" "}
            ({measurement.measurementType.metricType})
          </Text>
        </View>
        <Text style={styles.measurementValueText}>
          {measurement.measurements[0].value}
          {measurement.measurementType.metricType}
        </Text>
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
    margin: 8,
    marginVertical: 13,
    paddingHorizontal: 10,
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 8,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  measurementInnerContainer: {
    marginHorizontal: 12,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  measurementTitleTextContainer: {
    flexDirection: "row",
  },
  measurementTitleText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  measurementTitleTextCapitalize: {
    textTransform: "capitalize",
  },
  measurementValueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.secondary,
  },
  iconContainer: {
    marginTop: -10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

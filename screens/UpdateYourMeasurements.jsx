import { StyleSheet, Text, View } from "react-native";
import React from "react";
import YourMeasurementsList from "../components/YourMeasurements/YourMeasurementsList";
import { combineMeasurementsAndTypes } from "../utils/utils";
import { bodyMeasurementTypes } from "../constants/measurementTypes";
import { GlobalStyles } from "../constants/styles";

const yourMeasurements = [
  {
    measurementTypeId: 2,
    measurements: [
      {
        dateCreated: Date.now(),
        value: 35,
      },
      {
        dateCreated: Date.now() - 5,
        value: 34,
      },
    ],
  },
  {
    measurementTypeId: 8,
    measurements: [
      {
        dateCreated: Date.now(),
        value: 75,
      },
      {
        dateCreated: Date.now() - 5,
        value: 77,
      },
    ],
  },
];

const UpdateYourMeasurements = () => {
  const data = combineMeasurementsAndTypes(
    yourMeasurements,
    bodyMeasurementTypes
  );
  return (
    <View style={styles.mainContainer}>
      <YourMeasurementsList yourMeasurements={data} isUpdatable={true} />
    </View>
  );
};

export default UpdateYourMeasurements;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryWhite,
  },
});

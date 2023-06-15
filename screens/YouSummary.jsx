import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/styles";
import { SafeAreaView } from "react-native";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import YourMeasurementsList from "../components/YourMeasurements/YourMeasurementsList";
import { combineMeasurementsAndTypes } from "../utils/utils";
import { bodyMeasurementTypes } from "../constants/measurementTypes";

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

const YouSummary = ({ navigation }) => {
  function updateButtonPressHandler() {
    navigation.navigate("UpdateYourMeasurements");
  }

  const data = combineMeasurementsAndTypes(
    yourMeasurements,
    bodyMeasurementTypes
  );

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <Card>
        <View style={styles.yourMeasurementsHeaderContainer}>
          <Text style={styles.yourMeasurementsHeaderText}>
            Your Measurements
          </Text>
          <Button
            style={styles.button}
            textStyle={styles.buttonText}
            backgroundColor={GlobalStyles.colors.primary}
            onPress={updateButtonPressHandler}
          >
            Update
          </Button>
        </View>
        <YourMeasurementsList yourMeasurements={data} />
      </Card>
    </SafeAreaView>
  );
};

export default YouSummary;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 8,
    padding: 8,
  },
  yourMeasurementsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 8,
    paddingLeft: 8,
  },
  yourMeasurementsHeaderText: {
    fontWeight: "bold",
  },
  button: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 12,
  },
});

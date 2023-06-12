import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/styles";
import { SafeAreaView } from "react-native";
import Card from "../components/UI/Card";
import YourMeasurementsList from "../components/YourMeasurements/YourMeasurementsList";

const yourMeasurements = [
  {
    measurementType: { name: "waist", metricType: "cm" },
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
    measurementType: { name: "body weight", metricType: "kg" },
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

const YouSummary = () => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <Card>
        <View style={styles.yourMeasurementsHeaderContainer}>
          <Text style={styles.yourMeasurementsHeaderText}>
            Your Measurements
          </Text>
        </View>
        <YourMeasurementsList yourMeasurements={yourMeasurements} />
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
    marginLeft: 8,
    paddingLeft: 8,
  },
  yourMeasurementsHeaderText: {
    fontWeight: "bold",
  },
});

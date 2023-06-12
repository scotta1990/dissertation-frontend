import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import YourMeasurementTile from "./YourMeasurementTile";
import { FlatList } from "react-native";

const renderYourMeasurementItem = ({ item }) => {
  return <YourMeasurementTile measurement={item} />;
};

const YourMeasurementsList = ({ yourMeasurements }) => {
  return (
    <FlatList
      data={yourMeasurements}
      renderItem={renderYourMeasurementItem}
      keyExtractor={(item) => item.measurementType.name}
    />
  );
};

export default YourMeasurementsList;

const styles = StyleSheet.create({});

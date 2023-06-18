import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import YourMeasurementTile from "./YourMeasurementTile";
import { FlatList } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import YourMeasurementUpdateTile from "./YourMeasurementUpdateTile";

const renderYourMeasurementItem = ({ item }) => {
  return <YourMeasurementTile measurement={item} />;
};

const renderUpdatableYourMeasurementItem = ({ item }) => {
  return <YourMeasurementUpdateTile measurement={item} />;
};

const YourMeasurementsList = ({ yourMeasurements, isUpdatable = false }) => {
  if (isUpdatable) {
    return (
      <KeyboardAwareFlatList
        data={yourMeasurements}
        keyExtractor={(item) => item.measurementType.name}
        renderItem={renderUpdatableYourMeasurementItem}
        removeClippedSubviews={false}
      />
    );
  }
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

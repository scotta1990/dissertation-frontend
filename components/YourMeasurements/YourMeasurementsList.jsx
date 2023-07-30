import { StyleSheet, Text, View } from "react-native";
import React from "react";
import YourMeasurementTile from "./YourMeasurementTile";
import { FlatList } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import YourMeasurementUpdateTile from "./YourMeasurementUpdateTile";

const renderYourMeasurementItem = ({ item }) => {
  return <YourMeasurementTile measurement={item} />;
};

const renderUpdatableYourMeasurementItem = ({ item }, setMeasurements) => {
  return (
    <YourMeasurementUpdateTile
      measurement={item}
      setMeasurements={setMeasurements}
    />
  );
};

const YourMeasurementsList = ({
  yourMeasurements,
  isUpdatable = false,
  setMeasurements = undefined,
}) => {
  if (isUpdatable) {
    return (
      <KeyboardAwareFlatList
        data={yourMeasurements}
        keyExtractor={(item) => item.measurementType.name}
        renderItem={(item) =>
          renderUpdatableYourMeasurementItem(item, setMeasurements)
        }
        removeClippedSubviews={false}
      />
    );
  }
  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 20 }}
      data={yourMeasurements}
      renderItem={renderYourMeasurementItem}
      keyExtractor={(item) => item.measurementType.name}
    />
  );
};

export default YourMeasurementsList;

const styles = StyleSheet.create({});

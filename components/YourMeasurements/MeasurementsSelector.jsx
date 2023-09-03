import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FlatList } from "react-native";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { GlobalStyles } from "../../constants/styles";

const MeasurementsSelector = ({ onSelection }) => {
  const renderMeasurementItem = ({ item }) => {
    return (
      <Card>
        <View style={styles.innerContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
          <Button
            backgroundColor={GlobalStyles.colors.accent}
            textStyle={styles.buttonText}
            onPress={() => {
              onSelection(item);
            }}
          >
            Select
          </Button>
        </View>
      </Card>
    );
  };

  const measurementTypes = useSelector(
    (store) => store.yourMeasurements.measurementTypes
  );

  return (
    <FlatList
      data={measurementTypes}
      keyExtractor={(item) => item._id}
      renderItem={renderMeasurementItem}
    />
  );
};

export default MeasurementsSelector;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  buttonText: {
    fontSize: 12,
  },
});

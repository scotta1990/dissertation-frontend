import { StyleSheet, FlatList } from "react-native";
import React, { memo } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const renderBodyPartButton = (item, selectedItem, onSelect) => {
  return (
    <Button
      backgroundColor={
        item === selectedItem
          ? GlobalStyles.colors.accent
          : GlobalStyles.colors.primary
      }
      style={styles.button}
      textStyle={styles.buttonText}
      onPress={() => onSelect(item)}
    >
      {item}
    </Button>
  );
};

const ExerciseBodyPartList = ({ bodyParts, selectedItem, onSelect }) => {
  return (
    <FlatList
      data={bodyParts}
      keyExtractor={(item) => item}
      horizontal={true}
      renderItem={({ item }) =>
        renderBodyPartButton(item, selectedItem, onSelect)
      }
    />
  );
};

export default ExerciseBodyPartList;

const styles = StyleSheet.create({
  button: {
    margin: 3,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 11,
    fontWeight: "normal",
    textAlign: "center",
  },
});

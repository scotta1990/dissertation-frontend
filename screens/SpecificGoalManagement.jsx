import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useState } from "react";
import ExerciseSelector from "../components/Exercise/ExerciseSelector";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import { getGoalByItemId } from "../utils/database/goals";

const SelectorView = ({ children, changeModalVisibility }) => {
  return (
    <View style={styles.selectorViewOuterContainer}>
      <View style={styles.selectorViewMainContainer}>
        <View style={styles.selectorViewHeaderTextContainer}>
          <Text style={styles.selectorViewHeaderText}>
            Select the item you want to add a goal for
          </Text>
        </View>
        {children}
      </View>
      <View style={styles.selectorViewButtonContainer}>
        <Button
          onPress={changeModalVisibility}
          backgroundColor={GlobalStyles.colors.error}
        >
          Cancel Selection
        </Button>
      </View>
    </View>
  );
};

const SpecificGoalManagement = ({ route }) => {
  const { type } = route?.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const changeModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const onSelectionHandler = (item) => {
    changeModalVisibility();
    setSelectedItem(item);

    // If goal exists, populate goal
    const goal = getGoalByItemId(item.id);
    console.log(goal);
    // If goal doesn't exists, get data to help set goal
    // Get the most recent entry, take that and multiple by 0.1
  };

  return (
    <View>
      <Modal visible={modalVisible}>
        <SelectorView changeModalVisibility={changeModalVisibility}>
          {type === "exercise" ? (
            <ExerciseSelector onSelection={onSelectionHandler} />
          ) : null}
        </SelectorView>
      </Modal>
      <View style={styles.selectionContainer}>
        <View style={styles.selectionTextContainer}>
          {selectedItem ? (
            <Text style={styles.selectionText}>{selectedItem.name}</Text>
          ) : (
            <Text style={styles.selectTextPlaceHolder}>
              Select an item to create a goal...
            </Text>
          )}
        </View>
        <Button
          onPress={changeModalVisibility}
          backgroundColor={GlobalStyles.colors.accent}
          style={styles.selectionButton}
          textStyle={styles.selectionButtonText}
        >
          Select {type}
        </Button>
      </View>
    </View>
  );
};

export default SpecificGoalManagement;

const styles = StyleSheet.create({
  selectorViewOuterContainer: {
    flex: 1,
  },
  selectorViewMainContainer: {
    flex: 12,
  },
  selectorViewButtonContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 8,
  },
  selectorViewHeaderTextContainer: {
    backgroundColor: GlobalStyles.colors.primary,
    padding: 12,
  },
  selectorViewHeaderText: {
    color: GlobalStyles.colors.primaryWhite,
  },
  selectionContainer: {
    flexDirection: "row",
    borderColor: GlobalStyles.colors.primaryGoal,
    backgroundColor: GlobalStyles.colors.primaryWhite,
    borderWidth: 1,
    padding: 5,
    margin: 8,
    alignItems: "center",
  },
  selectionTextContainer: {
    flex: 2,
    marginLeft: 8,
  },
  selectionText: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  selectTextPlaceHolder: {
    color: GlobalStyles.colors.primaryBlack + "80",
  },
  selectionButton: {
    flex: 1,
    justifyContent: "flex-end",
  },
  selectionButtonText: {
    fontSize: 10,
  },
});

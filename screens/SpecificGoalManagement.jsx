import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import ExerciseSelector from "../components/Exercise/ExerciseSelector";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import {
  getGoalByItemId,
  getGoalRecommendation,
} from "../utils/database/goals";
import { useSelector } from "react-redux";
import SpecificGoalRecommendation from "../components/Goals/SpecificGoalRecommendation";
import SpecificGoalInput from "../components/Goals/SpecificGoalInput";
import SpecificGoalSelectorView from "../components/Goals/SpecificGoalSelectorView";
import Card from "../components/UI/Card";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import MeasurementsSelector from "../components/YourMeasurements/MeasurementsSelector";

const SpecificGoalManagement = ({ route }) => {
  const token = useSelector((store) => store.auth.token);
  const { type, updateItem } = route?.params;

  const [isFetching, setIsFetching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [currentGoal, setCurrentGoal] = useState();
  const [goalRecommendation, setGoalRecommendation] = useState();
  const [currentGoalValue, setCurrentGoalValue] = useState(0);

  const changeModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const onSelectionHandler = async (item) => {
    setIsFetching(true);
    changeModalVisibility();
    setSelectedItem(item);
    setCurrentGoal();
    setGoalRecommendation();
    setCurrentGoalValue(0);

    // If goal exists, populate goal
    try {
      var itemId = item.id ? item.id : item._id;
      const goal = await getGoalByItemId(token, itemId);
      setCurrentGoal(goal[0]);
      setCurrentGoalValue(goal[0] ? goal[0].value : 0);

      // If goal doesn't exists, get data to help set goal
      const recommendation = await getGoalRecommendation(token, type, itemId);
      setGoalRecommendation(recommendation[0]);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    if (updateItem) {
      (async () => {
        setSelectedItem({ id: updateItem.itemId, name: updateItem.itemName });
        setCurrentGoal(updateItem);
        setCurrentGoalValue(updateItem.value);
        try {
          const recommendation = await getGoalRecommendation(
            token,
            type,
            updateItem.itemId
          );
          setGoalRecommendation(recommendation[0]);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [updateItem]);

  if (isFetching) {
    return (
      <Card>
        <LoadingOverlay
          backgroundColor={GlobalStyles.colors.primaryWhite}
          color={GlobalStyles.colors.primary}
        />
      </Card>
    );
  }

  return (
    <View>
      <Modal visible={modalVisible}>
        <SpecificGoalSelectorView onCancellation={changeModalVisibility}>
          {type === "exercise" ? (
            <ExerciseSelector onSelection={onSelectionHandler} />
          ) : (
            <MeasurementsSelector onSelection={onSelectionHandler} />
          )}
        </SpecificGoalSelectorView>
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
      {selectedItem && (
        <Card>
          <SpecificGoalInput
            currentGoalValue={currentGoalValue}
            currentGoalId={currentGoal?._id}
            item={selectedItem}
            type={type}
            mostRecent={goalRecommendation?.mostRecent.measurementsAvg}
          />
          {goalRecommendation ? (
            <SpecificGoalRecommendation
              recentAchievement={goalRecommendation.mostRecent.measurementsAvg}
              recommendation={
                type === "exercise" && goalRecommendation.recommendation
                  ? goalRecommendation.recommendation
                  : null
              }
            />
          ) : null}
        </Card>
      )}
    </View>
  );
};

export default SpecificGoalManagement;

const styles = StyleSheet.create({
  selectionContainer: {
    flexDirection: "row",
    borderColor: GlobalStyles.colors.primaryGoal,
    backgroundColor: GlobalStyles.colors.primaryWhite,
    borderWidth: 1,
    padding: 5,
    margin: 8,
    marginBottom: 2,
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

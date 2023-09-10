import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import { useEffect } from "react";
import { addGoal, updateGoal } from "../../utils/database/goals";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addGoalItem, updateGoalItem } from "../../store/redux/yourGoals";
import { useRef } from "react";

const SpecificGoalInput = ({
  currentGoalValue,
  currentGoalId,
  item,
  type,
  mostRecent,
}) => {
  const navigation = useNavigation();

  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  const [goalId, setGoalId] = useState();
  const [goalValue, setGoalValue] = useState();
  const [goalItem, setGoalItem] = useState();
  const [startingValue, setStartingValue] = useState();
  const updating = useRef(false);

  useEffect(() => {
    updating.current = false;
    setGoalValue(currentGoalValue.toString());
    setGoalId(currentGoalId);
    setGoalItem(item);
    setStartingValue(mostRecent);
  }, [currentGoalValue, goalId, item, mostRecent]);

  const updatePressHandler = async () => {
    updating.current = true;
    if (goalValue < 1) {
      return;
    }
    try {
      if (goalId) {
        await updateGoal(token, goalId, {
          value: goalValue,
          startingValue: startingValue,
        });
        dispatch(
          updateGoalItem({
            goalId: goalId,
            value: goalValue,
            startingValue: startingValue,
          })
        );
      } else {
        const item = await addGoal(token, {
          type: type,
          itemId: goalItem.id ? goalItem.id : goalItem._id,
          itemName: goalItem.name,
          value: goalValue,
          startingValue: startingValue ? startingValue : 0,
        });
        dispatch(addGoalItem({ goal: item }));
      }

      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Set Your Goal</Text>
      <TextInput
        keyboardType="number-pad"
        value={goalValue}
        onChangeText={setGoalValue}
        style={styles.input}
      />
      <Button
        backgroundColor={GlobalStyles.colors.primary}
        onPress={updatePressHandler}
        disabled={goalValue == currentGoalValue || updating.current}
      >
        Update
      </Button>
    </View>
  );
};

export default SpecificGoalInput;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    fontSize: 32,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 8,
    margin: 8,
    width: "25%",
    textAlign: "center",
  },
});

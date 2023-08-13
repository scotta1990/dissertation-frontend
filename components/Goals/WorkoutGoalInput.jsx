import { StyleSheet, Text, TextInput, View } from "react-native";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setWeeklyWorkoutGoal } from "../../store/redux/yourGoals";
import { Alert } from "react-native";
import { addGoal } from "../../utils/database/goals";

const WorkoutGoalInput = ({ currentGoalValue = 0, changeVisibility }) => {
  const token = useSelector((store) => store.auth.token);
  const [goalValue, setGoalValue] = useState(currentGoalValue.toString());
  const dispatch = useDispatch();

  const updatePressHandler = () => {
    if (goalValue === 0) {
      changeVisibility();
      return;
    }

    Alert.alert(
      "Update Workout Goal",
      "Are you sure you want to change your weekly workout goal?",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            changeVisibility();
          },
        },
        {
          text: "Yes",

          onPress: () => {
            addGoal(token, { type: "Workout", value: goalValue });
            dispatch(
              setWeeklyWorkoutGoal({ weeklyWorkoutGoal: parseInt(goalValue) })
            );
            changeVisibility();
          },
        },
      ]
    );
  };

  return (
    <Card style={{ marginTop: 45 }}>
      <View style={styles.goalInputContainer}>
        <Text style={styles.goalInputHeaderText}>Workout Goal</Text>
        <Text style={styles.goalInputSubtitleText}>
          Set your weekly workout goal.
        </Text>
        <View style={styles.goalInputTextContainer}>
          <TextInput
            keyboardType="numeric"
            inputMode="numeric"
            style={styles.goalInputText}
            value={goalValue}
            onChangeText={setGoalValue}
          />
          <Text style={styles.goalInputDescriptionText}>
            How many workouts you aim to do, Mon-Sun.
          </Text>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            style={styles.button}
            backgroundColor={GlobalStyles.colors.error}
            onPress={changeVisibility}
          >
            Cancel
          </Button>
          <Button
            backgroundColor={GlobalStyles.colors.primary}
            style={styles.button}
            onPress={updatePressHandler}
          >
            Update
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default WorkoutGoalInput;

const styles = StyleSheet.create({
  goalInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    padding: 8,
    flexWrap: "wrap",
    width: "70%",
  },
  goalInputHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
    marginBottom: 5,
  },
  goalInputSubtitleText: {
    fontSize: 12,
    color: GlobalStyles.colors.primary,
  },
  goalInputDescriptionText: {
    fontSize: 10,
    fontStyle: "italic",
    color: GlobalStyles.colors.primary,
  },
  goalInputTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
  },
  goalInputText: {
    fontSize: 37,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.primary,
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    width: 65,
  },
  buttonContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
  },
  button: {
    width: "47%",
  },
});

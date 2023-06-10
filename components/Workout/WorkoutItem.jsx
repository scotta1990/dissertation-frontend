import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import React, { useContext } from "react";
import Card from "../UI/Card";
import { GlobalStyles } from "../../constants/styles";
import WorkoutSetsList from "./WorkoutSetsList";
import Button from "../UI/Button";
import { addSet, removeExercise } from "../../store/redux/currentWorkout";
import { ToastProvider } from "react-native-toast-notifications";

const WorkoutItem = ({ workoutItem }) => {
  const dispatch = useDispatch();

  return (
    <Card>
      <ToastProvider>
        <View style={styles.mainContainer}>
          <View style={styles.exerciseHeaderContainer}>
            <Text style={styles.exerciseHeaderText}>
              {workoutItem.id} {workoutItem.exercise.name}
            </Text>
            <Button
              textStyle={{ color: "red" }}
              onPress={() =>
                dispatch(removeExercise({ workoutItemId: workoutItem.id }))
              }
            >
              X
            </Button>
          </View>
          <WorkoutSetsList
            workoutItemId={workoutItem.id}
            workoutSets={workoutItem.sets}
          />
          <Button
            textStyle={{ color: "blue" }}
            onPress={() => {
              dispatch(addSet({ workoutItemId: workoutItem.id }));
            }}
          >
            Add Set
          </Button>
        </View>
      </ToastProvider>
    </Card>
  );
};

export default WorkoutItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  exerciseHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 18,
  },
  exerciseHeaderText: {
    textTransform: "uppercase",
    fontSize: 16,
    color: GlobalStyles.colors.primaryBlack,
  },
});

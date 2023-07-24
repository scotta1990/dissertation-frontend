import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import React from "react";
import Card from "../UI/Card";
import { GlobalStyles } from "../../constants/styles";
import WorkoutSetsList from "./WorkoutSetsList";
import Button from "../UI/Button";
import { addSet, removeExercise } from "../../store/redux/currentWorkout";
import { ToastProvider } from "react-native-toast-notifications";
import Ionicons from "@expo/vector-icons/Ionicons";

const WorkoutItem = ({ workoutItem }) => {
  const dispatch = useDispatch();

  return (
    <Card>
      <ToastProvider>
        <View style={styles.mainContainer}>
          <View style={styles.exerciseHeaderContainer}>
            <Text style={styles.exerciseHeaderText}>
              {workoutItem.exercise.name}
            </Text>
            <Button
              textStyle={{ color: GlobalStyles.colors.error }}
              onPress={() =>
                dispatch(removeExercise({ workoutItemId: workoutItem.id }))
              }
            >
              <Ionicons name="trash-bin-outline" size={24} />
            </Button>
          </View>
          <WorkoutSetsList
            workoutItemId={workoutItem.id}
            workoutSets={workoutItem.sets}
            bodyPart={workoutItem.exercise.bodyPart}
          />
          <Button
            backgroundColor={GlobalStyles.colors.accent}
            style={styles.button}
            textStyle={{ fontSize: 12 }}
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
    alignItems: "center",
    marginHorizontal: 18,
  },
  exerciseHeaderText: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primaryBlack,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 18,
  },
});

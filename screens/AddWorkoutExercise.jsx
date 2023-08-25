import { StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import ExercisesList from "../components/Exercise/ExercisesList";
import { useDispatch, useSelector } from "react-redux";
import ExerciseBodyPartFilter from "../components/Exercise/ExerciseBodyPartFilter";
import { addExercise } from "../store/redux/currentWorkout";
import ExerciseSelector from "../components/Exercise/ExerciseSelector";

const AddWorkoutExercise = () => {
  const dispatch = useDispatch();

  const onSelectionHandler = (exercise) => {
    dispatch(addExercise({ exercise: exercise }));
  };

  return (
    <View style={styles.mainContainer}>
      <ExerciseSelector onSelection={onSelectionHandler} />
    </View>
  );
};

export default AddWorkoutExercise;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

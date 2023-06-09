import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ExercisesContext } from "../store/exercise-context";
import { GlobalStyles } from "../constants/styles";
import ExercisesList from "../components/Exercise/ExercisesList";
import ExerciseBodyPartList from "../components/Exercise/ExerciseBodyPartList";

const AddWorkoutExercise = () => {
  const exercisesCtx = useContext(ExercisesContext);
  const [exerciseFilter, setExerciseFilter] = useState("");
  const [bodyPartSelected, setBodyPartSelect] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    if (bodyPartSelected != "" || exerciseFilter != "") {
      setFilteredExercises(
        exercisesCtx.exercises.filter((exercise) => {
          return (
            exercise.name
              .toLowerCase()
              .includes(exerciseFilter.toLowerCase()) &&
            (exercise.bodyPart === bodyPartSelected || bodyPartSelected === "")
          );
        })
      );
    } else {
      setFilteredExercises(exercisesCtx.exercises);
    }
  }, [exerciseFilter, bodyPartSelected]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.bodyPartFilterContainer}>
        <Text style={styles.bodyPartFilterHeaderText}>
          Filter by a Body Part:
        </Text>
        <ExerciseBodyPartList
          bodyParts={exercisesCtx.bodyParts}
          selectedItem={bodyPartSelected}
          onSelect={setBodyPartSelect}
        />
      </View>
      <TextInput
        style={styles.exerciseInputFilter}
        placeholder="Search by exercise name"
        onChangeText={setExerciseFilter}
      />
      <View style={{ flex: 1 }}>
        <ExercisesList exerciseData={filteredExercises} />
      </View>
    </View>
  );
};

export default AddWorkoutExercise;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyPartFilterContainer: {
    backgroundColor: GlobalStyles.colors.secondary + "60",
    marginVertical: 5,
    paddingVertical: 5,
  },
  bodyPartFilterHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    margin: 5,
    color: GlobalStyles.colors.primary,
  },
  exerciseInputFilter: {
    height: 36,
    margin: 8,
    padding: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary,
  },
});

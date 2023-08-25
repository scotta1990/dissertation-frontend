import { StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import ExercisesList from "../components/Exercise/ExercisesList";
import { useDispatch, useSelector } from "react-redux";
import ExerciseBodyPartFilter from "../components/Exercise/ExerciseBodyPartFilter";
import { addExercise } from "../store/redux/currentWorkout";

const AddWorkoutExercise = () => {
  const exerciseList = useSelector((state) => state.exercises.exerciseList);
  const bodyPartsFilter = useSelector(
    (state) => state.exercises.bodyPartsFilter
  );
  const dispatch = useDispatch();

  const onSelectionHandler = (exercise) => {
    dispatch(addExercise({ exercise: exercise }));
  };

  const [exerciseFilter, setExerciseFilter] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    if (bodyPartsFilter != "" || exerciseFilter != "") {
      setFilteredExercises(
        exerciseList.filter((exercise) => {
          return (
            exercise.name
              .toLowerCase()
              .includes(exerciseFilter.toLowerCase()) &&
            (exercise.bodyPart === bodyPartsFilter || bodyPartsFilter === "")
          );
        })
      );
    } else {
      setFilteredExercises(exerciseList);
    }
  }, [exerciseFilter, bodyPartsFilter]);

  return (
    <View style={styles.mainContainer}>
      <ExerciseBodyPartFilter />
      <TextInput
        style={styles.exerciseInputFilter}
        placeholder="Search by exercise name"
        onChangeText={setExerciseFilter}
      />
      <View style={styles.mainContainer}>
        <ExercisesList
          exerciseData={filteredExercises}
          onSelection={onSelectionHandler}
        />
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

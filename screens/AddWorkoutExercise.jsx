import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { addExercise } from "../store/redux/currentWorkout";
import ExerciseSelector from "../components/Exercise/ExerciseSelector";

const AddWorkoutExercise = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSelectionHandler = (exercise) => {
    dispatch(addExercise({ exercise: exercise }));
    navigation.goBack();
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

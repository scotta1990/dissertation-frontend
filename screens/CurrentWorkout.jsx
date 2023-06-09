import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import WorkoutItem from "../components/Workout/WorkoutItem";
import { useDispatch, useSelector } from "react-redux";
import { cancelCurrentWorkout } from "../store/redux/currentWorkout";
import { Alert } from "react-native";

const renderWorkoutItem = ({ item, index }) => {
  return <WorkoutItem workoutItem={item} index={index} />;
};

const CurrentWorkout = ({ navigation }) => {
  const currentWorkout = useSelector((store) => store.currentWorkout);
  const dispatch = useDispatch();

  function addExerciseOnPressHandler() {
    navigation.navigate("AddWorkoutExercise");
  }

  function cancelWorkoutOnPressHandler() {
    Alert.alert(
      "Cancel Workout",
      "Are you sure you want to cancel this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => {
            dispatch(cancelCurrentWorkout());
            navigation.navigate("WorkoutSummary");
          },
        },
      ]
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        {currentWorkout.workoutItems.length > 0 ? (
          <FlatList
            data={currentWorkout.workoutItems}
            keyExtractor={(item) => item.id}
            renderItem={renderWorkoutItem}
          />
        ) : (
          ""
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          backgroundColor={GlobalStyles.colors.primary}
          onPress={addExerciseOnPressHandler}
        >
          Add Exercise
        </Button>
        <View style={styles.buttonsRow}>
          <Button
            style={styles.buttonRow}
            backgroundColor={GlobalStyles.colors.error}
            onPress={cancelWorkoutOnPressHandler}
          >
            Cancel Workout
          </Button>
          <Button
            style={styles.buttonRow}
            backgroundColor={GlobalStyles.colors.successBackground}
          >
            Finish Workout
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CurrentWorkout;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  buttonsContainer: {
    margin: 8,
    padding: 8,
    justifyContent: "flex-end",
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  buttonRow: {
    width: "48%",
  },
});

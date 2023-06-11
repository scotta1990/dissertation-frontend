import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import WorkoutItem from "../components/Workout/WorkoutItem";
import { useDispatch, useSelector } from "react-redux";
import { cancelCurrentWorkout } from "../store/redux/currentWorkout";
import { Alert } from "react-native";
import Toast from "react-native-toast-notifications";
import { useRef } from "react";
import { addWorkout } from "../store/redux/workouts";

const renderWorkoutItem = ({ item, index }) => {
  return <WorkoutItem workoutItem={item} index={index} />;
};

const CurrentWorkout = ({ navigation }) => {
  const currentWorkout = useSelector((store) => store.currentWorkout);
  const dispatch = useDispatch();
  const toastRef = useRef();

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

  function finishWorkoutOnPressHandler() {
    const doneWorkoutItems = currentWorkout.workoutItems.filter(
      (workoutItem) => {
        return workoutItem.sets.find((set) => set.done == true);
      }
    );

    if (doneWorkoutItems.length > 0) {
      dispatch(
        addWorkout({
          workout: {
            startDate: currentWorkout.workoutStartDate,
            endDate: Date.now(),
            workoutDuration: currentWorkout.workoutDuration,
            workoutItems: currentWorkout.workoutItems,
          },
        })
      );
      dispatch(cancelCurrentWorkout());
      navigation.navigate("WorkoutSummary");
      return;
    }
    toastRef.current.show(
      "You need to add some completed exercises to your workout to finish it.",
      {
        type: "warning",
        placement: "top",
        duration: 6000,
        animationType: "zoom-in",
      }
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Toast ref={toastRef} />
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
            onPress={finishWorkoutOnPressHandler}
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
    marginHorizontal: 8,
    marginBottom: 30,
    padding: 8,
    justifyContent: "flex-end",
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  buttonRow: {
    width: "49%",
  },
});

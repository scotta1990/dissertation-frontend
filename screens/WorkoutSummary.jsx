import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import Card from "../components/UI/Card";
import RecentWorkoutsList from "../components/Workout/RecentWorkoutsList";
import Button from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { startWorkout } from "../store/redux/currentWorkout";
import { getAllWorkouts } from "../utils/database/workouts";
import { setWorkouts } from "../store/redux/workouts";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useEffect } from "react";
import { getAllExercises } from "../utils/database/exercises";
import { setExercises } from "../store/redux/exercises";
import { getMeasurementTypes } from "../utils/database/yourMeasurements";
import { setMeasurementTypes } from "../store/redux/yourMeasurements";

const WorkoutSummary = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(true);
  const token = useSelector((store) => store.auth.token);
  const workoutsList = useSelector((store) => store.workouts.workoutsList);
  const workoutInProgress = useSelector(
    (store) => store.currentWorkout.workoutInProgress
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      if (token) {
        try {
          const workouts = await getAllWorkouts(token);
          dispatch(setWorkouts({ workouts: workouts }));
          const exercises = await getAllExercises(token);
          dispatch(setExercises({ exercises: exercises }));
          const measurementTypes = await getMeasurementTypes(token);
          dispatch(setMeasurementTypes({ measurementTypes: measurementTypes }));
        } catch (error) {
          console.log(error);
        }
        setIsFetching(false);
      }
    })();
  }, [token]);

  function pressHandler() {
    if (workoutInProgress) {
      navigation.navigate("CurrentWorkout");
    } else {
      dispatch(startWorkout());
      navigation.navigate("CurrentWorkout");
    }
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.recentWorkoutContainer}>
        <Card>
          <View style={styles.recentWorkoutsHeaderContainer}>
            <Text style={styles.recentWorkoutHeaderText}>
              Your Recent Workouts
            </Text>
          </View>
          <RecentWorkoutsList recentWorkouts={workoutsList} />
        </Card>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          backgroundColor={GlobalStyles.colors.accent}
          onPress={pressHandler}
        >
          {workoutInProgress ? "Resume Workout" : "Start a Workout"}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutSummary;

const styles = StyleSheet.create({
  recentWorkoutContainer: {
    flex: 6,
  },
  recentWorkoutsHeaderContainer: {
    marginLeft: 8,
    paddingLeft: 8,
  },
  recentWorkoutHeaderText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 8,
    justifyContent: "flex-end",
    flex: 1,
  },
  button: {
    margin: 10,
    marginTop: 0,
  },
});

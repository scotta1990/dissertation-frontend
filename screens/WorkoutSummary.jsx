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
      <Card>
        <View style={styles.recentWorkoutsHeaderContainer}>
          <Text style={styles.recentWorkoutHeaderText}>
            Your Recent Workouts
          </Text>
        </View>
        <RecentWorkoutsList recentWorkouts={workoutsList} />
      </Card>
      <Button
        style={styles.button}
        backgroundColor={GlobalStyles.colors.accent}
        onPress={pressHandler}
      >
        {workoutInProgress ? "Resume Workout" : "Start a Workout"}
      </Button>
    </SafeAreaView>
  );
};

export default WorkoutSummary;

const styles = StyleSheet.create({
  recentWorkoutsHeaderContainer: {
    marginLeft: 8,
    paddingLeft: 8,
  },
  recentWorkoutHeaderText: {
    fontWeight: "bold",
  },
  button: {
    justifyContent: "flex-end",
    margin: 8,
    padding: 8,
  },
});

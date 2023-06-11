import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../constants/styles";
import Card from "../components/UI/Card";
import RecentWorkoutsList from "../components/Workout/RecentWorkoutsList";
import Button from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { startWorkout } from "../store/redux/currentWorkout";

const data = [
  { id: 1, date: "2023-06-02", duration: "1 hour 5 minutes" },
  { id: 2, date: "2023-05-31", duration: "55 minutes" },
  { id: 3, date: "2023-05-02", duration: "1 hour" },
];

const WorkoutSummary = ({ navigation }) => {
  const workoutsList = useSelector((store) => store.workouts.workoutsList);
  const workoutInProgress = useSelector(
    (store) => store.currentWorkout.workoutInProgress
  );
  const dispatch = useDispatch();
  // const currentWorkoutCtx = useContext(CurrentWorkoutContext);

  function pressHandler() {
    if (workoutInProgress) {
      navigation.navigate("CurrentWorkout");
    } else {
      dispatch(startWorkout());
      navigation.navigate("CurrentWorkout");
    }
  }
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.mainContainer}>
        <Text>WorkoutSummary</Text>
      </View>
      {/* Recent Workouts Block */}
      <Card>
        {/* Recent Workout Header */}
        <View style={styles.recentWorkoutsHeaderContainer}>
          <Text style={styles.recentWorkoutHeaderText}>
            Your Recent Workouts
          </Text>
        </View>
        {/* Recent Workout List */}
        <RecentWorkoutsList recentWorkouts={workoutsList} />
      </Card>
      <Button
        style={styles.button}
        backgroundColor={GlobalStyles.colors.accent}
        onPress={pressHandler}
      >
        {workoutInProgress ? "Resume Workout" : "Start a Work"}
      </Button>
    </SafeAreaView>
  );
};

export default WorkoutSummary;

const styles = StyleSheet.create({
  mainContainer: {
    margin: 8,
    padding: 8,
  },
  recentWorkoutsHeaderContainer: {
    marginLeft: 8,
    paddingLeft: 8,
  },
  recentWorkoutHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 8,
    padding: 8,
  },
});

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { GlobalStyles } from "../constants/styles";
import Card from "../components/UI/Card";
import RecentWorkoutsList from "../components/Workout/RecentWorkoutsList";
import Button from "../components/UI/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CurrentWorkoutContext } from "../store/current-workout-context";

const data = [
  { id: 1, date: "2023-06-02", duration: "1 hour 5 minutes" },
  { id: 2, date: "2023-05-31", duration: "55 minutes" },
  { id: 3, date: "2023-05-02", duration: "1 hour" },
];

const WorkoutSummary = ({ navigation }) => {
  const currentWorkoutCtx = useContext(CurrentWorkoutContext);

  function pressHandler() {
    if (currentWorkoutCtx.workoutInProgress) {
      navigation.navigate("CurrentWorkout");
    } else {
      currentWorkoutCtx.startWorkout();
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
        <RecentWorkoutsList recentWorkouts={data} />
      </Card>
      <Button
        style={styles.button}
        backgroundColor={GlobalStyles.colors.accent}
        onPress={pressHandler}
      >
        {currentWorkoutCtx.workoutInProgress
          ? "Resume Workout"
          : "Start a Work"}
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

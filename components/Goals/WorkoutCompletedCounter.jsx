import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { useSelector } from "react-redux";
import { getThisWeeksWorkoutCount } from "../../store/redux/workouts";

const WorkoutCompletedCounter = ({ style }) => {
  const workoutCount = useSelector(getThisWeeksWorkoutCount);

  return (
    <View style={[styles.completedWorkoutCountContainer, style]}>
      <Text style={styles.completedWorkoutText}>This week</Text>
      <Text style={styles.completedWorkoutCountText}>{workoutCount}</Text>
      <Text style={styles.completedWorkoutText}>Workout</Text>
      <Text style={styles.completedWorkoutText}>Completed</Text>
    </View>
  );
};

export default WorkoutCompletedCounter;

const styles = StyleSheet.create({
  completedWorkoutCountContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  completedWorkoutCountText: {
    fontSize: 32,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  completedWorkoutText: {
    fontSize: 12,
    color: GlobalStyles.colors.primary,
  },
});

import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { useSelector } from "react-redux";
import { getThisWeeksWorkoutCount } from "../../store/redux/workouts";

const WorkoutGoalAchievement = ({ testCount }) => {
  const goal = useSelector((store) => store.yourGoals.weeklyWorkoutGoal);

  const workoutCount = useSelector(getThisWeeksWorkoutCount);

  // const workoutCount = testCount;

  // Goal has been achieved
  if (goal === 0) {
    return (
      <View style={[styles.workoutGoalAchievementContainer, styles.noGoal]}>
        <Ionicons
          name="alert-circle-outline"
          size={45}
          color={GlobalStyles.colors.accent}
        />
        <Text style={styles.noGoalText}>No goal set</Text>
      </View>
    );
  }

  // Goal has been achieved
  if (workoutCount >= goal) {
    return (
      <View
        style={[styles.workoutGoalAchievementContainer, styles.goalAchieved]}
      >
        <Ionicons
          name="ribbon-outline"
          size={45}
          color={GlobalStyles.colors.primaryGoal}
        />
        <Text style={styles.workoutGoalAchievementText}>Goal Complete</Text>
      </View>
    );
  }

  // Already half way or more
  if (workoutCount >= goal / 2) {
    return (
      <View
        style={[styles.workoutGoalAchievementContainer, styles.goalHalfway]}
      >
        <Ionicons
          name="arrow-forward"
          size={45}
          color={GlobalStyles.colors.primary}
        />
        <Text style={styles.workoutGoalAchievementText}>Past half way</Text>
        <Text style={styles.workoutGoalAchievementText}>Keep it up</Text>
      </View>
    );
  }

  // Started working towards the goal
  if (workoutCount > 0) {
    return (
      <View
        style={[styles.workoutGoalAchievementContainer, styles.goalHalfway]}
      >
        <Ionicons
          name="thumbs-up"
          size={32}
          color={GlobalStyles.colors.primary}
        />
        <Text style={styles.workoutGoalAchievementText}>You started!</Text>
        <Text style={styles.workoutGoalAchievementText}>Keep going</Text>
      </View>
    );
  }

  // Not started yet
  if (workoutCount === 0) {
    return (
      <View
        style={[styles.workoutGoalAchievementContainer, styles.goalNotStarted]}
      >
        <Ionicons
          name="barbell"
          size={45}
          color={GlobalStyles.colors.primary}
        />
        <Text style={styles.notStartedText}>Get started</Text>
        <Text style={styles.notStartedText}>with a workout</Text>
      </View>
    );
  }
};

export default WorkoutGoalAchievement;

const styles = StyleSheet.create({
  noGoal: {
    borderColor: GlobalStyles.colors.accent,
    borderWidth: 1.5,
  },
  goalAchieved: {
    backgroundColor: GlobalStyles.colors.primary,
  },
  goalHalfway: {
    backgroundColor: GlobalStyles.colors.secondary,
  },
  goalNotStarted: {
    borderColor: GlobalStyles.colors.primary,
    borderWidth: 1,
  },
  notStartedText: {
    color: GlobalStyles.colors.primary,
  },
  noGoalText: {
    color: GlobalStyles.colors.accent,
  },
  workoutGoalAchievementContainer: {
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  workoutGoalAchievementText: {
    color: GlobalStyles.colors.primaryWhite,
    fontWeight: "bold",
    fontSize: 12,
  },
});

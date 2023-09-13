import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { useSelector } from "react-redux";
import { getThisWeeksWorkoutCount } from "../../store/redux/workouts";

const renderWorkoutGoalAchievement = ({
  firstLineText,
  icon,
  iconColor,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.mainContainer, style]}>
      <Ionicons name={icon} size={25} color={iconColor} />
      <View style={styles.textContainer}>
        <Text adjustsFontSizeToFit={true} style={[styles.text, textStyle]}>
          {firstLineText}
        </Text>
      </View>
    </View>
  );
};

const WorkoutGoalAchievement = () => {
  const goal = useSelector((store) => store.yourGoals.weeklyWorkoutGoal);

  const workoutCount = useSelector(getThisWeeksWorkoutCount);

  // No goal has been set
  if (goal === 0) {
    return renderWorkoutGoalAchievement({
      firstLineText: "No goal set",
      icon: "alert-circle-outline",
      iconColor: GlobalStyles.colors.accent,
      textStyle: styles.noGoalText,
      style: styles.noGoal,
    });
  }

  // Goal has been achieved
  if (workoutCount >= goal) {
    return renderWorkoutGoalAchievement({
      firstLineText: "Goal complete",
      icon: "ribbon-outline",
      iconColor: GlobalStyles.colors.primaryGoal,
      textStyle: styles.workoutGoalAchievementText,
      style: styles.goalAchieved,
    });
  }

  // Already half way or more
  if (workoutCount >= goal / 2) {
    return renderWorkoutGoalAchievement({
      firstLineText: "Past halfway, Keep it up",
      icon: "arrow-forward",
      iconColor: GlobalStyles.colors.primary,
      textStyle: styles.workoutGoalAchievementText,
      style: styles.goalHalfway,
    });
  }

  // Started working towards the goal
  if (workoutCount > 0) {
    return renderWorkoutGoalAchievement({
      firstLineText: "You started, now keep going!",
      icon: "thumbs-up",
      iconColor: GlobalStyles.colors.primary,
      textStyle: styles.workoutGoalAchievementText,
      style: styles.goalHalfway,
    });
  }

  // Not started yet
  if (workoutCount === 0) {
    return renderWorkoutGoalAchievement({
      firstLineText: "Get going by starting a workout",
      icon: "barbell",
      iconColor: GlobalStyles.colors.primary,
      textStyle: styles.notStartedText,
      style: styles.goalNotStarted,
    });
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
  mainContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
  text: {
    color: GlobalStyles.colors.primaryWhite,
    fontWeight: "bold",
    // fontSize: 10,
  },
});

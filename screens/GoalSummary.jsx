import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { GlobalStyles } from "../constants/styles";
import Card from "../components/UI/Card";
import WorkoutGoalsSummary from "../components/Goals/WorkoutGoalsSummary";

const GoalSummary = () => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <Card style={styles.goalCard}>
        <WorkoutGoalsSummary />
      </Card>
    </SafeAreaView>
  );
};

export default GoalSummary;

const styles = StyleSheet.create({
  goalCard: {
    borderColor: GlobalStyles.colors.primaryGoal,
    borderWidth: 1,
  },
});

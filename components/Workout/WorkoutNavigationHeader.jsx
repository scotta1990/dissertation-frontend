import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WorkoutTimer from "./WorkoutTimer";
import { GlobalStyles } from "../../constants/styles";

const WorkoutNavigationHeader = () => {
  return (
    <View>
      <Text style={styles.headerText}>Workout</Text>
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>Duration</Text>
        <WorkoutTimer
          containerStyle={styles.workoutTimerContainer}
          textStyle={styles.workoutTimerText}
        />
      </View>
    </View>
  );
};

export default WorkoutNavigationHeader;

const styles = StyleSheet.create({
  headerText: {
    color: GlobalStyles.colors.primaryWhite,
    fontSize: 18,
    fontWeight: "bold",
  },
  durationContainer: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4,
  },
  durationText: {
    color: GlobalStyles.colors.primaryWhite,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: GlobalStyles.colors.primaryWhite,
    marginRight: 4,
    paddingRight: 4,
    textAlignVertical: "center",
  },
  workoutTimerContainer: {},
  workoutTimerText: {
    color: GlobalStyles.colors.primaryWhite,
    fontSize: 13,
    fontWeight: "bold",
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import {
  convertDateToString,
  convertDurationToString,
} from "../../utils/utils";

const RecentWorkoutItem = ({ recentWorkoutItem, alternate = false }) => {
  return (
    <View
      style={[
        styles.recentWorkoutItemContainerMain,
        alternate
          ? styles.recentWorkoutItemContainer
          : styles.recentWorkoutItemContainerAlternate,
      ]}
    >
      <View>
        <Text style={styles.recentWorkoutDateText}>
          {convertDateToString(recentWorkoutItem.startDate)}
        </Text>
      </View>
      <View style={styles.recentWorkoutDurationContainer}>
        <Text
          style={
            alternate
              ? styles.recentWorkoutDurationText
              : styles.recentWorkoutDurationTextAlternate
          }
        >
          {convertDurationToString(recentWorkoutItem.workoutDuration)}
        </Text>
      </View>
    </View>
  );
};

export default RecentWorkoutItem;

const styles = StyleSheet.create({
  recentWorkoutItemContainerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    marginVertical: 13,
    padding: 10,
    borderRadius: 8,
  },
  recentWorkoutItemContainer: {
    backgroundColor: GlobalStyles.colors.secondary,
    color: GlobalStyles.colors.primaryBlack,
  },
  recentWorkoutItemContainerAlternate: {
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1.5,
  },
  recentWorkoutDateText: {
    fontWeight: "bold",
  },
  recentWorkoutDurationText: {
    color: "white",
    fontSize: 12,
  },
  recentWorkoutDurationTextAlternate: {
    color: GlobalStyles.colors.secondary,
    fontSize: 12,
  },
  recentWorkoutDurationContainer: {
    width: "30%",
  },
});

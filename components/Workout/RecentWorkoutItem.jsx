import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

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
          {recentWorkoutItem.date}
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
          {recentWorkoutItem.duration}
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
    padding: 8,
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

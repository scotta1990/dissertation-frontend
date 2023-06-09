import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import RecentWorkoutItem from "./RecentWorkoutItem";

const renderRecentWorkoutItem = ({ item, index }) => {
  const alternate = index % 2 == 0;
  return <RecentWorkoutItem recentWorkoutItem={item} alternate={alternate} />;
};

const RecentWorkoutsList = ({ recentWorkouts }) => {
  return (
    <FlatList
      data={recentWorkouts}
      renderItem={renderRecentWorkoutItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RecentWorkoutsList;

const styles = StyleSheet.create({});

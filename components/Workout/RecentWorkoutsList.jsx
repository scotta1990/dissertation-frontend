import { FlatList, StyleSheet } from "react-native";
import React from "react";
import RecentWorkoutItem from "./RecentWorkoutItem";
import MessageBox from "../UI/MessageBox";

const renderRecentWorkoutItem = ({ item, index }) => {
  const alternate = index % 2 == 0;
  return <RecentWorkoutItem recentWorkoutItem={item} alternate={alternate} />;
};

const RecentWorkoutsList = ({ recentWorkouts }) => {
  return (
    <FlatList
      data={recentWorkouts}
      renderItem={renderRecentWorkoutItem}
      keyExtractor={(item) => item.startDate}
      ListEmptyComponent={<MessageBox card={false} messageSubject={""} messageBody={"No recent workouts yet. Get started by completing a workout!"}/>}
    />
  );
};

export default RecentWorkoutsList;

const styles = StyleSheet.create({});

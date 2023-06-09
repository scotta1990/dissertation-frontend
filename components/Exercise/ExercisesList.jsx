import { StyleSheet, FlatList } from "react-native";
import React from "react";
import ExerciseItem from "./ExerciseItem";

const renderExerciseItem = ({ item }) => {
  return <ExerciseItem exercise={item} />;
};

const ExercisesList = ({ exerciseData }) => {
  return (
    <FlatList
      data={exerciseData}
      keyExtractor={(item) => item.id}
      renderItem={renderExerciseItem}
    />
  );
};

export default ExercisesList;

const styles = StyleSheet.create({});

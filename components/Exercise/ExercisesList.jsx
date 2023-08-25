import { StyleSheet, FlatList } from "react-native";
import React from "react";
import ExerciseItem from "./ExerciseItem";

const ExercisesList = ({ exerciseData, onSelection }) => {
  const renderExerciseItem = ({ item }) => {
    return <ExerciseItem exercise={item} onPress={onSelection} />;
  };
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

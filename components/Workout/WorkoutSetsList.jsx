import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../UI/Card";
import SetRow from "./SetRow";
import { EXERCISE_MEASUREMENTS } from "../../constants/exerciseMeasurements";
import { useState } from "react";
import { useEffect } from "react";

function renderSetRow(item, index, workoutItemId, exerciseMeasurement) {
  return (
    <SetRow
      set={item}
      setIndex={index}
      workoutItemId={workoutItemId}
      exerciseMeasurement={exerciseMeasurement}
    />
  );
}

const WorkoutSetsList = ({
  workoutItemId,
  workoutSets,
  equipmentType,
  bodyPart,
}) => {
  const [exerciseMeasurement, setExerciseMeasurement] = useState({
    measurement: "kg",
    count: "reps",
  });

  useEffect(() => {
    if (equipmentType) {
      setExerciseMeasurement(
        EXERCISE_MEASUREMENTS.find(
          (exercise) => exercise.name === equipmentType
        )
      );
    }
  }, [equipmentType]);
  return (
    <Card>
      <View style={styles.setContainer}>
        <View style={styles.setItemContainer}>
          <Text style={styles.headerText}>Set</Text>
        </View>
        <View style={styles.setItemContainer}>
          {exerciseMeasurement.measurement !== "" ? (
            <Text style={styles.headerText}>
              {exerciseMeasurement.measurement}
            </Text>
          ) : (
            ""
          )}
        </View>
        <View style={styles.setItemContainer}>
          <Text style={styles.headerText}>{exerciseMeasurement.count}</Text>
        </View>
        <View style={styles.setItemContainer}>
          <Text style={styles.headerText}>Done</Text>
        </View>
      </View>
      <FlatList
        data={workoutSets}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) =>
          renderSetRow(item, index, workoutItemId, exerciseMeasurement)
        }
      />
    </Card>
  );
};

export default WorkoutSetsList;

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
    paddingHorizontal: 12,
  },
  setItemContainer: {
    width: 50,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "500",
    textTransform: "capitalize",
  },
});

import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../UI/Card";
import SetRow from "./SetRow";

function renderSetRow(item, index, exerciseId) {
  return <SetRow set={item} setIndex={index} exerciseId={exerciseId} />;
}

const WorkoutSetsList = ({ exerciseId, workoutSets }) => {
  return (
    <Card>
      {/* <View style={{ flex: 1 }}> */}
      <View style={styles.setContainer}>
        <View style={styles.setItemContainer}>
          <Text style={styles.headerText}>Set</Text>
        </View>
        <View style={styles.setItemContainer}>
          <Text style={styles.headerText}>kg</Text>
        </View>
        <View style={styles.setItemContainer}>
          <Text style={styles.headerText}>Reps</Text>
        </View>
        <View style={styles.setItemContainer}>
          <Text style={styles.headerText}>Done</Text>
        </View>
      </View>
      {/* </View> */}
      <FlatList
        data={workoutSets}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => renderSetRow(item, index, exerciseId)}
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
  },
});

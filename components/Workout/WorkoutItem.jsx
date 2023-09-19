import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Card from "../UI/Card";
import { GlobalStyles } from "../../constants/styles";
import WorkoutSetsList from "./WorkoutSetsList";
import Button from "../UI/Button";
import { addSet, removeExercise } from "../../store/redux/currentWorkout";
import { ToastProvider } from "react-native-toast-notifications";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getGoalByItem } from "../../store/redux/yourGoals";
import { useState } from "react";
import { useEffect } from "react";
import WorkoutItemSupportHeader from "./WorkoutItemSupportHeader";
import { getGoalRecommendation } from "../../utils/database/goals";
import { getExerciseMetric } from "../../utils/utils";


const WorkoutItem = ({ workoutItem }) => {
  const store = useSelector((store) => store.yourGoals.goals)
  const token = useSelector((store) => store.auth.token)
  const dispatch = useDispatch();
  const [goal, setGoal] = useState();
  const [mostRecent, setMostRecent] = useState();
  const [metric, setMetric] = useState("kg");

  useEffect(() => {
    (async () => {
     const mostRecent = await getGoalRecommendation(token, "exercise", workoutItem.exercise.id);
     if(mostRecent.length > 0) {
       setMostRecent(Math.round(mostRecent[0].mostRecent.measurementsAvg));
     }
    })()

    const goal = getGoalByItem(store, workoutItem.exercise.id);
    if(goal.length > 0) {
      setGoal(goal[0])
    }
    setMetric(getExerciseMetric(workoutItem.exercise.equipment))
  },[workoutItem, store])

  return (
    <Card>
      <ToastProvider>
        <View style={styles.mainContainer}>
          <View style={styles.exerciseHeaderContainer}>
            <Text style={styles.exerciseHeaderText}>
              {workoutItem.exercise.name}
            </Text>
            <Button
              textStyle={{ color: GlobalStyles.colors.error }}
              onPress={() =>
                dispatch(removeExercise({ workoutItemId: workoutItem.id }))
              }
            >
              <Ionicons name="trash-bin-outline" size={24} />
            </Button>
          </View>
          <WorkoutItemSupportHeader mostRecent={mostRecent} goalValue={goal?.value} metric={metric}/>
          <WorkoutSetsList
            workoutItemId={workoutItem.id}
            workoutSets={workoutItem.sets}
            equipmentType={workoutItem.exercise.equipment}
            bodyPart={workoutItem.exercise.bodyPart}
          />
          <Button
            backgroundColor={GlobalStyles.colors.accent}
            style={styles.button}
            textStyle={{ fontSize: 12 }}
            onPress={() => {
              dispatch(addSet({ workoutItemId: workoutItem.id }));
            }}
          >
            Add Set
          </Button>
        </View>
      </ToastProvider>
    </Card>
  );
};

export default WorkoutItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  exerciseHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 18,
  },
  exerciseHeaderText: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primaryBlack,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 18,
  },
});

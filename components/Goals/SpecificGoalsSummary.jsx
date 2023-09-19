import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import Card from "../UI/Card";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getGoalsByType } from "../../store/redux/yourGoals";

const SpecificGoalCard = ({ title, goalCount, onPress }) => {
  return (
    <Card style={styles.specificGoalCard}>
      <Text style={styles.specificGoalCardTitleText}>{title}</Text>
      <Text style={styles.specificGoalCardCountText}>
        {goalCount} <Text style={styles.specificGoalCardText}>set</Text>
      </Text>
      <Button
        style={styles.viewGoalsCardButton}
        textStyle={styles.viewGoalsCardButtonText}
        backgroundColor={GlobalStyles.colors.secondary}
        onPress={onPress}
      >
        View
      </Button>
    </Card>
  );
};

const SpecificGoalsSummary = () => {
  const navigation = useNavigation();
  const state = useSelector((state) => state);
  const [measurementGoalCount, setMeasurementGoalCount] = useState();
  const [exerciseGoalCount, setExerciseGoalCount] = useState();

  useEffect(() => {
    const measurementGoals = getGoalsByType(state, "measurement");
    setMeasurementGoalCount(measurementGoals.length);
    const exerciseGoals = getGoalsByType(state, "exercise");
    setExerciseGoalCount(exerciseGoals.length);
  }, [state]);

  return (
    <>
      <Text style={styles.mainHeaderText}>Your Goals</Text>
      <View style={styles.mainContainer}>
        <SpecificGoalCard
          title={"Measurement Goals"}
          goalCount={measurementGoalCount}
          onPress={() => {
            navigation.navigate("SpecificGoals", { type: "measurement" });
          }}
        />
        <SpecificGoalCard
          title={"Exercise Goals"}
          goalCount={exerciseGoalCount}
          onPress={() => {
            navigation.navigate("SpecificGoals", { type: "exercise" });
          }}
        />
      </View>
    </>
  );
};

export default SpecificGoalsSummary;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
  },
  mainHeaderText: {
    fontWeight: "bold",
  },
  specificGoalCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  specificGoalCardTitleText: {
    color: GlobalStyles.colors.primary,
    textAlign: "center",
  },
  specificGoalCardCountText: {
    fontSize: 32,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
    marginVertical: 5,
  },
  specificGoalCardText: {
    fontSize: 12,
    fontWeight: "normal",
  },
  viewGoalsCardButton: {
    width: "80%",
    marginTop: 5,
  },
  viewGoalsCardButtonText: {
    fontSize: 12,
  },
});

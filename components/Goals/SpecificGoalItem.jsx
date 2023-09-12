import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { getGoalRecommendation } from "../../utils/database/goals";
import { useEffect } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { getExerciseById } from "../../store/redux/exercises";
import { GlobalStyles } from "../../constants/styles";
import { ProgressChart } from "react-native-chart-kit";
import LoadingOverlay from "../UI/LoadingOverlay";
import { getExerciseMetric } from "../../utils/utils";
import { useNavigation } from "@react-navigation/native";

const SpecificGoalItem = ({ item, token, type }) => {
  const navigation = useNavigation();
  const state = useSelector((state) => state);
  const exerciseList = useSelector((state) => state.exercises.exerciseList);
  const measurementTypes = useSelector(
    (store) => store.yourMeasurements.measurementTypes
  );
  const [isFetching, setIsFetching] = useState(true);
  const [mostRecent, setMostRecent] = useState(0);
  const [goalAchievedPct, setGoalAchievedPct] = useState(0);
  const [currentGoalAchieved, setCurrentGoalAchieved] = useState(0);

  const getMostRecentData = async () => {
    try {
      setIsFetching(true);
      const mostRecentData = await getGoalRecommendation(
        token,
        type,
        item.itemId
      );
      if (mostRecentData.length > 0) {
        setMostRecent(Math.round(mostRecentData[0].mostRecent.measurementsAvg));
      }
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getMostRecentData();
  }, [token, item, state]);

  useEffect(() => {
    const goalDifference = Math.abs(item.value - item.startingValue);
    const currentDifference = Math.abs(item.value - mostRecent);
    const currentGoalAchieved = goalDifference - currentDifference;
    setCurrentGoalAchieved(currentGoalAchieved);
    if (goalDifference > 0) {
      setGoalAchievedPct(currentGoalAchieved / goalDifference);
    }
  }, [mostRecent]);

  if (isFetching) {
    return (
      <Card>
        <LoadingOverlay
          backgroundColor={GlobalStyles.colors.primaryWhite}
          color={GlobalStyles.colors.primary}
        />
      </Card>
    );
  }
  var metric;

  if (type === "measurement") {
    metric = measurementTypes.filter(
      (measurementType) => measurementType._id == item.itemId
    )[0].metric;
  }

  if (type === "exercise") {
    metric = getExerciseMetric(
      getExerciseById(exerciseList, item.itemId)[0].equipment
    );
  }
  return (
    <Card>
      <View style={styles.innerContainer}>
        <View style={styles.progressChartContainer}>
          <ProgressChart
            data={{
              data: [goalAchievedPct >= 1 ? 1 : goalAchievedPct],
              colors: [
                goalAchievedPct >= 1
                  ? `rgba(255, 183, 3, 1)`
                  : `rgba(5, 102, 141, 1)`,
              ],
            }}
            width={100}
            height={100}
            strokeWidth={16}
            radius={28}
            chartConfig={{
              backgroundGradientFrom: GlobalStyles.colors.primaryWhite,
              backgroundGradientTo: GlobalStyles.colors.primaryWhite,
              backgroundColor: GlobalStyles.colors.primaryWhite,
              fillShadowGradientFromOpacity: 0.2,
              fillShadowGradientToOpacity: 1,
              color: (opacity = 1) => `rgba(5, 102, 141, ${opacity})`,
            }}
            withCustomBarColorFromData={true}
            hideLegend={true}
          />
        </View>
        <View style={styles.goalTextContainer}>
          <Text style={styles.title}>{item.itemName}</Text>
          <Text style={styles.goalText}>
            {mostRecent}/{item.value}
            {metric?.toUpperCase()}
          </Text>
          <Text style={styles.infoText}>
            Goal started at: {item.startingValue}
            {metric}
          </Text>
          <Text style={styles.infoText}>
            Progress made: {currentGoalAchieved}
            {metric}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            textStyle={styles.buttonText}
            backgroundColor={GlobalStyles.colors.primary}
            onPress={() => {
              navigation.navigate("SpecificGoalManagement", {
                type: type,
                updateItem: item,
              });
            }}
          >
            Update
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default SpecificGoalItem;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    margin: 5,
    padding: 2,
  },
  progressChartContainer: {
    flex: 1.2,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    margin: 4,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: GlobalStyles.colors.primary,
  },
  goalTextContainer: {
    flex: 2,
  },
  goalText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 4,
  },
  infoText: {
    fontSize: 12,
    fontStyle: "italic",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonText: {
    fontSize: 10,
  },
});

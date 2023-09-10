import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { getGoalRecommendation } from "../../utils/database/goals";
import { useEffect } from "react";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import { getExerciseById } from "../../store/redux/exercises";
import { EXERCISE_MEASUREMENTS } from "../../constants/exerciseMeasurements";
import { GlobalStyles } from "../../constants/styles";
import { ProgressChart } from "react-native-chart-kit";
import LoadingOverlay from "../UI/LoadingOverlay";
import { getExerciseMetric } from "../../utils/utils";

const SpecificGoalItem = ({ item, token, type }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [mostRecent, setMostRecent] = useState(0);
  const exerciseList = useSelector((state) => state.exercises.exerciseList);
  const measurementTypes = useSelector(
    (store) => store.yourMeasurements.measurementTypes
  );
  const [goalAchievedPct, setGoalAchievedPct] = useState(0);

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

  const getMostRecentData = async () => {
    try {
      const mostRecentData = await getGoalRecommendation(
        token,
        type,
        item.itemId
      );
      if (mostRecentData.length > 0) {
        setMostRecent(mostRecentData[0].mostRecent.measurementsAvg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    getMostRecentData();
    const goalDifference = item.value - item.startingValue;
    const currentDifference = item.value - mostRecent;
    const currentGoalAchieved = goalDifference - currentDifference;

    setGoalAchievedPct(currentGoalAchieved / goalDifference);
    setIsFetching(false);
  }, [token, item, getMostRecentData]);

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

  return (
    <Card>
      <View style={styles.innerContainer}>
        <View style={styles.progressChartContainer}>
          <ProgressChart
            data={{
              data: [goalAchievedPct >= 1 ? 1 : goalAchievedPct],
              colors: [
                mostRecent / item.value >= 1
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
            {Math.round(mostRecent)}/{item.value}
            {metric?.toUpperCase()}
          </Text>
          <Text>{item.startingValue}</Text>
          <Text>{goalAchievedPct}</Text>
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
  progressChartContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

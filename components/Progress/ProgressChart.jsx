import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import Card from "../UI/Card";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecentMeasurementsByType } from "../../utils/database/yourMeasurements";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";
import { getExerciseById } from "../../store/redux/exercises";
import MessageBox from "../UI/MessageBox";
import useFeatureFlag from "../../hooks/useFeatureFlag";
import { getExerciseMetric } from "../../utils/utils";
import { getGoalByItem } from "../../store/redux/yourGoals";

const ProgressChart = ({
  measurementTypeId,
  measurementTypeName,
  measurementTypeMetric,
  exerciseData,
}) => {
  const [isFetching, setIsFetching] = useState(true);
  const token = useSelector((store) => store.auth.token);
  const [measurementData, setMeasurementData] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [exercise, setExercise] = useState();
  const [metric, setMetric] = useState(measurementTypeMetric);
  const [goalData, setGoalData] = useState([]);
  const exerciseList = useSelector((state) => state.exercises.exerciseList);
  const goals = useSelector((state) => state.yourGoals.goals);
  const goalsEnabled = useFeatureFlag("Goals");

  const getProgressData = async () => {
    try {
      setIsFetching(true);
      if (!exerciseData) {
        const measurementData = await getRecentMeasurementsByType(
          token,
          measurementTypeId
        );
        setMeasurementData(measurementData);
      } else {
        const exercise = getExerciseById(exerciseList, measurementTypeId);
        setExercise(exercise);
        setMetric(getExerciseMetric(exercise[0].equipment));
        setMeasurementData(exerciseData);
      }
      setIsFetching(false);
    } catch (error) {
      setErrorMessage(error);
      setIsFetching(false);
    }
  };

  const getGoalData = async () => {
    if (goalsEnabled) {
      setIsFetching(true);
      const goal = getGoalByItem(goals, measurementTypeId);
      if (goal?.length > 0) {
        const goalData = Array(measurementData?.length).fill(goal[0].value);
        setGoalData(goalData);
      }
      setIsFetching(false);
    } else {
      setGoalData([]);
    }
  };

  useEffect(() => {
    getProgressData();
  }, [token]);

  useEffect(() => {
    if (measurementData?.length > 0) {
      getGoalData();
    }
  }, [token, goalsEnabled, measurementData, goals]);

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

  if (errorMessage && !isFetching) {
    return (
      <Card>
        <ErrorOverlay message={errorMessage} />
      </Card>
    );
  }

  if (!(measurementData?.length > 1)) {
    return (
      <MessageBox
        messageSubject={`${measurementTypeName
          .charAt(0)
          .toUpperCase()}${measurementTypeName.slice(1)}`}
        messageBody={
          "You just need a little more data for this measurement so we can display your progress."
        }
      />
    );
  }

  const plotLabels = (items, interval) => {
    var count = 0;
    const labels = [];
    items.map((item) => {
      count % interval === 0 ? labels.push(item) : labels.push(" ");
      count++;
    });
    return labels;
  };

  const plotData = (items) => {
    var lastValue = 0;
    const data = [];
    items.map((item) => {
      if (item.value) {
        lastValue = item.value;
        data.push(item.value);
      }
    });
    return data;
  };

  return (
    <Card>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {exercise ? exercise[0].name : measurementTypeName}
        </Text>
      </View>
      {measurementData ? (
        <LineChart
          data={{
            labels: plotLabels(
              measurementData.map((item) => item.DateString),
              Math.ceil(measurementData?.length / 2)
            ),
            datasets: [
              {
                data: plotData(measurementData),
              },
              {
                data: goalData,
                color: (opacity = 1) => `rgba(255,183,3, ${opacity})`,
              },
            ],
            legend: goalData.length > 0 ? ["Achieved", "Goal"] : [],
          }}
          width={Dimensions.get("window").width * 0.9}
          height={220}
          yAxisSuffix={metric}
          withInnerLines={false}
          withShadow={false}
          chartConfig={{
            backgroundColor: GlobalStyles.colors.primary,
            backgroundGradientFrom: GlobalStyles.colors.primary,
            backgroundGradientTo: GlobalStyles.colors.primary,
            propsForLabels: {
              fontSize: 10,
            },
            decimalPlaces: 0,
            color: (opacity = 0.2) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          bezier
          style={{
            borderRadius: 8,
          }}
        />
      ) : (
        <ErrorOverlay message={errorMessage} />
      )}
    </Card>
  );
};

export default ProgressChart;

const styles = StyleSheet.create({
  headerContainer: {
    margin: 6,
    borderBottomColor: GlobalStyles.colors.secondary,
    borderBottomWidth: 2,
  },
  headerText: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 2,
  },
});

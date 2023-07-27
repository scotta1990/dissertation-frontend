import { FlatList, Text, StyleSheet } from "react-native";
import React from "react";
import ProgressChart from "../components/Progress/ProgressChart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LoadingOverlay from "../components/UI/LoadingOverlay";
import { getExerciseData } from "../utils/database/workouts";

const renderProgressChart = ({ item }) => {
  if (item.exerciseData.length > 1) {
    return (
      <ProgressChart
        measurementTypeId={item._id}
        measurementTypeName={item._id}
        measurementTypeMetric={"cm"}
        exerciseData={item.exerciseData}
      />
    );
  }
};

const ExerciseProgress = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [exerciseData, setExerciseData] = useState();
  const token = useSelector((store) => store.auth.token);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        const exerciseData = await getExerciseData(token);
        setExerciseData(exerciseData);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    })();
  }, [token]);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <FlatList
      data={exerciseData}
      renderItem={renderProgressChart}
      keyExtractor={(item) => item._id}
    />
  );
};

export default ExerciseProgress;

const styles = StyleSheet.create({});

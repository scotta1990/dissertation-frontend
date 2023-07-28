import { FlatList, View, Text, StyleSheet } from "react-native";
import React from "react";
import ProgressChart from "../components/Progress/ProgressChart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LoadingOverlay from "../components/UI/LoadingOverlay";
import { getExerciseData } from "../utils/database/workouts";
import { GlobalStyles } from "../constants/styles";
import Card from "../components/UI/Card";
import MessageBox from "../components/UI/MessageBox";

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

const emptyListComponent = () => {
  return (
    <MessageBox
      messageSubject={"Nothing to show just yet.."}
      messageBody={
        "Completing the same exercise a couple of times will help us show your progress!"
      }
    />
  );
};

const ExerciseProgress = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [exerciseData, setExerciseData] = useState();
  const token = useSelector((store) => store.auth.token);

  const getData = async () => {
    setIsFetching(true);
    try {
      const exerciseData = await getExerciseData(token);
      setExerciseData(exerciseData);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  };
  useEffect(() => {
    getData();
  }, [token]);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <FlatList
      data={exerciseData}
      renderItem={renderProgressChart}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={emptyListComponent}
      onRefresh={getData}
      refreshing={isFetching}
    />
  );
};

export default ExerciseProgress;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useEffect } from "react";
import { createWorkout } from "../utils/database/workouts";
import { addWorkout } from "../store/redux/workouts";
import { cancelCurrentWorkout } from "../store/redux/currentWorkout";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import Card from "../components/UI/Card";
import { SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../constants/styles";
import { convertDateToString, convertDurationToString } from "../utils/utils";
import Button from "../components/UI/Button";

const CompleteWorkout = ({ navigation }) => {
  const currentWorkout = useSelector((store) => store.currentWorkout);
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  const [isCompleting, setIsCompleting] = useState(true);
  const [error, setError] = useState();
  const [completedWorkout, setCompletedWorkout] = useState();

  const completeWorkout = async () => {
    setIsCompleting(true);
    setError(undefined);
    console.log(currentWorkout);

    const completedWorkout = {
      startDate: currentWorkout.workoutStartDate,
      endDate: currentWorkout.historical
        ? currentWorkout.workoutEndDate
        : Date.now(),
      duration: currentWorkout.duration,
      workoutItems: currentWorkout.workoutItems.map((item) => {
        return { ...item, exerciseId: item.exercise.id };
      }),
    };
    try {
      const response = await createWorkout(completedWorkout, token);
      setCompletedWorkout(completedWorkout);
      dispatch(addWorkout({ workout: completedWorkout }));
      dispatch(cancelCurrentWorkout());
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setError("Sorry, there was an issue completing your workout.");
    }
    setIsCompleting(false);
  };

  useEffect(() => {
    completeWorkout();
  }, []);

  if (isCompleting) {
    return <LoadingOverlay message={"Completing your workout..."} />;
  }

  if (error && !isCompleting) {
    return <ErrorOverlay message={error} returnTo={"CompleteWorkout"} />;
  }

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.mainContainer}>
        <Card>
          <View style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <Ionicons
                name="checkmark-circle-sharp"
                size={60}
                color={GlobalStyles.colors.successBackground}
              />
              <Text style={styles.headerText}>Great Work</Text>
              <Text style={styles.subHeaderText}>You completed a workout!</Text>
            </View>
            <View style={styles.workoutDescription}>
              <Text>
                Completed at: {convertDateToString(completedWorkout.endDate)}
              </Text>
              <Text>
                Duration: {convertDurationToString(completedWorkout.duration)}
              </Text>
              <Text>
                Exercise Count: {completedWorkout.workoutItems.length}
              </Text>
            </View>
          </View>
          <Button
            backgroundColor={GlobalStyles.colors.accent}
            onPress={() => {
              navigation.navigate("WorkoutSummary");
            }}
          >
            Go back
          </Button>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default CompleteWorkout;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 60,
  },
  innerContainer: {
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 5,
    color: GlobalStyles.colors.primary,
  },
  subHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  workoutDescription: {
    marginTop: 10,
  },
});

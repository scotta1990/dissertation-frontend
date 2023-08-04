import { StyleSheet, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import WorkoutItem from "../components/Workout/WorkoutItem";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelCurrentWorkout,
  updateCurrentWorkout,
} from "../store/redux/currentWorkout";
import { Alert } from "react-native";
import Toast from "react-native-toast-notifications";
import { useRef } from "react";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import DateInput from "../components/Historical/DateInput";
import Card from "../components/UI/Card";
import { addDateAndTime, getYesterdaysDate } from "../utils/utils";
import { useEffect } from "react";

const renderWorkoutItem = ({ item, index }) => {
  return <WorkoutItem workoutItem={item} index={index} />;
};

const renderDateSelection = (
  startDateRef,
  startTimeRef,
  endDateRef,
  endDateTime
) => {
  return (
    <Card>
      <View style={styles.dateSelectionContainer}>
        <View style={styles.dateSelection}>
          <DateInput title="Start Date" dateRef={startDateRef} />
          <DateInput
            title="Start Time"
            dateRef={startTimeRef}
            inputMode="time"
          />
        </View>
        <View style={styles.dateSelection}>
          <DateInput title="End Date  " dateRef={endDateRef} />
          <DateInput
            title="End Time  "
            dateRef={endDateTime}
            inputMode="time"
          />
        </View>
      </View>
    </Card>
  );
};

const CurrentWorkout = ({ navigation }) => {
  const historical = useSelector((store) => store.currentWorkout.historical);

  const initialMount = useRef(true);
  const historicalStartDate = useRef();
  const historicalStartTime = useRef();
  const historicalEndDate = useRef();
  const historicalEndTime = useRef();

  useEffect(() => {
    if (historical && initialMount) {
      initialMount.current = false;
      historicalStartDate.current = getYesterdaysDate();
      historicalStartTime.current = getYesterdaysDate();
      historicalEndDate.current = getYesterdaysDate();
      historicalEndTime.current = getYesterdaysDate();
    }
  }, []);

  const workoutItems = useSelector(
    (store) => store.currentWorkout.workoutItems
  );
  const dispatch = useDispatch();
  const toastRef = useRef();

  function addExerciseOnPressHandler() {
    navigation.navigate("AddWorkoutExercise");
  }

  function cancelWorkoutOnPressHandler() {
    Alert.alert(
      "Cancel Workout",
      "Are you sure you want to cancel this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => {
            dispatch(cancelCurrentWorkout());
            navigation.navigate("WorkoutSummary");
          },
        },
      ]
    );
  }

  async function finishWorkoutOnPressHandler() {
    const doneWorkoutItems = workoutItems.filter((workoutItem) => {
      return workoutItem.sets.find((set) => set.done == true);
    });

    if (doneWorkoutItems.length > 0) {
      const historicalData = {};
      if (historical) {
        historicalData.historical = true;
        historicalData.startDate = addDateAndTime(
          historicalStartDate.current,
          historicalStartTime.current
        );
        historicalData.endDate = addDateAndTime(
          historicalEndDate.current,
          historicalEndTime.current
        );
        if (historicalData.startDate >= historicalData.endDate) {
          toastRef.current.show(
            "You can't have the start datetime greater or equal to than the end datetime.",
            {
              type: "warning",
              placement: "top",
              duration: 6000,
              animationType: "zoom-in",
            }
          );
          return;
        }
        historicalData.duration =
          (historicalData.endDate - historicalData.startDate) / 1000;
        dispatch(updateCurrentWorkout(historicalData));
      }
      navigation.replace("CompleteWorkout");
    }
    toastRef.current.show(
      "You need to add some completed exercises to your workout to finish it.",
      {
        type: "warning",
        placement: "top",
        duration: 6000,
        animationType: "zoom-in",
      }
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Toast ref={toastRef} />
      <View style={styles.mainContainer}>
        {historical && (
          <Card>
            <View style={styles.dateSelectionContainer}>
              <View style={styles.dateSelection}>
                <DateInput title="Start Date" dateRef={historicalStartDate} />
                <DateInput
                  title="Start Time"
                  dateRef={historicalStartTime}
                  inputMode="time"
                />
              </View>
              <View style={styles.dateSelection}>
                <DateInput title="End Date  " dateRef={historicalEndDate} />
                <DateInput
                  title="End Time  "
                  dateRef={historicalEndTime}
                  inputMode="time"
                />
              </View>
            </View>
          </Card>
        )}
        {workoutItems.length > 0 ? (
          <KeyboardAwareFlatList
            data={workoutItems}
            keyExtractor={(item) => item.id}
            renderItem={renderWorkoutItem}
            removeClippedSubviews={false}
          />
        ) : (
          ""
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          backgroundColor={GlobalStyles.colors.primary}
          onPress={addExerciseOnPressHandler}
        >
          Add Exercise
        </Button>
        <View style={styles.buttonsRow}>
          <Button
            style={styles.buttonRow}
            backgroundColor={GlobalStyles.colors.error}
            onPress={cancelWorkoutOnPressHandler}
          >
            Cancel Workout
          </Button>
          <Button
            style={styles.buttonRow}
            backgroundColor={GlobalStyles.colors.successBackground}
            onPress={finishWorkoutOnPressHandler}
          >
            Finish Workout
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CurrentWorkout;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  buttonsContainer: {
    marginHorizontal: 8,
    marginBottom: 30,
    padding: 8,
    justifyContent: "flex-end",
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  buttonRow: {
    width: "49%",
  },
  dateSelectionContainer: {
    alignItems: "center",
  },
  dateSelection: {
    flexDirection: "row",
  },
});

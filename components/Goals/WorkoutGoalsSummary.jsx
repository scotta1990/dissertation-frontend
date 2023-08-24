import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import Card from "../UI/Card";
import WorkoutCompletedCounter from "./WorkoutCompletedCounter";
import WorkoutGoalAchievement from "./WorkoutGoalAchievement";
import { Modal } from "react-native";
import { useState } from "react";
import WorkoutGoalInput from "./WorkoutGoalInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWorkoutGoal } from "../../utils/database/goals";
import { setWeeklyWorkoutGoal } from "../../store/redux/yourGoals";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorMessage from "../UI/ErrorMessage";
import { KeyboardAvoidingView } from "react-native";

const WorkoutGoalsSummary = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const token = useSelector((store) => store.auth.token);
  const [modalVisible, setModalVisible] = useState(false);
  const weeklyWorkoutGoal = useSelector(
    (store) => store.yourGoals.weeklyWorkoutGoal
  );
  const dispatch = useDispatch();

  const getGoal = async () => {
    setIsFetching(true);
    setError();
    if (token) {
      try {
        const goal = await getWorkoutGoal(token);
        dispatch(setWeeklyWorkoutGoal({ weeklyWorkoutGoal: goal[0].value }));
      } catch (error) {
        setError(
          "Error collecting your workout goal right now... try again later"
        );
      }
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getGoal();
  }, [token]);

  const changeModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  if (error && !isFetching) {
    return (
      <ErrorMessage
        title={"Workout Goal"}
        message={error}
        retryFunction={getGoal}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay message={"Collecting your workout goal..."} />;
  }

  return (
    <View style={styles.outerContainer}>
      <Modal visible={modalVisible} transparent={true}>
        <KeyboardAvoidingView behavior="height" style={styles.modalContainer}>
          <WorkoutGoalInput
            currentGoalValue={weeklyWorkoutGoal}
            changeVisibility={changeModalVisibility}
          />
        </KeyboardAvoidingView>
      </Modal>
      <View style={styles.workoutGoalSummaryContainer}>
        <Text style={styles.goalHeaderText}>Your Workout Goal</Text>
        <View style={styles.workoutGoalSummaryInnerContainer}>
          <WorkoutCompletedCounter />
          <WorkoutGoalAchievement />
        </View>
      </View>
      <Card style={styles.editWorkoutGoalContainer}>
        <Text style={styles.editWorkoutGoalText}>
          Your Weekly Workout goal is set to:
        </Text>
        <Text style={styles.editWorkoutGoalCount}>{weeklyWorkoutGoal}</Text>
        <Button
          backgroundColor={GlobalStyles.colors.primary}
          textStyle={styles.editButtonText}
          style={styles.editButton}
          onPress={changeModalVisibility}
        >
          Edit Goal
        </Button>
      </Card>
    </View>
  );
};

export default WorkoutGoalsSummary;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
  },
  workoutGoalSummaryContainer: {
    flex: 3,
  },
  workoutGoalSummaryInnerContainer: {
    // flexDirection: "row",
    marginRight: 12,
    marginVertical: 8,
  },
  goalHeaderText: {
    fontWeight: "bold",
  },
  editWorkoutGoalContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  editWorkoutGoalText: {
    fontSize: 11,
    color: GlobalStyles.colors.primary,
    textAlign: "center",
  },
  editWorkoutGoalCount: {
    fontSize: 32,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  editButton: {
    marginTop: 5,
  },
  editButtonText: {
    fontSize: 12,
  },
  modalContainer: {
    alignItems: "center",
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryWhite + "E6",
  },
});

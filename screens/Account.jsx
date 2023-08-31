import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import Card from "../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { startWorkout } from "../store/redux/currentWorkout";
import { logout } from "../store/redux/auth";
import FeatureFlagsAdmin from "../components/FeatureFlags/FeatureFlagsAdmin";
import { ScrollView } from "react-native";

const Account = ({ navigation }) => {
  const workoutInProgress = useSelector(
    (store) => store.currentWorkout.workoutInProgress
  );
  const userRole = useSelector((store) => store.auth.userRole);

  const dispatch = useDispatch();
  const workoutPressHandler = () => {
    if (workoutInProgress) {
      navigation.navigate("CurrentWorkout");
    } else {
      dispatch(startWorkout({ historical: true }));
      navigation.navigate("CurrentWorkout");
    }
  };

  const measurementPressHandler = () => {
    navigation.navigate("UpdateYourMeasurements", {
      historical: true,
    });
  };

  const logoutPressHandler = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.mainContainer}>
        <Card>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Historical Input</Text>
            <Text>
              Add your historical data so you can view this in your progress.
            </Text>
          </View>
          <Button
            backgroundColor={GlobalStyles.colors.secondary}
            style={styles.button}
            onPress={workoutPressHandler}
          >
            Workout
          </Button>
          <Button
            backgroundColor={GlobalStyles.colors.secondary}
            style={styles.button}
            onPress={measurementPressHandler}
          >
            Measurement
          </Button>
        </Card>
        {userRole === "Admin" ? <FeatureFlagsAdmin /> : ""}
      </ScrollView>
      <View style={styles.logoutContainer}>
        <Button
          style={styles.logoutButton}
          backgroundColor={GlobalStyles.colors.error}
          onPress={logoutPressHandler}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    marginLeft: 8,
    paddingLeft: 8,
  },
  headerText: {
    fontWeight: "bold",
  },
  button: {
    margin: 8,
  },
  logoutContainer: {
    flex: 0.18,
    justifyContent: "flex-end",
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 8,
  },
  logoutButton: {
    margin: 10,
    marginTop: 0,
  },
});

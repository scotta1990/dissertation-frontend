import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import Card from "../components/UI/Card";

const Account = ({ navigation }) => {
  const measurementTestMenuPressHandler = () => {
    navigation.navigate("UpdateYourMeasurements", {
      testing: true,
    });
  };

  return (
    <View style={styles.mainContainer}>
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
        >
          Workout
        </Button>
        <Button
          backgroundColor={GlobalStyles.colors.secondary}
          style={styles.button}
          onPress={measurementTestMenuPressHandler}
        >
          Measurement
        </Button>
      </Card>
      <View style={styles.logoutContainer}>
        <Button backgroundColor={GlobalStyles.colors.error}>Logout</Button>
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
    flex: 1,
    justifyContent: "flex-end",
    margin: 8,
    padding: 8,
  },
});

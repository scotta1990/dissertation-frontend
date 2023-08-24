import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import { SafeAreaView } from "react-native";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import YourMeasurementsList from "../components/YourMeasurements/YourMeasurementsList";
import { combineMeasurementsAndTypes } from "../utils/utils";
import {
  getMeasurementTypes,
  getMeasurementsProfile,
} from "../utils/database/yourMeasurements";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMeasurementTypes,
  setMeasurementsProfile,
} from "../store/redux/yourMeasurements";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const YouSummary = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(true);
  const token = useSelector((store) => store.auth.token);
  const measurementTypes = useSelector(
    (store) => store.yourMeasurements.measurementTypes
  );
  const measurementsProfile = useSelector(
    (store) => store.yourMeasurements.measurementsProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        const measurementTypes = await getMeasurementTypes(token);
        dispatch(setMeasurementTypes({ measurementTypes: measurementTypes }));

        const measurementsProfile = await getMeasurementsProfile(token);
        dispatch(
          setMeasurementsProfile({
            measurementsProfile: combineMeasurementsAndTypes(
              measurementsProfile,
              measurementTypes
            ),
          })
        );
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    })();
  }, [token]);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  function updateButtonPressHandler() {
    navigation.navigate("UpdateYourMeasurements");
  }

  function accountButtonPressHandler() {
    navigation.navigate("Account");
  }

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.yourMeasurementsContainer}>
        <Card>
          <View style={styles.yourMeasurementsHeaderContainer}>
            <Text style={styles.yourMeasurementsHeaderText}>
              Your Measurements
            </Text>
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              backgroundColor={GlobalStyles.colors.primary}
              onPress={updateButtonPressHandler}
            >
              Update
            </Button>
          </View>
          <YourMeasurementsList yourMeasurements={measurementsProfile} />
        </Card>
      </View>
      <View style={styles.youMenu}>
        <Button
          style={styles.button}
          backgroundColor={GlobalStyles.colors.primary}
          onPress={accountButtonPressHandler}
        >
          Account
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default YouSummary;

const styles = StyleSheet.create({
  yourMeasurementsContainer: {
    flex: 5,
  },
  yourMeasurementsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 8,
    paddingLeft: 8,
  },
  yourMeasurementsHeaderText: {
    fontWeight: "bold",
  },
  youMenu: {
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 8,
    justifyContent: "flex-end",
    flex: 1,
  },
  button: {
    margin: 10,
    marginTop: 0,
  },
  buttonText: {
    fontSize: 10,
  },
});

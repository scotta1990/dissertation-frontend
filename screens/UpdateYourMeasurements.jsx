import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import YourMeasurementsList from "../components/YourMeasurements/YourMeasurementsList";
import { GlobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/UI/Button";
import {
  createMeasurement,
  getMeasurementsProfile,
} from "../utils/database/yourMeasurements";
import { setMeasurementsProfile } from "../store/redux/yourMeasurements";
import { combineMeasurementsAndTypes } from "../utils/utils";
import DateInput from "../components/Historical/DateInput";
import { useRef } from "react";

const UpdateYourMeasurements = ({ navigation, route }) => {
  const { historical } = route?.params;

  const measurementsProfile = useSelector(
    (store) => store.yourMeasurements.measurementsProfile
  );
  const measurementTypes = useSelector(
    (store) => store.yourMeasurements.measurementTypes
  );
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const [inputs, setInputs] = useState({});
  const dateInput = useRef();

  useEffect(() => {
    if (historical) {
      dateInput.current = new Date();
    }
  }, []);

  async function onPressSubmitHandler() {
    const submit = async (key, value) => {
      try {
        const newMeasurement = {
          measurementTypeId: key,
          value: value,
        };

        if (historical) {
          newMeasurement.dateCreated = dateInput.current;
        }
        const response = await createMeasurement(token, newMeasurement);
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
    };

    Object.entries(inputs).forEach(([key, value]) => {
      submit(key, value);
    });
    navigation.goBack();
  }

  return (
    <View style={styles.mainContainer}>
      {historical && <DateInput dateRef={dateInput} />}
      <YourMeasurementsList
        yourMeasurements={measurementsProfile}
        isUpdatable={true}
        setMeasurements={setInputs}
      />
      <Button
        backgroundColor={GlobalStyles.colors.accent}
        onPress={onPressSubmitHandler}
        style={styles.button}
      >
        Submit
      </Button>
    </View>
  );
};

export default UpdateYourMeasurements;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primaryWhite,
  },
  button: {
    margin: 8,
    padding: 8,
  },
});

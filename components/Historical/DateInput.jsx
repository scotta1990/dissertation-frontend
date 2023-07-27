import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const DateInput = ({ dateInput, setDateInput }) => {
  const [pickerVisible, setPickerVisible] = useState(false);

  function datePickerChange(event, date) {
    setDateInput(date);
    setPickerVisible(false);
  }

  console.log(pickerVisible);

  return (
    <View style={styles.dateInputContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>DATE SELECTION</Text>
      </View>
      <Button
        textStyle={styles.buttonText}
        onPress={() => {
          setPickerVisible(true);
        }}
      >
        {dateInput.toLocaleDateString("en-gb")}
      </Button>
      {pickerVisible ? (
        <DateTimePicker
          value={dateInput}
          onChange={datePickerChange}
          onLayout={() => {
            setPickerVisible(false);
          }}
        />
      ) : (
        ""
      )}
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 12,
    padding: 8,
    borderColor: GlobalStyles.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  titleText: {
    color: GlobalStyles.colors.primaryBlack,
    fontWeight: "bold",
  },
  buttonText: {
    color: GlobalStyles.colors.primaryBlack,
  },
});

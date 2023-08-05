import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { Platform } from "react-native";
import { getYesterdaysDate } from "../../utils/utils";

const DateInput = ({
  dateRef,
  title = "Entry Date",
  inputMode = "date",
  future = false,
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState(inputMode);
  const [show, setShow] = useState(Platform.OS === "ios");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    dateRef.current = currentDate;
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.dateInputContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {Platform.OS !== "ios" && (
        <Button textStyle={styles.buttonText} onPress={() => showMode(mode)}>
          {mode === "date"
            ? date.toLocaleDateString("en-gb")
            : date.toLocaleTimeString("en-gb")}
        </Button>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={getYesterdaysDate()}
        />
      )}
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 2,
    paddingHorizontal: 8,
    borderColor: GlobalStyles.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  titleText: {
    color: GlobalStyles.colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonText: {
    color: GlobalStyles.colors.primaryBlack,
  },
});

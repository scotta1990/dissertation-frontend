import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

const YourMeasurementUpdateTile = ({ measurement, setMeasurements }) => {
  const placeholderValue = measurement.measurements
    ? measurement.measurements[
        measurement.measurements.length - 1
      ].value.toString()
    : "-";

  const [measurementInputText, setMeasurementInputText] = useState("");

  function changeInputText(input) {
    setMeasurementInputText(input);
    setMeasurements((prev) => {
      return {
        ...prev,
        [measurement.measurementType._id]: input,
      };
    });
  }

  return (
    <View style={styles.measurementContainer}>
      <View style={styles.measurementInnerContainer}>
        <View style={styles.measurementTitleTextContainer}>
          <Text
            style={[
              styles.measurementTitleText,
              styles.measurementTitleTextCapitalize,
            ]}
          >
            {measurement.measurementType.name}
          </Text>
          <Text style={styles.measurementTitleText}>
            {" "}
            ({measurement.measurementType.metric})
          </Text>
        </View>
        <View style={styles.measurementValuesContainer}>
          <TextInput
            style={styles.measurementValueText}
            keyboardType="numeric"
            value={measurementInputText}
            onChangeText={changeInputText}
            placeholder={placeholderValue}
            placeholderTextColor={GlobalStyles.colors.secondary}
          />
          <Text
            style={[
              styles.measurementValueText,
              { textAlignVertical: "bottom" },
              placeholderValue !== "-" &&
                measurementInputText === "" && {
                  color: GlobalStyles.colors.secondary,
                },
            ]}
          >
            {placeholderValue === "-" && measurementInputText === ""
              ? ""
              : measurement.measurementType.metric}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default YourMeasurementUpdateTile;

const styles = StyleSheet.create({
  measurementContainer: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
  },
  measurementInnerContainer: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  measurementTitleTextContainer: {
    flexDirection: "row",
  },
  measurementTitleText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  measurementTitleTextCapitalize: {
    textTransform: "capitalize",
  },
  measurementValuesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  measurementValueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primaryBlack,
  },
});

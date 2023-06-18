import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

const YourMeasurementUpdateTile = ({ measurement }) => {
  const placeholderValue = measurement.measurements
    ? measurement.measurements[0].value.toString()
    : "-";

  const [measurementInputText, setMeasurementInputText] = useState("");

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
            onChangeText={setMeasurementInputText}
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

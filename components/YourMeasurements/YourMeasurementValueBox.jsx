import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const YourMeasurementValueBox = ({
  title,
  value,
  metric,
  style,
  valueTextStyle,
  titleTextStyle,
  backgroundColor = GlobalStyles.colors.secondary,
  textColor = "white",
  flat = false,
}) => {
  return (
    <View
      style={[
        styles.measurementValueContainer,
        !flat && { backgroundColor: backgroundColor },
        { borderWidth: 2.5, borderColor: backgroundColor },
        style,
      ]}
    >
      <Text
        style={[
          styles.measurementValueText,
          { color: flat ? backgroundColor : textColor },
          valueTextStyle,
        ]}
      >
        {value}
        {metric}
      </Text>
      <Text
        style={[
          styles.measurementValueTitleText,
          { color: flat ? backgroundColor : textColor },
          titleTextStyle,
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default YourMeasurementValueBox;

const styles = StyleSheet.create({
  measurementValueContainer: {
    flex: 1,
    margin: 10,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  measurementValueText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  measurementValueTitleText: {
    fontSize: 12,
  },
});

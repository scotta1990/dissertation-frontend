import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const YourMeasurementTile = ({ measurement }) => {
  const [collapsed, setCollapsed] = useState(true);

  const CollapsedContent = () => {
    return (
      <View style={styles.collapsedInnerContainer}>
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
        <Text style={styles.measurementValueText}>
          {measurement.measurements
            ? measurement.measurements[measurement.measurements.length - 1]
                .value + measurement.measurementType.metric
            : "-"}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.measurementContainer,
        collapsed && styles.collapsedContainer,
      ]}
    >
      {collapsed ? <CollapsedContent /> : ""}
      <Pressable
        onPress={() => {
          collapsed ? setCollapsed(false) : setCollapsed(true);
        }}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="chevron-down" size={17} />
        </View>
      </Pressable>
    </View>
  );
};

export default YourMeasurementTile;

const styles = StyleSheet.create({
  measurementContainer: {
    margin: 8,
    marginVertical: 13,
    paddingHorizontal: 10,
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
  },
  collapsedContainer: {
    borderTopWidth: 0,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  collapsedInnerContainer: {
    marginHorizontal: 12,
    marginTop: 8,
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
  measurementValueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.secondary,
  },
  iconContainer: {
    marginTop: -10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

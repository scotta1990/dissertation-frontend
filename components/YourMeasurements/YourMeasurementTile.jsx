import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import Animated, { BounceIn } from "react-native-reanimated";
import { useEffect, useState } from "react";
import YourMeasurementValueBox from "./YourMeasurementValueBox";
import Feature from "../FeatureFlags/Feature";
import { useSelector } from "react-redux";
import { getGoalByItemId } from "../../utils/database/goals";

const YourMeasurementTile = ({ measurement }) => {
  const token = useSelector((store) => store.auth.token);
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState();
  const [previous, setPrevious] = useState();
  const [goal, setGoal] = useState();

  useEffect(() => {
    (async () => {
      try {
        const goal = await getGoalByItemId(
          token,
          measurement.measurementType._id
        );
        if (goal.length > 0) {
          setGoal({ title: "Goal", ...goal[0] });
        }
      } catch (error) {
        console.log(error);
      }
    })();

    if (!measurement.measurements) {
      setCurrent({ title: "No measurement yet", value: "-", metric: "" });
      return;
    }

    if (measurement.measurements.length == 1) {
      setCurrent({ title: "Current", ...measurement.measurements[0] });
      return;
    }

    setCurrent({ title: "Current", ...measurement.measurements[1] });
    setPrevious({ title: "Previous", ...measurement.measurements[0] });
  }, [measurement]);

  const CollapsedContent = () => {
    return (
      <Animated.View
        entering={BounceIn}
        style={[styles.innerContainer, styles.collapsedInnerContainer]}
      >
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
      </Animated.View>
    );
  };

  const UncollapsedContent = () => {
    return (
      <Animated.View entering={BounceIn} style={[styles.innerContainer]}>
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
        <View style={styles.measurementValueBoxesContainer}>
          {previous ? (
            <YourMeasurementValueBox
              title={previous.title}
              value={previous.value}
              metric={previous.metric}
              flat={true}
              valueTextStyle={{ fontSize: 17 }}
              style={{ flex: 0.7 }}
            />
          ) : (
            ""
          )}
          <YourMeasurementValueBox
            title={current.title}
            value={current.value}
            metric={current.metric}
            backgroundColor={GlobalStyles.colors.primary}
          />
          <Feature name={"Goals"}>
            {goal ? (
              <YourMeasurementValueBox
                title={goal.title}
                value={goal.value}
                metric={current.metric}
                valueTextStyle={{ fontSize: 17 }}
                flat={true}
                backgroundColor={GlobalStyles.colors.primaryGoal}
                style={{ flex: 0.7 }}
              />
            ) : null}
          </Feature>
        </View>
      </Animated.View>
    );
  };

  return (
    <View
      style={[
        styles.measurementContainer,
        collapsed && styles.collapsedContainer,
      ]}
    >
      {collapsed ? <CollapsedContent /> : <UncollapsedContent />}
      <Pressable
        onPress={() => {
          collapsed ? setCollapsed(false) : setCollapsed(true);
        }}
      >
        <View style={[styles.iconContainer, { marginTop: -2 }]}>
          {collapsed ? (
            <Ionicons name="chevron-down" size={22} />
          ) : (
            <Ionicons name="chevron-up" size={22} />
          )}
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
  innerContainer: {
    marginHorizontal: 12,
    marginTop: 8,
  },
  collapsedInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  measurementTitleTextContainer: {
    flexDirection: "row",
  },
  measurementTitleText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.primaryBlack,
  },
  measurementTitleTextCapitalize: {
    textTransform: "capitalize",
  },
  measurementValueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.secondary,
  },
  measurementValueBoxesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginTop: -10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

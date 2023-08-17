import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "../UI/Card";
import { Switch } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFeatureById } from "../../utils/database/features";
import { toggleFeature } from "../../store/redux/features";

const FeatureSwitch = ({
  id,
  token,
  title,
  description,
  initialSwitchState,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialSwitchState);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const toggleSwitch = async () => {
    setIsUpdating(true);
    setIsEnabled((prev) => !prev);
    try {
      await toggleFeatureById(token, id);
    } catch (error) {
      console.log(error);
    }
    dispatch(toggleFeature({ id: id }));
    setIsUpdating(false);
  };

  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchTextContainer}>
        <Text style={styles.switchTitleText}>{title}</Text>
        <Text style={styles.switchDescriptionText}>{description}</Text>
      </View>
      <Switch
        disabled={isUpdating}
        trackColor={{
          true: GlobalStyles.colors.secondary,
        }}
        thumbColor={isEnabled ? GlobalStyles.colors.primary : "#f4f3f4"}
        value={isEnabled}
        onValueChange={toggleSwitch}
      />
    </View>
  );
};

const FeatureFlagsAdmin = () => {
  const features = useSelector((store) => store.features.features);
  const token = useSelector((store) => store.auth.token);
  return (
    <Card>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Feature Flags</Text>
        <Text>
          Admin access to change app wide feature flags. This will be reflected
          across all users.
        </Text>
        {features.map((feature) => (
          <FeatureSwitch
            id={feature._id}
            token={token}
            title={feature.name}
            description={feature.description}
            initialSwitchState={feature.active}
          />
        ))}
      </View>
    </Card>
  );
};

export default FeatureFlagsAdmin;

const styles = StyleSheet.create({
  headerContainer: {
    marginLeft: 8,
    paddingLeft: 8,
  },
  headerText: {
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
    alignItems: "center",
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
  },
  switchTextContainer: {
    margin: 8,
    width: "80%",
  },
  switchTitleText: {
    fontWeight: "bold",
  },
  switchDescriptionText: {
    flexWrap: "wrap",
    flexShrink: 1,
    fontSize: 11,
  },
});

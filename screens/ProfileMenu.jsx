import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import BodyMeasurementsList from "../components/BodyMeasurements/BodyMeasurementsList";
import { GlobalStyles } from "../constants/styles";

const ProfileMenu = ({ navigation }) => {
  function measurementPressHandler() {
    navigation.navigate("Measurements");
  }

  return (
    <View style={styles.mainContainer}>
      <Button
        title="Your Measurements"
        onPress={measurementPressHandler}
        color={GlobalStyles.colors.primary}
      />
    </View>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 16,
    padding: 5,
  },
});

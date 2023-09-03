import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const SpecificGoalSelectorView = ({ children, onCancellation }) => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.selectorViewMainContainer}>
        <View style={styles.selectorViewHeaderTextContainer}>
          <Text style={styles.selectorViewHeaderText}>
            Select the item you want to add a goal for
          </Text>
        </View>
        {children}
      </View>
      <View style={styles.selectorViewButtonContainer}>
        <Button
          onPress={onCancellation}
          backgroundColor={GlobalStyles.colors.error}
        >
          Cancel Selection
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SpecificGoalSelectorView;

const styles = StyleSheet.create({
  selectorViewMainContainer: {
    flex: 12,
  },
  selectorViewButtonContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 8,
  },
  selectorViewHeaderTextContainer: {
    backgroundColor: GlobalStyles.colors.primary,
    padding: 12,
  },
  selectorViewHeaderText: {
    paddingVertical: 5,
    fontSize: 18,
    color: GlobalStyles.colors.primaryWhite,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import Card from "../UI/Card";

const SpecificGoalRecommendation = ({ recentAchievement, recommendation }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.text, styles.headerText]}>Goal Support</Text>
      <Text style={styles.text}>
        Information to support you setting your goal
      </Text>
      <View style={styles.innerContainer}>
        <Card style={styles.dataContainer}>
          <Text style={styles.dataTextTitle}>Most Recent</Text>
          <Text style={styles.dataText}>{Math.round(recentAchievement)}</Text>
        </Card>
        {recommendation && (
          <Card style={styles.dataContainer}>
            <Text style={styles.dataTextTitle}>Recommendation</Text>
            <Text style={styles.dataText}>{Math.round(recommendation)}</Text>
          </Card>
        )}
      </View>
      <View style={styles.infoButtonContainer}>
        <Button
          style={styles.infoButton}
          backgroundColor={GlobalStyles.colors.secondary}
          textStyle={styles.infoButtonText}
          onPress={() => {
            setInfoVisible((prev) => {
              return !prev;
            });
          }}
        >
          More Info
        </Button>
      </View>
      {infoVisible && (
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>
            <Text style={{ fontWeight: "bold" }}>Most Recent </Text>
            is the average or absolute of your most recent input in a workout or
            measurement.
          </Text>
          <Text style={styles.infoText}>
            <Text style={{ fontWeight: "bold" }}>Recommendation </Text>
            is just a guidance. You should work slowly towards this go, one
            small step at a time!
          </Text>
        </View>
      )}
    </View>
  );
};

export default SpecificGoalRecommendation;

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: GlobalStyles.colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerText: {
    fontWeight: "bold",
  },
  text: {
    marginHorizontal: 15,
    marginTop: 5,
    fontSize: 12,
  },
  dataContainer: {
    margin: 10,
    padding: 8,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  dataText: {
    fontSize: 22,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  dataTextTitle: {
    fontSize: 9,
  },
  infoButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  infoButton: {
    marginHorizontal: 18,
    marginBottom: 8,
    width: "20%",
  },
  infoButtonText: {
    fontSize: 7,
  },
  infoTextContainer: {
    margin: 10,
    padding: 5,
  },
  infoText: {
    fontSize: 10,
    fontStyle: "italic",
    marginVertical: 3,
  },
});

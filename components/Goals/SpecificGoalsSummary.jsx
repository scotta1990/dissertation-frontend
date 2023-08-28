import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import Card from "../UI/Card";
import { useNavigation } from "@react-navigation/native";

const SpecificGoalCard = ({ title, goalCount, onPress }) => {
  return (
    <Card style={styles.specificGoalCard}>
      <Text style={styles.specificGoalCardTitleText}>{title}</Text>
      <Text style={styles.specificGoalCardCountText}>
        {goalCount} <Text style={styles.specificGoalCardText}>set</Text>
      </Text>
      <Button
        style={styles.viewGoalsCardButton}
        textStyle={styles.viewGoalsCardButtonText}
        backgroundColor={GlobalStyles.colors.accent}
        onPress={onPress}
      >
        View Goals
      </Button>
    </Card>
  );
};

const SpecificGoalsSummary = () => {
  const navigation = useNavigation();

  return (
    <>
      <Text style={styles.mainHeaderText}>Your Goals</Text>
      <View style={styles.mainContainer}>
        <SpecificGoalCard
          title={"Measurement Goals"}
          goalCount={2}
          onPress={() => {
            navigation.navigate("SpecificGoals", { type: "measurement" });
          }}
        />
        <SpecificGoalCard
          title={"Exercise Goals"}
          goalCount={5}
          onPress={() => {
            navigation.navigate("SpecificGoals", { type: "exercise" });
          }}
        />
      </View>
    </>
  );
};

export default SpecificGoalsSummary;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
  },
  mainHeaderText: {
    fontWeight: "bold",
  },
  specificGoalCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  specificGoalCardTitleText: {
    color: GlobalStyles.colors.primary,
  },
  specificGoalCardCountText: {
    fontSize: 32,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
    marginVertical: 5,
  },
  specificGoalCardText: {
    fontSize: 12,
    fontWeight: "normal",
  },
  viewGoalsCardButton: {
    marginTop: 5,
  },
  viewGoalsCardButtonText: {
    fontSize: 12,
  },
});

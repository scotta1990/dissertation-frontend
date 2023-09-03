import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalSummary from "../screens/GoalSummary";
import SpecificGoals from "../screens/SpecificGoals";
import SpecificGoalManagement from "../screens/SpecificGoalManagement";
import { GlobalStyles } from "../constants/styles";

const Stack = createNativeStackNavigator();

const GoalNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GoalSummary"
        component={GoalSummary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpecificGoals"
        component={SpecificGoals}
        options={({ route }) => ({
          title:
            route.params.type[0].toUpperCase() +
            route.params.type.slice(1) +
            " Goals",
          headerStyle: { backgroundColor: GlobalStyles.colors.primary },
          headerTintColor: GlobalStyles.colors.primaryWhite,
        })}
      />
      <Stack.Screen
        name="SpecificGoalManagement"
        component={SpecificGoalManagement}
        options={{
          title: "Goal Management",
          headerTintColor: GlobalStyles.colors.primary,
        }}
      />
    </Stack.Navigator>
  );
};

export default GoalNavigation;

const styles = StyleSheet.create({});

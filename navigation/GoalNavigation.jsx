import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalSummary from "../screens/GoalSummary";

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
    </Stack.Navigator>
  );
};

export default GoalNavigation;

const styles = StyleSheet.create({});

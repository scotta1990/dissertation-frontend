import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkoutSummary from "../screens/WorkoutSummary";
import ProfileNavigation from "./ProfileNavigation";

const Tab = createBottomTabNavigator();

const CoreNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Workout" component={WorkoutSummary} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

export default CoreNavigation;

const styles = StyleSheet.create({});

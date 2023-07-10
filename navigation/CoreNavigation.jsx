import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkoutSummary from "../screens/WorkoutSummary";
import YouNavigation from "./YouNavigation";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import Progress from "../screens/Progress";

const Tab = createBottomTabNavigator();

const CoreNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: GlobalStyles.colors.primary,
        tabBarInactiveTintColor: GlobalStyles.colors.secondary,
        // tabBarStyle: { height: 90 },
      }}
    >
      <Tab.Screen
        name="Workout"
        component={WorkoutSummary}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="You"
        component={YouNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={35} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CoreNavigation;

const styles = StyleSheet.create({});

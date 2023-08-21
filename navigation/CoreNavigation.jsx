import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkoutSummary from "../screens/WorkoutSummary";
import YouNavigation from "./YouNavigation";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import ProgressNavigation from "./ProgressNavigation";

import useFeatureFlag from "../hooks/useFeatureFlag";
import GoalNavigation from "./GoalNavigation";

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
      {useFeatureFlag("Progress") ? (
        <Tab.Screen
          name="YourProgress"
          component={ProgressNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics-outline" size={35} color={color} />
            ),
            headerShown: true,
            title: "Your Progress",
            headerStyle: { backgroundColor: GlobalStyles.colors.primary },
            headerTintColor: GlobalStyles.colors.primaryWhite,
          }}
        />
      ) : null}
      <Tab.Screen
        name="Goals"
        component={GoalNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ribbon-outline" size={35} color={color} />
          ),
          title: "Goals",
        }}
      />
      <Tab.Screen
        name="YourProgress"
        component={ProgressNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={35} color={color} />
          ),
          headerShown: true,
          title: "Progress",
          headerStyle: { backgroundColor: GlobalStyles.colors.primary },
          headerTintColor: GlobalStyles.colors.primaryWhite,
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

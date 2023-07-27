import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import MeasurementProgress from "../screens/MeasurementProgress";
import ExerciseProgress from "../screens/ExerciseProgress";
import { GlobalStyles } from "../constants/styles";

const Tab = createMaterialTopTabNavigator();

const ProgressNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary },
        tabBarActiveTintColor: GlobalStyles.colors.primaryWhite,
      }}
    >
      <Tab.Screen
        name="MeasurementProgress"
        component={MeasurementProgress}
        options={{
          title: "Measurements",
          tabBarIndicatorStyle: { backgroundColor: GlobalStyles.colors.accent },
        }}
      />
      <Tab.Screen
        name="ExerciseProgress"
        component={ExerciseProgress}
        options={{
          title: "Exercises",
          tabBarIndicatorStyle: { backgroundColor: GlobalStyles.colors.accent },
        }}
      />
    </Tab.Navigator>
  );
};

export default ProgressNavigation;

const styles = StyleSheet.create({});

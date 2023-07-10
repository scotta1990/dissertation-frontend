import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import Progress from "../screens/Progress";
import { GlobalStyles } from "../constants/styles";

const Tab = createMaterialTopTabNavigator();

const ProgressNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MeasurementProgress"
        component={Progress}
        options={{
          title: "Measurements",
          tabBarIndicatorStyle: { backgroundColor: GlobalStyles.colors.accent },
        }}
      />
      <Tab.Screen
        name="ExerciseProgress"
        component={Progress}
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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import WorkoutSummary from "../screens/WorkoutSummary";
import CurrentWorkout from "../screens/CurrentWorkout";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import WorkoutNavigationHeader from "../components/Workout/WorkoutNavigationHeader";
import CoreNavigation from "./CoreNavigation";
import ExercisesContextProvider from "../store/exercise-context";
import AddWorkoutExercise from "../screens/AddWorkoutExercise";
const Stack = createNativeStackNavigator();

const WorkoutNavigation = () => {
  return (
    <ExercisesContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary },
          headerTintColor: GlobalStyles.colors.primaryWhite,
        }}
      >
        <Stack.Screen
          name="WorkoutSummary"
          component={CoreNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CurrentWorkout"
          component={CurrentWorkout}
          options={{
            title: "",
            headerTitle: ({ title }) => <WorkoutNavigationHeader />,
            headerRight: () => (
              <Button
                backgroundColor={GlobalStyles.colors.successBackground}
                textStyle={{ fontSize: 12 }}
                style={{ minWidth: 90 }}
              >
                Finish
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="AddWorkoutExercise"
          component={AddWorkoutExercise}
          options={{ title: "Select Exercise" }}
        />
      </Stack.Navigator>
    </ExercisesContextProvider>
  );
};

export default WorkoutNavigation;

const styles = StyleSheet.create({});

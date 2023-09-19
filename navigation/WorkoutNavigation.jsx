import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import CurrentWorkout from "../screens/CurrentWorkout";
import { GlobalStyles } from "../constants/styles";
import WorkoutNavigationHeader from "../components/Workout/WorkoutNavigationHeader";
import CoreNavigation from "./CoreNavigation";
import AddWorkoutExercise from "../screens/AddWorkoutExercise";
import CompleteWorkout from "../screens/CompleteWorkout";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getFeatures } from "../utils/database/features";
import { useEffect } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { setFeatures } from "../store/redux/features";

const Stack = createNativeStackNavigator();

const WorkoutNavigation = () => {
  const [isFetching, setIsFetching] = useState(true);

  const dispatch = useDispatch();

  const initFeatures = async () => {
    setIsFetching(true);
    try {
      const features = await getFeatures();
      dispatch(setFeatures({ features: features }));
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    initFeatures();
  }, []);

  if (isFetching) {
    return <LoadingOverlay message={"Setting up your workout experience..."} />;
  }

  return (
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
        options={() => ({
          title: "",
          headerTitle: () => <WorkoutNavigationHeader />,
          // headerRight: () => (
          //   <Button
          //     backgroundColor={GlobalStyles.colors.successBackground}
          //     textStyle={{ fontSize: 12 }}
          //     style={{ minWidth: 90 }}
          //     onPress={finishWorkoutOnPressHandler}
          //   >
          //     Finish
          //   </Button>
          // ),
        })}
      />
      <Stack.Screen
        name="AddWorkoutExercise"
        component={AddWorkoutExercise}
        options={{ title: "Select Exercise" }}
      />
      <Stack.Screen
        name="CompleteWorkout"
        component={CompleteWorkout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutNavigation;

const styles = StyleSheet.create({});

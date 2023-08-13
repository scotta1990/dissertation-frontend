import { configureStore } from "@reduxjs/toolkit";

import currentWorkoutReducer from "./currentWorkout";
import exercisesReducer from "./exercises";
import workoutsReducer from "./workouts";
import authReducer from "./auth";
import yourMeasurementReducer from "./yourMeasurements";
import yourGoals from "./yourGoals";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutsReducer,
    currentWorkout: currentWorkoutReducer,
    exercises: exercisesReducer,
    yourMeasurements: yourMeasurementReducer,
    yourGoals: yourGoals,
  },
});

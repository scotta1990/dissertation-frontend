import { configureStore } from "@reduxjs/toolkit";

import currentWorkoutReducer from "./currentWorkout";
import exercisesReducer from "./exercises";
import workoutsReducer from "./workouts";
import authReducer from "./auth";
import yourMeasurementReducer from "./yourMeasurements";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutsReducer,
    currentWorkout: currentWorkoutReducer,
    exercises: exercisesReducer,
    yourMeasurements: yourMeasurementReducer,
  },
});

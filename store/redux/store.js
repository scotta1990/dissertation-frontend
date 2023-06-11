import { configureStore } from "@reduxjs/toolkit";

import currentWorkoutReducer from "./currentWorkout";
import exercisesReducer from "./exercises";
import workoutsReducer from "./workouts";

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    currentWorkout: currentWorkoutReducer,
    exercises: exercisesReducer,
  },
});

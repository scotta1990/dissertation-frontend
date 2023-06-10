import { configureStore } from "@reduxjs/toolkit";

import currentWorkoutReducer from "./currentWorkout";
import exercisesReducer from "./exercises";

export const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer,
    exercises: exercisesReducer,
  },
});

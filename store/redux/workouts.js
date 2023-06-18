import { createSlice } from "@reduxjs/toolkit";

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    workoutsList: [],
  },
  reducers: {
    addWorkout: (state, action) => {
      console.log(action.payload.workout);
      console.log(action.payload.workout.workoutItems[0]);
      state.workoutsList.push(action.payload.workout);
    },
  },
});

export const { addWorkout } = workoutsSlice.actions;
export default workoutsSlice.reducer;

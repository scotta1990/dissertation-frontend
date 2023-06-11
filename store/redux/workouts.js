import { createSlice } from "@reduxjs/toolkit";

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    workoutsList: [],
  },
  reducers: {
    addWorkout: (state, action) => {
      state.workoutsList.push(action.payload.workout);
    },
  },
});

export const { addWorkout } = workoutsSlice.actions;
export default workoutsSlice.reducer;

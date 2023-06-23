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
    setWorkouts: (state, action) => {
      state.workoutsList = [...action.payload.workouts];
    },
  },
});

export const { addWorkout, setWorkouts } = workoutsSlice.actions;
export default workoutsSlice.reducer;

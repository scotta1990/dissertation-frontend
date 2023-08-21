import { createSlice } from "@reduxjs/toolkit";

export const yourGoals = createSlice({
  name: "yourGoals",
  initialState: {
    weeklyWorkoutGoal: 0,
  },
  reducers: {
    setWeeklyWorkoutGoal: (state, action) => {
      state.weeklyWorkoutGoal = action.payload.weeklyWorkoutGoal;
    },
  },
});

export const { setWeeklyWorkoutGoal } = yourGoals.actions;
export default yourGoals.reducer;

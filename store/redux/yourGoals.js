import { createSelector, createSlice } from "@reduxjs/toolkit";

export const yourGoals = createSlice({
  name: "yourGoals",
  initialState: {
    weeklyWorkoutGoal: 0,
    goals: [],
  },
  reducers: {
    setWeeklyWorkoutGoal: (state, action) => {
      state.weeklyWorkoutGoal = action.payload.weeklyWorkoutGoal;
    },
    setGoals: (state, action) => {
      state.goals = [...action.payload.goals];
    },
    addGoalItem: (state, action) => {
      state.goals.push(action.payload.goal);
    },
    updateGoalItem: (state, action) => {
      state.goals = state.goals.map((goal) => {
        if (goal._id !== action.payload.goalId) return goal;

        return {
          ...goal,
          value: action.payload.value,
        };
      });
    },
  },
});

export const { setWeeklyWorkoutGoal, setGoals, addGoalItem, updateGoalItem } =
  yourGoals.actions;
export default yourGoals.reducer;

export const getGoalsByType = createSelector(
  (store) => store.yourGoals.goals,
  (_, type) => type,
  (goals, type) => goals.filter((goal) => goal.type === type.toUpperCase())
);

export const getGoalByItem = createSelector(
  (goals) => goals,
  (_, itemId) => itemId,
  (goals, itemId) => goals.filter((goal) => goal.itemId === itemId)
)
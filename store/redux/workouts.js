import { createSelector, createSlice } from "@reduxjs/toolkit";

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

export const getThisWeeksWorkoutCount = createSelector(
  (store) => store.workouts.workoutsList,
  (_) => {},
  (workoutsList) => {
    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    const firstDayOfWeek = new Date(
      dateToday.setDate(
        dateToday.getDate() -
          dateToday.getDay() +
          (dateToday.getDay() === 0 ? -6 : 1)
      )
    );
    const endDayOfWeek = new Date(
      dateToday.setDate(dateToday.getDate() - dateToday.getDay() + 7)
    );

    return workoutsList.filter((item) => {
      const startDate = new Date(item.startDate);
      return startDate >= firstDayOfWeek && startDate <= endDayOfWeek;
    }).length;
  }
);

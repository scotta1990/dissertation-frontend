import { createSlice } from "@reduxjs/toolkit";

export const currentWorkoutSlice = createSlice({
  name: "currentWorkout",
  initialState: {
    workoutInProgress: false,
    workoutItems: [],
    workoutDuration: 0,
  },
  reducers: {
    startWorkout: (state, action) => {
      state.workoutInProgress = true;
    },

    cancelCurrentWorkout: (state, action) => {
      state.workoutInProgress = false;
      state.workoutItems = [];
      state.workoutDuration = 0;
    },

    addExercise: (state, action) => {
      const id =
        state.workoutItems.length > 0
          ? state.workoutItems[state.workoutItems.length - 1].id + 1
          : 1;

      const exercise = {
        id: id,
        exercise: action.payload.exercise,
        sets: [{ id: 1, measurement: "", count: "", done: false }],
      };
      state.workoutItems.push(exercise);
    },

    removeExercise: (state, action) => {
      state.workoutItems.splice(
        state.workoutItems.findIndex(
          (item) => item.id === action.payload.workoutItemId
        ),
        1
      );
    },

    addSet: (state, action) => {
      const index = state.workoutItems.findIndex(
        (item) => item.id === action.payload.workoutItemId
      );

      const id =
        state.workoutItems[index].sets[
          state.workoutItems[index].sets.length - 1
        ].id + 1;
      const set = { id: id, measurement: "", count: "", done: false };
      state.workoutItems[index].sets.push(set);
    },

    removeSet: (state, action) => {
      const exerciseIndex = state.workoutItems.findIndex(
        (item) => item.id === action.payload.exerciseId
      );
      const setIndex = state.workoutItems[exerciseIndex].sets.findIndex(
        (item) => item.id === action.payload.setId
      );
      state.workoutItems[exerciseIndex].sets.splice(setIndex, 1);
    },

    increaseWorkoutDuration: (state) => {
      const newDuration = (state.workoutDuration += 1);
      state.workoutDuration = newDuration;
    },
  },
});

export const {
  startWorkout,
  cancelCurrentWorkout,
  addExercise,
  removeExercise,
  addSet,
  removeSet,
  increaseWorkoutDuration,
} = currentWorkoutSlice.actions;
export default currentWorkoutSlice.reducer;

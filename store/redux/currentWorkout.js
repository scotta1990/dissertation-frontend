import { createSlice } from "@reduxjs/toolkit";

export const currentWorkoutSlice = createSlice({
  name: "currentWorkout",
  initialState: {
    workoutInProgress: false,
    workoutStartDate: "",
    workoutEndDate: undefined,
    workoutItems: [],
    duration: 0,
    historical: false,
  },
  reducers: {
    startWorkout: (state, action) => {
      if (action.payload?.historical) {
        state.historical = true;
      }
      state.workoutStartDate = Date.now();
      state.workoutInProgress = true;
    },

    cancelCurrentWorkout: (state, action) => {
      state.workoutInProgress = false;
      state.workoutStartDate = "";
      state.workoutEndDate = undefined;
      state.workoutItems = [];
      state.duration = 0;
      state.historical = false;
    },

    updateCurrentWorkout: (state, action) => {
      state.workoutStartDate = action.payload.startDate;
      state.workoutEndDate = action.payload.endDate;
      state.duration = action.payload.duration;
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

    updateSet: (state, action) => {
      const workoutItemIndex = state.workoutItems.findIndex(
        (item) => item.id === action.payload.workoutItemId
      );
      const setIndex = state.workoutItems[workoutItemIndex].sets.findIndex(
        (item) => item.id === action.payload.set.id
      );
      state.workoutItems[workoutItemIndex].sets[setIndex] = action.payload.set;
    },

    removeSet: (state, action) => {
      const workoutItemIndex = state.workoutItems.findIndex(
        (item) => item.id === action.payload.workoutItemId
      );
      const setIndex = state.workoutItems[workoutItemIndex].sets.findIndex(
        (item) => item.id === action.payload.setId
      );
      state.workoutItems[workoutItemIndex].sets.splice(setIndex, 1);
    },

    increaseDuration: (state) => {
      const newDuration = (state.duration += 1);
      state.duration = newDuration;
    },

    finishCurrentWorkout: (state) => {},
  },
});

export const {
  startWorkout,
  cancelCurrentWorkout,
  updateCurrentWorkout,
  addExercise,
  removeExercise,
  addSet,
  updateSet,
  removeSet,
  increaseDuration,
} = currentWorkoutSlice.actions;
export default currentWorkoutSlice.reducer;

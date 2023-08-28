import { createSlice, createSelector } from "@reduxjs/toolkit";

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exerciseList: [],
    bodyParts: [],
    bodyPartsFilter: "",
  },
  reducers: {
    setExercises: (state, action) => {
      state.exerciseList = [...action.payload.exercises];
      state.bodyParts = [
        ...new Set(action.payload.exercises.map((item) => item.bodyPart)),
      ].sort();
    },
    setBodyPartFilter: (state, actions) => {
      state.bodyPartsFilter = actions.payload.bodyPart;
    },
  },
});

export const { setExercises, setBodyPartFilter } = exercisesSlice.actions;
export default exercisesSlice.reducer;

export const getExerciseById = createSelector(
  (state) => state.exercises.exerciseList,
  (_, exerciseId) => exerciseId,
  (exerciseList, exerciseId) =>
    exerciseList.filter((exercise) => exercise.id === exerciseId)
);

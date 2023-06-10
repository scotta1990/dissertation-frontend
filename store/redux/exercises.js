import { createSlice } from "@reduxjs/toolkit";

import { data } from "../../temporary-exercise";

const bodyParts = [...new Set(data.map((item) => item.bodyPart))].sort();

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exerciseList: data,
    bodyParts: bodyParts,
    bodyPartsFilter: "",
  },
  reducers: {
    setBodyPartFilter: (state, actions) => {
      state.bodyPartsFilter = actions.payload.bodyPart;
    },
  },
});

export const { setBodyPartFilter } = exercisesSlice.actions;
export default exercisesSlice.reducer;

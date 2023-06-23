import { createSlice } from "@reduxjs/toolkit";

export const yourMeasurementsSlice = createSlice({
  name: "yourMeasurements",
  initialState: {
    measurementTypes: [],
    measurementsProfile: [],
  },
  reducers: {
    setMeasurementTypes: (state, action) => {
      state.measurementTypes = action.payload.measurementTypes;
    },
    setMeasurementsProfile: (state, action) => {
      state.measurementsProfile = action.payload.measurementsProfile;
    },
    addMeasurement: (state, action) => {
      state.workoutsList.push(action.payload.workout);
    },
  },
});

export const { setMeasurementTypes, setMeasurementsProfile, addMeasurement } =
  yourMeasurementsSlice.actions;
export default yourMeasurementsSlice.reducer;

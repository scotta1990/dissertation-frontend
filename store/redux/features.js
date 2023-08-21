import { createSlice } from "@reduxjs/toolkit";

export const featuresSlice = createSlice({
  name: "features",
  initialState: {
    features: [],
  },
  reducers: {
    setFeatures: (state, action) => {
      state.features = action.payload.features;
    },
    toggleFeature: (state, action) => {
      state.features = state.features.map((feature) => {
        if (feature._id !== action.payload.id) return feature;

        return {
          ...feature,
          active: !feature.active,
        };
      });
    },
  },
});

export const { setFeatures, toggleFeature } = featuresSlice.actions;
export default featuresSlice.reducer;

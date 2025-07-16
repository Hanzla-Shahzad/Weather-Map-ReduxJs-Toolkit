import { createSlice } from "@reduxjs/toolkit";
import { getWeatherData, get5daysWeatherData } from "../Thunks/weatherThunk";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    forecast: null,
    pending: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.pending = false;
      })
      .addCase(getWeatherData.rejected, (state) => {
        state.error = true;
        state.pending = false;
      })
      .addCase(get5daysWeatherData.fulfilled, (state, action) => {
        state.forecast = action.payload;
      });
  },
});

export default weatherSlice.reducer;

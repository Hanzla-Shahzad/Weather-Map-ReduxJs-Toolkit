import { configureStore } from "@reduxjs/toolkit";
import weather from "../Slices/weatherSlice";

const store = configureStore({
  reducer: {
    weather: weather,
  },
});
export default store;

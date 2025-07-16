import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appId, hostName } from "../apiKeys";

export const getWeatherData = createAsyncThunk(
  "getWeatherData",
  async (obj) => {
    try {
      console.log("Thunk received:", obj);
      const response = await axios.get(
        `${hostName}/data/2.5/weather?q=${obj.city}&units=${obj.unit}&appid=${appId}`
      );
      console.log("API Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Thunk error:", error.response?.data || error.message);
      throw error;
    }
  }
);

export const get5daysWeatherData = createAsyncThunk(
  "get5daysWeatherData",
  async (obj) => {
    try {
      const response = await axios.get(
        `${hostName}/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=${obj.unit}&appid=${appId}`
      );
      console.log("5-day forecast:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "get5daysWeatherData error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

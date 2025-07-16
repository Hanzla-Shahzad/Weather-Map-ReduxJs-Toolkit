import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherData, get5daysWeatherData } from "../Thunks/weatherThunk";

export default function Main() {
  const dispatch = useDispatch();
  const { data: current, forecast } = useSelector((state) => state.weather);
  const [city, setCity] = useState("");
  const [unit] = useState("metric");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    const res = await dispatch(getWeatherData({ city, unit }));
    if (res.payload?.coord) {
      dispatch(
        get5daysWeatherData({
          lat: res.payload.coord.lat,
          lon: res.payload.coord.lon,
          unit,
        })
      );
    }

    setCity("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white px-6 py-10 font-sans relative bottom-8">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center mb-8"
      >
        <input
          type="text"
          className="w-[60%] max-w-md p-3 rounded-l-lg bg-white text-black shadow-md focus:outline-none"
          placeholder="Search city (e.g. Karachi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 px-5 py-3 rounded-r-lg hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>
      </form>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* Current Weather */}
        {current && current.main && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg col-span-1">
            <h2 className="text-3xl font-bold mb-2">{current.name}</h2>
            <p className="text-5xl font-bold mb-4">
              {Math.round(current.main.temp)}°C
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
              alt="icon"
              className="w-24 h-24 mx-auto"
            />
            <p className="capitalize text-lg text-center mb-2">
              {current.weather[0].description}
            </p>
            <div className="mt-4 grid grid-cols-2 text-sm gap-3 text-gray-300">
              <p>Feels Like: {Math.round(current.main.feels_like)}°C</p>
              <p>Humidity: {current.main.humidity}%</p>
              <p>Pressure: {current.main.pressure} hPa</p>
              <p>Wind: {current.wind.speed} km/h</p>
            </div>
          </div>
        )}

        {/* Forecast Weather */}
        {forecast?.list?.length > 0 && (
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {forecast.list
                .filter((item) => item.dt_txt.includes("12:00:00"))
                .map((item, idx) => {
                  const date = new Date(item.dt_txt);
                  const day = date.toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                  const icon = item.weather[0].icon;

                  return (
                    <div
                      key={idx}
                      className="bg-white/10 p-4 rounded-xl shadow-md text-center hover:bg-white/20 transition"
                    >
                      <p className="font-semibold text-lg mb-1">{day}</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt="icon"
                        className="w-16 h-16 mx-auto"
                      />
                      <p className="capitalize text-sm">
                        {item.weather[0].description}
                      </p>
                      <p className="text-xl mt-1 font-bold">
                        {Math.round(item.main.temp)}°C
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Weather data powered by OpenWeatherMap</p>
        <p>Built with ❤️ using React + Redux + TailwindCSS</p>
      </footer>
    </div>
  );
}

import React, { useState } from "react";
import './Weather.css';

const api = {
  key: "5e8c667fb3e19bde98e6fc191e45aa39",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      if (query.trim() === "") {
        setError("Please enter a city name");
        return;
      }

      setIsLoading(true);  // Start loading
      setError("");  // Reset error
      fetch(`${api.base}weather?q=${query.trim()}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === "404") {
            setError("City not found");
          } else {
            setWeather(result);
          }
          setIsLoading(false);  // End loading
          setQuery("");  // Clear input
        })
        .catch(() => {
          setError("Failed to fetch weather data");
          setIsLoading(false);  // End loading
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      <main>
        <div className="search-box">
          <p className="search-label">Search for a city</p>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {isLoading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {weather.main ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys && weather.sys.country}
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
};

export default Weather;

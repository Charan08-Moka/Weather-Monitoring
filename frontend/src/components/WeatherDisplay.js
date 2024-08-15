import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDisplay = ({ city, unit, setUnit }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.get(`http://localhost:6000/weather/${city}`);
      setWeather(response.data);
    };

    fetchWeatherData();
  }, [city]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (temp) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  if (!weather) return <p>Loading...</p>;

  return (
    <div className="weather-info">
      <h2>Current Weather in {city}</h2>
      <p>Temperature: {convertTemperature(weather.temperature).toFixed(2)} °{unit}</p>
      <p>Cloudiness: {weather.cloudiness}%</p>
      <p>Wind Speed: {weather.windSpeed} m/s</p>
      <p>Humidity: {weather.humidity}%</p>
      <button onClick={toggleUnit}>
        Show in °{unit === 'C' ? 'F' : 'C'}
      </button>
    </div>
  );
};

export default WeatherDisplay;

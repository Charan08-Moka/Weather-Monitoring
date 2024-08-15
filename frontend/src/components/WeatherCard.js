import React from 'react';
import moment from 'moment'; 
import './WeatherCard.css'; // Ensure you have a CSS file for styling if needed

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) {
        return <p>Loading...</p>;
    }

    const { city, clouds, date, feels_like, humidity, temperature, weather, windspeed } = weatherData;

    return (
        <div className="weather-card">
            <h2>Weather in {city}</h2>
            <p><strong>Date:</strong> {moment(date).subtract(5.5, 'hours').fromNow()}</p>
            <p><strong>Temperature:</strong> {temperature.toFixed(2)} °C</p>
            <p><strong>Feels Like:</strong> {parseFloat(feels_like).toFixed(2)} °C</p>
            <p><strong>Weather:</strong> {weather}</p>
            <p><strong>Cloud Coverage:</strong> {clouds}%</p>
            <p><strong>Humidity:</strong> {humidity}%</p>
            <p><strong>Windspeed:</strong> {windspeed} km/h</p>
        </div>
    );
};

export default WeatherCard;

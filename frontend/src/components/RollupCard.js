import React from 'react';
import './RollupCard.css'; // Create this file for custom styles if needed

const RollupCard = ({ rollupData }) => {
    if (!rollupData) {
        return <p>Loading...</p>;
    }

    const {
        city,
        minimumTemp,
        maximumTemp,
        averageTemp,
        averageFeelsLike,
        climate,
        windspeed,
        humidity,
        clouds,
        medianTemp,
        modeTemp,
    } = rollupData;

    return (
        <div className="rollup-card">
            <h2>Daily Weather Summary for {city}</h2>
            <p><strong>Minimum Temperature:</strong> {minimumTemp.toFixed(2)} °C</p>
            <p><strong>Maximum Temperature:</strong> {maximumTemp.toFixed(2)} °C</p>
            <p><strong>Average Temperature:</strong> {averageTemp.toFixed(2)} °C</p>
            <p><strong>Median Temperature:</strong> {medianTemp.toFixed(2)} °C</p>
            <p><strong>Mode Temperature:</strong> {modeTemp.toFixed(2)} °C</p>
            <p><strong>Feels Like:</strong> {averageFeelsLike.toFixed(2)} °C</p>
            <p><strong>Climate:</strong> {climate}</p>
            <p><strong>Windspeed:</strong> {windspeed} km/h</p>
            <p><strong>Humidity:</strong> {humidity}%</p>
            <p><strong>Cloud Coverage:</strong> {clouds}%</p>
        </div>
    );
};

export default RollupCard;

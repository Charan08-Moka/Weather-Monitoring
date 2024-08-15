import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RollupsDisplay = ({ city }) => {
  const [rollups, setRollups] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRollupsData = async () => {
      try {
        console.log(`Fetching rollups data for city: ${city}`); // Logging request
        const response = await axios.get(`http://localhost:6000/rollups/${city}`);
        console.log('Response data:', response.data); // Logging response
        setRollups(response.data);
      } catch (err) {
        console.error('Error fetching rollups data:', err); // Logging error
        setError('Failed to fetch rollups data.');
      }
    };

    fetchRollupsData();
  }, [city]);

  if (error) return <p>{error}</p>;
  if (!rollups) return <p>Loading...</p>;

  return (
    <div className="rollup-info">
      <h2>Weather Rollups for {city}</h2>
      <p>Average Temperature: {rollups.avgTemperature} °C</p>
      <p>Maximum Temperature: {rollups.maxTemperature} °C</p>
      <p>Minimum Temperature: {rollups.minTemperature} °C</p>
      <p>Dominant Weather Condition: {rollups.dominantCondition}</p>
    </div>
  );
};

export default RollupsDisplay;

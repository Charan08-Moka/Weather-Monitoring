import React, { useState } from 'react';
import CitySelector from './components/CitySelector';
import WeatherDisplay from './components/WeatherDisplay';
import RollupsDisplay from './components/RollupsDisplay';

function App() {
  const [city, setCity] = useState('Delhi');
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit

  const refreshData = () => {
    // Logic to refresh data, you can trigger a new API call here
  };

  return (
    <div className="container">
      <h1>Weather Monitoring</h1>
      <CitySelector city={city} setCity={setCity} />
      <WeatherDisplay city={city} unit={unit} setUnit={setUnit} />
      <RollupsDisplay city={city} />
      <button onClick={refreshData}>Refresh</button>
    </div>
  );
}

export default App;

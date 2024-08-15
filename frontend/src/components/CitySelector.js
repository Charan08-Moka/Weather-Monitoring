import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {getWeatherByCity, getRollupDataByCity} from '../API'
import WeatherCard from './WeatherCard';
import RollupCard from './RollupCard'; 
// Define your options
const cityOptions = [
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Bengaluru', label: 'Bengaluru' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Hyderabad', label: 'Hyderabad' },
];

const CitySelector = () => {
    const [selectedCity, setSelectedCity] = useState("Delhi");
    const [cityWeather,setCityWeather] = useState(null)
    const [cityrollupWeather,setCityrollupWeather] = useState(null)

    useEffect(()=>{
      getWeatherByCity(selectedCity).then(data => {
        console.log('Weather data for city:', data);
        setCityWeather(data);
    }).catch(error => console.error(error));

    getRollupDataByCity(selectedCity).then(data => {
      console.log('Weather data for city:', data);
      setCityrollupWeather(data); 
  }).catch(error => console.error(error));
    },[selectedCity])
    // Handle change event
    const handleChange = (selectedOption) => {
        setSelectedCity(selectedOption.value);
    };

    useEffect(()=>{
      console.log(cityWeather)
    })

    return (
        <div>
            <h1>Select a City</h1>
            <Select
                value={{value:selectedCity,label:selectedCity}}
                onChange={handleChange}
                options={cityOptions}
                placeholder="Select a city"
            />
            <p>Selected City: {selectedCity ? selectedCity : 'None'}</p>
            <WeatherCard weatherData={cityWeather}/>
            <RollupCard rollupData={cityrollupWeather}/> 
        </div>
    );
};

export default CitySelector;

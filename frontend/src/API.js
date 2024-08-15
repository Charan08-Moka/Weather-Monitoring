import axios from 'axios';

// Define the base URL for your API
const BASE_URL = 'http://localhost:8000/api/weather';

// Function to fetch weather data from the backend
export const fetchWeatherData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/fetch`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

// Function to store daily weather summary
export const storeDailySummary = async (weatherData) => {
    try {
        const response = await axios.post(`${BASE_URL}/`, weatherData);
        return response.data;
    } catch (error) {
        console.error('Error saving weather data:', error);
        throw error;
    }
};

// Function to fetch weather summary for a specific city
export const getWeatherByCity = async (cityName) => {
    try {
        const response = await axios.get(`${BASE_URL}/city/${cityName}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(`Error fetching weather data for ${cityName}:`, error); 
        throw error;
    }
};

export const getRollupDataByCity = async (cityName) => {
    try {
        const response = await axios.get(`${BASE_URL}/city/rollup/${cityName}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching rollup data for ${cityName}:`, error);
        throw error;
    }
}; 

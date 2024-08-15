/* require('dotenv').config();
const axios = require('axios');
const { kelvinToCelsius } = require('../utils/temperatureUtils');
const WeatherSummary = require('../models/WeatherSummary');

// Use environment variable for API key
const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

async function fetchWeatherData() {
    try {
        // Fetch weather data for all cities concurrently
        const promises = CITIES.map(city =>
            axios.get(`${API_URL}?q=${city}&appid=${API_KEY}`)
        );
        const responses = await Promise.all(promises);

        responses.forEach(response => {
            const data = response.data;
            const tempCelsius = kelvinToCelsius(data.main.temp);
            
            // Construct the daily summary
            const dailySummary = {
                city: data.name,
                date: new Date(data.dt * 1000), // Convert Unix timestamp to Date object
                temperature: tempCelsius,
                weather: data.weather[0].main
            };

            // Save daily summary to database
            storeDailySummary(dailySummary);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function storeDailySummary(summary) {
    try {
        const newSummary = new WeatherSummary(summary);
        await newSummary.save();
        console.log('Daily summary saved:', summary);
    } catch (error) {
        console.error('Error in storeDailySummary:', error.message, error.stack); // Log more details
        throw error; // Re-throw the error so that it's caught in the route handler
    }
}

module.exports = { fetchWeatherData, storeDailySummary }; */

/* require('dotenv').config();
const axios = require('axios');
const logger = require('../logger'); // Adjust the path to match your directory structure
const { kelvinToCelsius } = require('../utils/temperatureUtils');
const WeatherSummary = require('../models/WeatherSummary');

// Use environment variable for API key
const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

async function fetchWeatherData() {
    try {
        logger.info(`Fetching weather data at: ${new Date().toISOString()}`);

        // Fetch weather data for all cities concurrently
        const promises = CITIES.map(city =>
            axios.get(`${API_URL}?q=${city}&appid=${API_KEY}`)
        );
        const responses = await Promise.all(promises);

        responses.forEach(async response => {
            const data = response.data;
            const tempCelsius = kelvinToCelsius(data.main.temp);
            
            // Construct the daily summary
            const dailySummary = {
                city: data.name,
                date: new Date(data.dt * 1000), // Convert Unix timestamp to Date object
                temperature: tempCelsius,
                weather: data.weather[0].main
            };

            // Log the fetched data
            logger.info(`Weather data fetched for city: ${data.name} - Temperature: ${tempCelsius}°C, Weather: ${data.weather[0].main}`);

            // Save daily summary to database
            await storeDailySummary(dailySummary);

            // Log successful save
            logger.info(`Weather summary saved for city: ${data.name}`);
        });
    } catch (error) {
        logger.error('Error fetching weather data:', error);
    }
} */

/*async function storeDailySummary(summary) {
    try {
        const newSummary = new WeatherSummary(summary);
        await newSummary.save();
        logger.info(`Daily summary saved: ${JSON.stringify(summary)}`);
    } catch (error) {
        logger.error('Error in storeDailySummary:', error.message, error.stack);
        throw error;
    }
} */

require("dotenv").config();
const axios = require("axios");
const { kelvinToCelsius } = require("../utils/temperatureUtils");
const WeatherSummary = require("../models/WeatherSummary");
const logger = require("../logger");

// Use environment variable for API key
const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bengaluru",
  "Kolkata",
  "Hyderabad",
];
const API_URL = "http://api.openweathermap.org/data/2.5/weather";

async function fetchWeatherData() {
  try {
    logger.info("Fetching weather data at:", new Date().toISOString());

    // Fetch weather data for all cities concurrently
    const promises = CITIES.map((city) =>
      axios.get(`${API_URL}?q=${city}&appid=${API_KEY}`)
    );
    const responses = await Promise.all(promises);

    responses.forEach((response) => {
      const data = response.data;
      const tempCelsius = kelvinToCelsius(data.main.temp);
      const utcDate = new Date(data.dt * 1000);
      const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5 hours 30 minutes
      const istDate = new Date(utcDate.getTime() + istOffset);
      console.log(istDate)

      // Construct the daily summary with "feels like" temperature
      const dailySummary = {
        city: data.name,
        date: istDate, // Convert Unix timestamp to Date object
        temperature: tempCelsius,
        feels_like: kelvinToCelsius(data.main.feels_like), // Convert "feels like" temperature to Celsius
        weather: data.weather[0].main,
        windspeed: Number(data.wind.speed),
        humidity: Number(data.main.humidity),
        clouds: Number(data.clouds.all)
      };

      storeDailySummary(dailySummary);
    });
  } catch (error) {
    logger.error("Error fetching weather data:", error);
  }
}

async function storeDailySummary(summary) {
  try {
    const newSummary = new WeatherSummary(summary);
    await newSummary.save();
    console.log("Daily summary saved:", summary);
  } catch (error) {
    console.error("Error in storeDailySummary:", error.message, error.stack); // Log more details
    throw error; // Re-throw the error so that it's caught in the route handler
  }
}

module.exports = { fetchWeatherData, storeDailySummary };

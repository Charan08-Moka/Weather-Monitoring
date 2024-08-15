/* const express = require('express');
const router = express.Router();
const { fetchWeatherData, storeDailySummary } = require('../services/weatherService');

// Fetch weather data every 5 minutes
setInterval(async () => {
    await fetchWeatherData();
}, 5 * 60 * 1000);

// Endpoint to manually trigger data fetch and processing
router.get('/fetch', async (req, res) => {
    try {
        await fetchWeatherData();
        res.status(200).send('Weather data fetched');
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

// POST route to save weather data
router.post('/', async (req, res) => {
    try {
        const weatherData = req.body;
        console.log('Received weather data:', weatherData); // Log received data for debugging

        await storeDailySummary(weatherData); // Attempt to save the weather data
        res.status(201).json({ message: 'Weather data saved successfully' });
    } catch (error) {
        console.error('Error saving weather data:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error saving weather data' });
    }
});

module.exports = router; */

const express = require('express');
const router = express.Router();
const { fetchWeatherData, storeDailySummary } = require('../services/weatherService');
const WeatherSummary = require('../models/WeatherSummary'); // Ensure this path is correct
const rollups = require('../models/rollUpsandAggregates');


// Fetch weather data every 5 minutes
setInterval(async () => {
    await fetchWeatherData();
}, 5 * 60 * 1000);

// Endpoint to manually trigger data fetch and processing
router.get('/fetch', async (req, res) => {
    try { 
        await fetchWeatherData();
        res.status(200).send('Weather data fetched');
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

// POST route to save weather data
router.post('/', async (req, res) => {
    try {
        const weatherData = req.body;
        console.log('Received weather data:', weatherData); // Log received data for debugging

        await storeDailySummary(weatherData); // Attempt to save the weather data
        res.status(201).json({ message: 'Weather data saved successfully' });
    } catch (error) {
        console.error('Error saving weather data:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error saving weather data' });
    }
});

// GET route to fetch weather data for a specific city
router.get('/city/:cityName', async (req, res) => {
    try {
        const cityName = req.params.cityName;
        const weatherSummary = await WeatherSummary.findOne({ city: cityName }).sort({ date: -1 }); // Find the latest summary
        if (weatherSummary) {
            res.status(200).json(weatherSummary);
        } else {
            res.status(404).json({ message: 'No data found for the specified city' });
        }
    } catch (error) {
        console.error('Error fetching weather data for city:', error);
        res.status(500).json({ error: 'Error fetching weather data for city' });
    }
});

router.get('/city/rollup/:cityName', async (req, res) => {
    try {
        const cityName = req.params.cityName;
        const rollupData = await rollups.findOne({ city: cityName }).sort({ createdAt: -1 });

        if (rollupData) {
            res.status(200).json(rollupData);
        } else {
            res.status(404).json({ message: 'No rollup data found for the specified city' });
        }
    } catch (error) {
        console.error('Error fetching rollup data for city:', error);
        res.status(500).json({ error: 'Error fetching rollup data for city' }); 
    }
});

module.exports = router;


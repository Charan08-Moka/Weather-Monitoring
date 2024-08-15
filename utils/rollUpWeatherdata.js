const mongoose = require("mongoose");
const WeatherSummary = require("../models/WeatherSummary"); // Assuming this is your weather summary model
const rollups = require("../models/rollUpsandAggregates"); // Assuming rollupSchema is defined

async function rollupWeatherData() {
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bengaluru",
    "Kolkata",
    "Hyderabad",
  ];
  const todayIST = new Date();
  todayIST.setHours(0, 0, 0, 0); // Start of the day in IST

  const endOfDayIST = new Date(todayIST);
  endOfDayIST.setHours(18, 15, 59, 999); // End of the day in IST

  // Convert IST to UTC
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5 hours 30 minutes
  const todayUTC = new Date(todayIST.getTime() + istOffset);
  const endOfDayUTC = new Date(endOfDayIST.getTime() + istOffset);

  console.log(`UTC Start of the day: ${todayUTC}`);
  console.log(`UTC End of the day: ${endOfDayUTC}`);

  for (let city of cities) {
    const weatherData = await WeatherSummary.find({
      city: city,
      date: { $gte: todayUTC, $lte: endOfDayUTC },
    });
    if (weatherData.length > 0) {
      const temperatures = weatherData.map((data) => data.temperature);
      const feelsLikeValues = weatherData.map((data) =>
        parseFloat(data.feels_like)
      );
      const humidityValues = weatherData.map((data) => data.humidity);
      const windSpeedValues = weatherData.map((data) => data.windspeed);
      const cloudValues = weatherData.map((data) => data.clouds);
      const weatherConditions = weatherData.map((data) => data.weather);

      const minTemp = Math.min(...temperatures);
      const maxTemp = Math.max(...temperatures);
      const avgTemp =
        temperatures.reduce((acc, val) => acc + val, 0) / temperatures.length;
      const medianTemp = calculateMedian(temperatures);
      const modeTemp = calculateMode(temperatures);
      const avgFeelsLike =
        feelsLikeValues.reduce((acc, val) => acc + val, 0) /
        feelsLikeValues.length;
      const avgHumidity =
        humidityValues.reduce((acc, val) => acc + val, 0) /
        humidityValues.length;
      const avgWindSpeed =
        windSpeedValues.reduce((acc, val) => acc + val, 0) /
        windSpeedValues.length;
      const avgClouds =
        cloudValues.reduce((acc, val) => acc + val, 0) / cloudValues.length;
      const rollupData = new rollups({
        city: city,
        minimumTemp: minTemp,
        maximumTemp: maxTemp,
        averageTemp: avgTemp,
        medianTemp: medianTemp,
        modeTemp: modeTemp,
        averageFeelsLike: avgFeelsLike,
        humidity: avgHumidity,
        windspeed: avgWindSpeed,
        clouds: avgClouds,
        climate: determineClimate(weatherConditions), // Determines the overall climate
      });
      try {
        await rollupData.save();
      } catch (e) {
        console.log(`error occured${e}`);
      }
    }
  }
}

// Helper functions to calculate median and mode
function calculateMedian(arr) {
  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function calculateMode(arr) {
  const frequency = {};
  let maxFreq = 0;
  let mode;

  for (let num of arr) {
    frequency[num] = (frequency[num] || 0) + 1;

    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      mode = num;
    }
  }

  return mode;
}

function determineClimate(weatherConditions) {
  const frequency = {};
  for (let condition of weatherConditions) {
    frequency[condition] = (frequency[condition] || 0) + 1;
  }
  return Object.keys(frequency).reduce((a, b) =>
    frequency[a] > frequency[b] ? a : b
  );
}

// Schedule the rollup process to run at 11:59 PM every day
const cron = require("node-cron");

cron.schedule("59 23 * * *", rollupWeatherData);

module.exports = { rollupWeatherData };

/* require('dotenv').config();
const mongoose = require('mongoose');
const WeatherSummary = require('./models/WeatherSummary');

async function testSave() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const summary = new WeatherSummary({
            city: 'Test City',
            date: new Date(),
            temperature: 25,
            weather: 'Clear'
        });

        await summary.save();
        console.log('Test summary saved successfully');
    } catch (error) {
        console.error('Error saving test summary:', error);
    } finally {
        mongoose.connection.close(); 
    }
}

testSave();  */

require("dotenv").config();
const mongoose = require("mongoose");
const rollups = require("./models/rollUpsandAggregates");

async function testSave() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const summary = new rollups({
      city: 'Goa',
      minimumTemp: 15,
      maximumTemp: 35,
      averageTemp: 30,
      averageFeelsLike: 45,
      climate: 'rain',
      windspeed: 10,
      humidity: 10,
      clouds: 90,
      medianTemp: 25,
      modeTemp: 15,  
    });

    await summary.save();
    console.log("Test summary saved successfully");
  } catch (error) {
    console.error("Error saving test summary:", error);
  } finally {
    mongoose.connection.close();
  }
}

testSave(); 
module.exports = {testSave};
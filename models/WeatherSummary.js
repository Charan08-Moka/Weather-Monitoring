const mongoose = require('mongoose');

const weatherSummarySchema = new mongoose.Schema({
    city: { type: String, required: true },
    date: { type: Date, required: true },
    temperature: { type: Number, required: true },
    feels_like:{ type:String, required: true},
    weather: { type: String, required: true },
    windspeed:{ type: Number, required: true },
    humidity: { type: Number, required: true },
    clouds:{ type: Number, required: true },
}, {
    timestamps: true
}); 

module.exports = mongoose.model('WeatherSummary', weatherSummarySchema);

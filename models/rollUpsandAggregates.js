const mongoose = require('mongoose');
const rollupSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    city: String,
    minimumTemp: Number,
    maximumTemp: Number,
    averageTemp: Number,
    averageFeelsLike: Number,
    climate: String,
    windspeed: Number,
    humidity: Number,
    clouds: Number,
    medianTemp: Number,
    modeTemp: Number
}, {timestamps:true}) 

module.exports = mongoose.model('rollups',rollupSchema);  
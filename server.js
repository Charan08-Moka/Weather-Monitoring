require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const weatherRoutes = require('./routes/weatherRoutes');
const {rollupWeatherData} = require('./utils/rollUpWeatherdata');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' // Adjust if needed
  })); 
app.use('/api/weather', weatherRoutes); 

const winston = require('winston'); // winston part 

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

logger.info('Server started');

cron.schedule('59 23 * * *', () => {
    rollupWeatherData()
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch(error => console.error('MongoDB connection error:', error));

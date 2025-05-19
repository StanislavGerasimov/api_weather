const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');


const generateWeatherData = (city) => {
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

  return {
    temperature: Math.round(Math.random() * 30 - 5),
    humidity: Math.round(Math.random() * 100),
    description: randomCondition,
    city: city.toLowerCase()
  };
};

router.get('/', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const cachedWeather = await Weather.findOne({
      city: city.toLowerCase(),
      recordedAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) }
    }).sort({ recordedAt: -1 });

    if (cachedWeather) {
      return res.json({
        temperature: cachedWeather.temperature,
        humidity: cachedWeather.humidity,
        description: cachedWeather.description,
        city: cachedWeather.city
      });
    }

    const weatherData = generateWeatherData(city);

    const weatherRecord = new Weather({
      ...weatherData,
      recordedAt: new Date()
    });
    await weatherRecord.save();

    res.json({
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      description: weatherData.description,
      city: weatherData.city
    });
  } catch (err) {
    console.error('Weather service error:', err);
    res.status(500).json({
      error: 'Failed to fetch weather data',
      details: err.message
    });
  }
});

module.exports = router;
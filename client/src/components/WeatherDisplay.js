import React from 'react';

const WeatherDisplay = ({ weather, onSubscribe }) => {
  return (
    <div className="weather-info">
      <h2>{weather.city}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Conditions: {weather.description}</p>

      {onSubscribe && (
        <button onClick={onSubscribe}>
          Subscribe to Updates
        </button>
      )}
    </div>
  );
};

export default WeatherDisplay;
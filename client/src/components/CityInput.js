import React from 'react';

const CityInput = ({ city, setCity, fetchWeather }) => {
  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>
    </div>
  );
};

export default CityInput;
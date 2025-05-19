import React, { useState } from 'react';
import './App.css';
import CityInput from './components/CityInput';
import WeatherDisplay from './components/WeatherDisplay';
import SubscriptionForm from './components/SubscriptionForm';
import SubscriptionStatus from './components/SubscriptionStatus';
import Message from './components/Message';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setMessage('Failed to fetch weather data');
    }
  };

  const handleSubscribe = async (subscriptionData) => {
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });
      const data = await response.json();
      setMessage(data.message || 'Subscription created. Check your email to confirm.');
      setIsSubscribed(true);
      setIsSubscribing(false);
    } catch (error) {
      setMessage('Failed to subscribe');
    }
  };

  const handleUnsubscribe = async () => {
    setIsSubscribed(false);
    setMessage('You have been unsubscribed (simulated)');
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <CityInput city={city} setCity={setCity} fetchWeather={fetchWeather} />

      {weather && (
        <WeatherDisplay 
          weather={weather} 
          onSubscribe={!isSubscribed ? () => setIsSubscribing(true) : null} 
        />
      )}

      {isSubscribing && (
        <SubscriptionForm
          city={city}
          onSubscribe={handleSubscribe}
          onCancel={() => setIsSubscribing(false)}
        />
      )}

      {isSubscribed && (
        <SubscriptionStatus 
          city={city} 
          onUnsubscribe={handleUnsubscribe} 
        />
      )}

      <Message message={message} />
    </div>
  );
}

export default App;
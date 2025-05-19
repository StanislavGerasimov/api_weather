import React, { useState } from 'react';

const SubscriptionForm = ({ city, onSubscribe, onCancel }) => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe({ email, city, frequency });
  };

  return (
    <form onSubmit={handleSubmit} className="subscribe-form">
      <h3>Subscribe to Weather Updates</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="daily">Daily Updates</option>
        <option value="hourly">Hourly Updates</option>
      </select>
      <button type="submit">Subscribe</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default SubscriptionForm;
import React from 'react';

const SubscriptionStatus = ({ city, onUnsubscribe }) => {
  return (
    <div>
      <p>You are subscribed to {city} weather updates</p>
      <button onClick={onUnsubscribe}>Unsubscribe</button>
    </div>
  );
};

export default SubscriptionStatus;
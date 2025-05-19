import React from 'react';

const Message = ({ message }) => {
  return message ? <p className="message">{message}</p> : null;
};

export default Message;
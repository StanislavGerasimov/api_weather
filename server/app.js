const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/db');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const weatherRouter = require('./src/routes/weather');
const subscriptionRouter = require('./src/routes/subscription');

app.use('/api/weather', weatherRouter);
app.use('/api/subscribe', subscriptionRouter);


mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
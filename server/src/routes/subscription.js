const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const generateToken = () => crypto.randomBytes(32).toString('hex');

router.post('/', async (req, res) => {
  try {
    const { email, city, frequency } = req.body;

    if (!email || !city || !frequency) {
      return res.status(400).json({ error: 'Email, city and frequency are required' });
    }

    if (!['hourly', 'daily'].includes(frequency)) {
      return res.status(400).json({ error: 'Frequency must be either "hourly" or "daily"' });
    }

    const existing = await Subscription.findOne({ email, city });
    if (existing) {
      return res.status(409).json({ error: 'Email already subscribed for this city' });
    }

    const confirmationToken = generateToken();
    const unsubscribeToken = generateToken();

    const subscription = new Subscription({
      email,
      city,
      frequency,
      confirmationToken,
      unsubscribeToken
    });
    await subscription.save();

    const confirmationLink = `${process.env.BASE_URL}/api/confirm/${confirmationToken}`;
    await transporter.sendMail({
      from: '"Weather Service" <weather@example.com>',
      to: email,
      subject: 'Confirm your weather subscription',
      html: `Please click <a href="${confirmationLink}">here</a> to confirm your subscription.`
    });

    res.json({ message: 'Subscription created. Confirmation email sent.' });
  } catch (err) {
    console.error('Subscription error:', err);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const subscription = await Subscription.findOneAndUpdate(
      { confirmationToken: token },
      { confirmed: true, confirmationToken: null },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ error: 'Token not found' });
    }

    res.json({ message: 'Subscription confirmed successfully' });
  } catch (err) {
    console.error('Confirmation error:', err);
    res.status(400).json({ error: 'Invalid token' });
  }
});

router.get('/unsubscribe/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const result = await Subscription.findOneAndDelete({ unsubscribeToken: token });

    if (!result) {
      return res.status(404).json({ error: 'Token not found' });
    }

    res.json({ message: 'Unsubscribed successfully' });
  } catch (err) {
    console.error('Unsubscribe error:', err);
    res.status(400).json({ error: 'Invalid token' });
  }
});

module.exports = router;
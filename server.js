const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/logs');
const challengeRoutes = require('./routes/challenges');
const leaderboardRoutes = require('./routes/leaderboard');
const tipRoutes = require('./routes/tipRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/tips', tipRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

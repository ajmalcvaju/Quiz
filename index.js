const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/quizzes', quizRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

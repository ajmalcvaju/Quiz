const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');  // Correct import name
const connectDB = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/quizzes', quizRoutes); // Use quizRoutes for quizzes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

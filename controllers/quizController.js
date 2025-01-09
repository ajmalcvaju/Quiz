const mongoose = require("mongoose");
const Quiz = require("../models/quizModel");
const { createError } = require("../utils/errorUtils");

const getTests = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      status: "success",
      results: quizzes.length,
      data: quizzes,
    });
  } catch (err) {
    next(err);
  }
};

const getTest = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError("Invalid quiz ID format", 400));
    }

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return next(createError("Quiz not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: quiz,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTests,
  getTest,
};

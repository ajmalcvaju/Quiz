const Quiz = require('../models/quizModel');

const getTests = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        next(err);
    }
};

const getTest = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            const error = new Error('Quiz not found');
            error.status = 404;
            return next(error);
        }
        res.json(quiz);
    } catch (err) {
        next(err);
    }
};


module.exports = {
  getTests,
  getTest,
};

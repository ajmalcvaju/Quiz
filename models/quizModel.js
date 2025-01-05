const exp = require('constants');
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    test: {
        type: [
            {
                question: { type: String, required: true },
                options: [
                    { type: String, required: true },
                    { type: String, required: true }, 
                    { type: String, required: true }, 
                    { type: String, required: true } 
                ],
                explanation: { type: String, required: true },
                answer: { type: String, required: true }
            }
        ],
        required: true,
        validate: {
            validator: function (value) {
                return value.length === 20;
            },
            message: 'The test must contain exactly 20 questions.'
        }
    }
});


const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');


router.get('/',quizController.getTests);

router.get('/:id',quizController.getTest);


module.exports = router;

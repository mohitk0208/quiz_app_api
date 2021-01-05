const express = require("express");

const quizControllers = require("./../controllers/quiz-controllers");

const router = express.Router();

router.post("/add", quizControllers.addQuestion);

module.exports = router;

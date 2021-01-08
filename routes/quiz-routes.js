const express = require("express");

const quizControllers = require("./../controllers/quiz-controllers");

const router = express.Router();

router.post("/add", quizControllers.addQuestion);

router.get("/approve", quizControllers.getunapprovedQuestions);

router.get("/query", quizControllers.getQuestions);

router.patch("/approve/:id", quizControllers.approveQuestionById);

router.delete("/delete/:id", quizControllers.deleteQuestion);

module.exports = router;

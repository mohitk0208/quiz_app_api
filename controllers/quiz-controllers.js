const Question = require("./../models/question");

const addQuestion = async (req, res) => {
	console.log(req.body);

	const {
		category,
		difficulty,
		question,
		type,
		correct_answer,
		incorrect_answer_1,
		incorrect_answer_2,
		incorrect_answer_3,
	} = req.body;

	const createdQuestion = new Question({
		category,
		difficulty,
		question,
		type,
		correct_answer,
		incorrect_answers: [
			incorrect_answer_1,
			incorrect_answer_2,
			incorrect_answer_3,
		],
		approved: false,
	});

	try {
		await createdQuestion.save();
	} catch (error) {
		console.error(error);
	}

	res.redirect("http://localhost:3000");
};

const getunapprovedQuestions = async (req, res) => {
	let unapprovedQuestions;
	try {
		unapprovedQuestions = await Question.find({ approved: false });

		res.status(200);
		res.json({
			questions: unapprovedQuestions.map((q) => q.toObject({ getters: true })),
		});
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: "Something went wrong", error: err });
	}
};

const approveQuestionById = async (req, res) => {
	const questionId = req.params.id;
	let question;

	try {
		question = await Question.findById(questionId);
	} catch (err) {
		console.error(err);
		console.log("something went wrong, could not find the question");
	}

	question.approved = true;

	try {
		await question.save();
		res.status(200).json({ message: "approved the question" });
	} catch (err) {
		console.error(err);
		console.log("something went wrong, could not update question");
	}
};

const getQuestions = async (req, res) => {
	const { category, difficulty, no_of_questions } = req.query;

	console.log(category, difficulty, no_of_questions);

	const match = {};
	if (category != 0) match.category = category;
	if (difficulty !== "any") match.difficulty = difficulty;

	match.approved = true;

	console.log(match);

	let results;

	try {
		results = await Question.find(match);
	} catch (err) {
		console.error(err);
	}

	const questions = results.map((r) => {
		return {
			question:r.question,
			category: r.category,
			difficulty: r.difficulty,
			type: r.type,
			correct_answer: r.correct_answer,
			incorrect_answers: r.incorrect_answers,
		};
	});

	res.status(200).json({ results: questions });


};

exports.addQuestion = addQuestion;
exports.getunapprovedQuestions = getunapprovedQuestions;
exports.approveQuestionById = approveQuestionById;
exports.getQuestions = getQuestions;

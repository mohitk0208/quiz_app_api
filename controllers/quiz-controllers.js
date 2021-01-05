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

exports.addQuestion = addQuestion;

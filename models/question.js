const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
	category: { type: Number, required: true },
	difficulty: { type: String, required: true },
	question: { type: String, required: true },
	type: { type: String, required: true },
	correct_answer: { type: String, required: true },
	incorrect_answers: [{ type: String, required: true }],
	approved: { type: Boolean, required: true },
});

module.exports = mongoose.model("Question", questionSchema);

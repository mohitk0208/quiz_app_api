const addQuestion = (req, res) => {
	console.log(req.body);
	res.redirect("http://localhost:3000");
};

exports.addQuestion = addQuestion;

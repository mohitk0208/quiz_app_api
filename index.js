const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");

const quizRoutes = require("./routes/quiz-routes");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.render("pages/home");
});

app.get("/pages/approve", async (req, res) => {
	const response = await fetch("http://localhost:3000/api/approve");

	const responseData = await response.json();

	console.log(responseData);
	res.render("pages/approve", { questions: responseData.questions });
});

app.get("/pages/query", (req, res) => {
	res.render("pages/query");
});

app.use("/api", quizRoutes);

const port = 3000;

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pzfdg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running at http://localhost:${port}`);
		});
	})
	.catch(() => {
		console.error(err);
	});

const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");

const quizRoutes = require("./routes/quiz-routes");

const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.render("pages/home");
});

app.get("/pages/approve", (req, res) => {
	res.render("pages/approve");
});

app.get("/pages/query", (req, res) => {
	res.render("pages/query");
});

app.use("/api",quizRoutes);

// app.post("/api/add", (req, res) => {
// 	console.log(req.body);
// });

const port = 3000;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

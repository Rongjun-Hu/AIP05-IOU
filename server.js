const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const path = require("path")
const config = require('config')
const cors = require("cors");

const app = express();

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use(bodyParser.json());
app.use(cors());

// DB config
const db = config.get("mongoURI")

// Connect to MongoDB
mongoose
	.connect(db, {
		useUnifiedTopology: true,
		useCreateIndex: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("MongoDB Connected to IOU Database"))
	.catch((err) => console.log(err));

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require('./routes/api/auth'))
app.use("/api/favors", require('./routes/api/favors'))
app.use("/api/requests", require('./routes/api/requests'))
app.use("/api/leaderboard", require('./routes/api/leaderboard'));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

// process.env.PORT is Heroku's port
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

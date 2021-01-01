const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Load User Modal
const User = require("../../models/User");

// @route POST api/users
// @desc Register new User
// @access Public
router.post("/", (req, res, next) => {
	const { username, email, password } = req.body;

	// Simple Validation
	if (!username || !email || !password) {
		return res.status(400).json({ message: "Please Enter All Fields" });
	}

	// Check existing User find by email
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ message: "User already exists" });

		const newUser = new User({
			username,
			email,
			password,
		});

		// Generate salt & hash -> password
		bcrypt.genSalt(10, (err, salt) => {
			// Hash the user password
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				// Make user password display as hash password
				newUser.password = hash;
				newUser.save().then((user) => {
					jwt.sign(
						{ id: user.id, username: user.username }, // Know which user
						config.get("jwtSecret"),
						{ expiresIn: 3600 }, // Keep user logged in 3600 hour
						(err, token) => {
							if (err) throw err;
							// Display user token, and user with their id, username, and email, not visiable for user
							res.json({
								token,
								user: {
									id: user.id,
									username: user.username,
									email: user.email,
								},
							});
						}
					);
				});
			});
		});
	});
});

router.get("/user", (req, res) => {
	User.find()
		.select("username")
		.then((users) => res.json(users));
});

module.exports = router;

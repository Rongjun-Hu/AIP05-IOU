const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// Load User Modal
const User = require('../../models/User')

// @route POST api/auth
// @desc Auth User
// @access Public
router.post('/', (req, res) => {
	const { email, password } = req.body

	// Validation
	if (!email || !password) {
		return res.status(400).json({ message: "Please Enter All Fields" })
	}

	// Check existing User find by email
	User.findOne({ email }).then(user => {
		if (!user) return res.status(400).json({ message: "User does not exists" })


		// Validate password - compare both password
		bcrypt
			.compare(password, user.password)
			.then(isMatch => {
				if (!isMatch) return res.status(400).json({ message: "Password Incorrect" })

				jwt.sign(
					{ id: user.id, username: user.sername }, // Know which user
					config.get('jwtSecret'),
					{ expiresIn: 3600 }, // Keep user logged in 3600 hour
					(err, token) => {
						if (err) throw err
						// Display user token, and user with their id, username, and email
						res.json({
							token,
							user: {
								id: user.id,
								username: user.username,
								email: user.email
							}
						})
					}
				)
			})
	})
})

// @route GET api/auth/user
// @desc Get user data
// @access Private
// auth middleware make the route private
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password') // - the password, so it will not display the password
		.then(user => res.json(user))
})

module.exports = router
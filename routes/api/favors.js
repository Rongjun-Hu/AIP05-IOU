const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const config = require('config')

//Model
const Favor = require('../../models/Favor')


// @route POST api/addfavor
// @desc Add a favor
// @access Private
// Only logged in user can add a favor
router.post('/addfavor', (req, res) => {
	const { owepeoplename, ownername, reward, proof, iscomplete } = req.body;

	// Simple Validation
	if (!owepeoplename || !ownername || reward == []) {
		return res.status(400).json({ message: "Please Enter All Fields" })
	}

	const newFavor = new Favor({
		owepeoplename,
		ownername,
		reward,
		proof,
		iscomplete
	})


	// add favor to database
	newFavor.save().then(() => {
		return res.status(200).json({
			success: true,
			message: 'New favor have created',
		})
	})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'Failed to create new favor',
			})
		})
})

// @route POST api/favors/owe
// @desc get owes data
router.post('/owe', (req, res) => {

	const { username, iscomplete } = req.body

	Favor.find({ "owepeoplename": username, "iscomplete": iscomplete })
		.then((favor) => {
			return res.status(200).json({
				success: true,
				data: favor,
			})
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'favor do not find',
			})
		})
});


// @route POST api/favors/owed
// @desc get owed data
router.post('/owed', (req, res) => {

	const { username, iscomplete } = req.body;

	Favor.find({ "ownername": username, "iscomplete": iscomplete })
		.then((favor) => {
			return res.status(200).json({
				success: true,
				data: favor
			})
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'favor do not find',
			})
		})
});


// @route POST api/favors/record
// @desc get completed owes/owed data
router.post('/record', (req, res) => {

	const { username, iscomplete } = req.body;

	Favor.find({ "iscomplete": iscomplete, $or: [{ "owepeoplename": username }, { "ownername": username }] })
		.then((favor) => {
			return res.status(200).json({
				success: true,
				data: favor
			})
		})
		.catch(error => {
			return res.status(400).json({
				error,
				message: 'favor do not created',
			})
		})
});


// @route POST api/favors/update
// @desc complete an owe
router.post('/update/:id', (req, res) => {

	Favor.findById(req.params.id)
		.then((favor) => {
			favor.iscomplete = req.body.iscomplete;
			favor.proof = req.body.proof;

			favor.save().then(() => {
				return res.status(200).json({
					success: true,
					data: favor
				})
			})
				.catch(error => {
					return res.status(400).json({
						error,
						message: 'favor do not complete',
					})
				})
		})
});


//upload image
router.post('/upload', (req, res) => {

	const file = req;

	file.mv(`${__dirname}/client/public/images/${file.name}`, err => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}

		res.json({ filename: file.name, filePath: `/images/${file.name}` });
	});

});



module.exports = router
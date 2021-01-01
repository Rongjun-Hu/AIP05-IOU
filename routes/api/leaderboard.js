const express = require('express')
const router = express.Router()
const Favor = require('../../models/Favor')
const request = require('../../models/Request')

// The ranking of the people who owe the least
router.get('/selectFavor', (req, res) => {
	Favor.find({}).exec(function (err, docs) {
		let data = {};
		if (err) {
			console.log(err.message)
		} else {
			for (let item of docs) {
				//Interpret that owe people is not empty and undefined
				if (item.owepeoplename != null && item.owepeoplename != undefined) {
					//Query the number of owes
					if (!data.hasOwnProperty(item.owepeoplename)) {
						data[item.owepeoplename] = 1
					} else {
						data[item.owepeoplename] = parseInt(data[item.owepeoplename]) + 1
					}
				}
			}
			//Data sort processing, descending order
			let att = Object.keys(data).sort(function (x, y) {
				return data[x] - data[y]
			})
			let attr = {}
			//Processing sorted position
			for (let item of att) {
				attr[item] = data[item]
			}
			data=attr

		}
		res.send(data);
		return;
	})
})


//Ranking of the number of release requests
router.get('/selectRequest', async function (req, res, next) {
	try {
		// Query data
		await request.find({}).populate('publisher').exec(function (err, docs) {
			let data = {};
			if (err) {
				// Error printing
				console.log(err.message)
			} else {
				for (let item of docs) {
					//Interpret that the publisher is not empty and undefined for processing
					if (item.publisher != null && item.publisher != undefined) {
						// Count the number of publisher requests
						if (!data.hasOwnProperty(item.publisher.username)) {
							data[item.publisher.username] = 1
						} else {
							data[item.publisher.username] = parseInt(data[item.publisher.username]) + 1
						}
					}
				}
				//Data sort processing, descending order
				let att = Object.keys(data).sort(function (x, y) {
					return data[x] - data[y]
				})
				let attr = {}
				//Processing sorted position
				for (let item of att) {
					attr[item] = data[item]
				}
				res.send(attr);
				return;
			}
		})
	} catch (e) {
		res.send({
			status: "fail",
			data: e.message
		});
		return;
	}
});

module.exports = router

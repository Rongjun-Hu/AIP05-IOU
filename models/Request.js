const mongoose = require("mongoose");

/**
 * request: request name
 * description: request description
 * publisher: publisher id
 * recipient: recipient id
 * reward: reward id
 * proof: image url address
 * status: 0 posted 1 accepted 2 finished
 * postTime: request post time
 * @author Xingjing Li
 */
let requestScheme = mongoose.Schema({
	request: { type: String, required: true },
	description: { type: String, required: true },
	publisher: { type: String, required: true },
	recipient: String,
	reward: { type: [mongoose.Types.ObjectId], required: true, ref: 'Reward' },
	proof: String,
	status: { type: Number, default: 0 },
	postTime: { type: Date, default: Date.now },
});

let requestModel = mongoose.model("request", requestScheme);

module.exports = requestModel;

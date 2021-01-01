const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FavorSchema = new Schema(
	{
		owepeoplename: { type: String, required: true },
		ownername: { type: String, required: true },
		reward: {type: Array},
		proof: { data: Buffer, contentType: String },
		iscomplete: { type: Boolean, required: true },
		begin_date: { type: Date, default: Date.now }
	}
);

module.exports = Favor = mongoose.model("favor", FavorSchema);

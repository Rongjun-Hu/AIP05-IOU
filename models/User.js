const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: { type: String, require: true, unique: true },
		email: { type: String, require: true, unique: true },
		password: { type: String, require: true },
		register_date: { type: Date, default: Date.now }
	}
);

module.exports = User = mongoose.model("user", UserSchema);

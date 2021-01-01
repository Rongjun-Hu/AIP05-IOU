const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * name: reward name
 * amount: reward amount
 * userId: reward that post by user
 * create_time: create time.
 * @author Xingjing Li
 */
const RewardSchema = new Schema(
	{
		name: {type:String, required: true},
		amount:{type:Number, default: 1},
		userId: {type:String, required: true},
		create_time: {type: Date, default: Date.now},
	}
);

module.exports = rewardModel = mongoose.model("reward", RewardSchema);

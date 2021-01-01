let userDao = require("../models/User");

/**
 * query user by user id
 * @param userId
 * @returns user object
 * @author Xingjing Li
 */
const findUserByID = async (userId) => {
	let user = await userDao.findOne({ _id: userId });
	if (user === null) {
		throw new Error("user not exist")
	}
	return user;
};

module.exports = {
	findUserByID,
};


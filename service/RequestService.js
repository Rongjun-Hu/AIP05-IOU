let requestDao = require("../models/Request");
let rewardDao = require("../models/Reward");
const mongoose = require("mongoose");
const verify = require("../utils/VerifyToken")

/**
 * query request by pagenum and pagesize
 * @param pageNum
 * @param pageSize
 * @returns request list
 * @author Xingjing Li
 */
const getRequests = async (pageNum, pageSize) => {
	return requestDao.aggregate([
		{
			$lookup: {
				from: 'rewards',
				localField: 'reward',
				foreignField: '_id',
				as: 'reward'
			},
		}, {
			$match: {
				status: 0
			}
		}, {
			$skip: pageNum * 2
		}, {
			$limit: pageSize
		}
	]);
	// let requests = await requestDao.find();
	// return requests;
};

/**
 * query a request by id
 * @param requestId
 * @returns single request detail
 * @author Xingjing Li
 */
const getRequest = (requestId) => {
	let request = requestDao.aggregate([
		{
			$lookup: {
				from: 'rewards',
				localField: 'reward',
				foreignField: '_id',
				as: 'reward'
			}
		},
		{
			$match: {
				_id: mongoose.Types.ObjectId(requestId)
			}
		}
	]);
	return request;
};


/**
 * create a request
 * @param request
 * @param description
 * @param token
 * @param reward
 * @author Xingjing Li
 */
const createRequest = async (request, description, token, reward) => {
	if (token == null || token.length <= 0) {
		throw new Error("Please log in first!");
	}
	let object = verify(token);
	let publisher = object.id;

	let rewardId = mongoose.Types.ObjectId();
	const item = new rewardDao({
		_id: rewardId,
		name: reward,
		userId: publisher,
	});
	await item.save(item);
	const newRequest = new requestDao({
		request: request,
		description: description,
		publisher: publisher,
		reward: rewardId
	});
	await newRequest.save(newRequest);
};

/**
 * add a reward to request
 * @param requestId
 * @param token
 * @param reward
 * @author Xingjing Li
 */
const addReward = async (requestId, token, reward) => {
	if (token == null || token.length <= 0) {
		throw new Error("Please log in first!");
	}
	let object = verify(token);
	let publisher = object.id;

	let request = await requestDao.findOne({ _id: requestId });
	if (request == null) {
		throw new Error("request not exist");
	}
	let exRewardId = mongoose.Types.ObjectId();
	const item = new rewardDao({
		_id: exRewardId,
		name: reward,
		userId: publisher,
	});
	await item.save(item);
	let rewardId = request.reward;
	rewardId.push(exRewardId);
	await requestDao.updateOne({ _id: requestId }, { $set: { reward: rewardId } }, function (err, res) { });
};

/**
 * delete rewards by user token
 * @param requestId
 * @param token
 * @author Xingjing Li
 */
const deleteReward = async (requestId, token) => {
	if (token == null || token.length <= 0) {
		throw new Error("Please log in first!");
	}
	let object = verify(token);
	let userId = object.id;

	let request = await requestDao.aggregate([
		{
			$lookup: {
				from: 'rewards',
				localField: 'reward',
				foreignField: '_id',
				as: 'reward'
			}
		},
		{
			$match: {
				_id: mongoose.Types.ObjectId(requestId)
			}
		}
	]);
	if (request == null) {
		throw new Error("request not exist");
	}
	let rewards = request[0].reward;
	//console.log(rewards);
	request = await requestDao.findOne({ _id: requestId });
	let oldReward = request.reward;
	let newReward = new Array();
	for (let i = 0; i < rewards.length; i++) {
		if (rewards[i].userId === userId) {
			await rewardDao.findByIdAndDelete({ _id: rewards[i]._id });
		} else {
			newReward.push(rewards[i]._id);
		}

	}
	await requestDao.updateOne({ _id: requestId }, { $set: { reward: newReward } });
	//TODO reward is empty
	request = await requestDao.findOne({ _id: requestId });
	return request;
};

/**
 * user accept a request
 * @param requestId
 * @param token
 * @author Xingjing Li
 */
const acceptRequest = async (requestId, token) => {
	if (token == null || token.length <= 0) {
		throw new Error("Please log in first!");
	}
	let object = verify(token);
	let userId = object.id;
	if (userId == null) {
		throw new Error("Invalid token, please log in again!")
	}
	let request = await requestDao.findOne({ _id: requestId });
	if (request == null) {
		throw new Error("The request not exist!");
	}
	if (request.publisher === userId) {
		throw new Error("You cannot accept your request!");
	}
	await requestDao.updateOne({ _id: requestId }, { $set: { recipient: userId, status: 1 } }, function (err, res) { });
};

/**
 * query my accepted request
 * @param token
 * @returns my accepted request list
 * @author Xingjing Li
 */
const getMyRequests = async (token) => {
	if (token == null || token.length <= 0) {
		throw new Error("Please log in first!");
	}
	let object = verify(token);
	let userId = object.id;
	let myRequests = await requestDao.find({ recipient: userId });
	return myRequests;
};
/**
 * query my posted request
 * @param token
 * @returns my posted request list
 * @author Xingjing Li
 */
const getMyPostedRequests = async (token) => {
	if (token == null || token.length <= 0) {
		throw new Error("Please log in first!");
	}
	let object = verify(token);
	let userId = object.id;
	let postedRequests = await requestDao.find({ publisher: userId });
	return postedRequests;
};

module.exports = {
	getRequests,
	createRequest,
	addReward,
	deleteReward,
	getRequest,
	acceptRequest,
	getMyRequests,
	getMyPostedRequests
};


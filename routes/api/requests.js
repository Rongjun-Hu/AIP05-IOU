const express = require('express');
const router = express.Router();
const baseResult = require("../../base/BaseResult");
const url = require('url');
const { findUserByID } = require("../../service/UserService");
const { getRequests, getRequest, createRequest, addReward,
	deleteReward, acceptRequest, getMyRequests, getMyPostedRequests }
	= require("../../service/RequestService");

/**
 * retrieve all request data from database
 * @param pageNum and pageSize
 * @return status and data
 * @author Xingjing Li
 */
router.get('/', async function (req, res, next) {

	let { pathname, query } = url.parse(req.url, true);
	let pageNum = parseInt(query.pageNum) || 0;
	let pageSize = parseInt(query.pageSize) || 0;
	if (pageSize <= 0) {
		pageNum = 0;
		pageSize = 4;
	}
	let requests = await getRequests(pageNum, pageSize);
	// console.log(req.body.name);
	res.json(new baseResult("success", requests));
});

/**
 * retrieve single request data from database
 * @param request id
 * @return status and data
 * @author Xingjing Li
 */
router.get('/:id', async function (req, res, next) {
	try {
		let request = await getRequest(req.params.id);
		for (let i = 0; i < request[0].reward.length; i++) {
			let uid = request[0].reward[i].userId;
			let user = await findUserByID(uid);
			request[0].reward[i].userId = user.username;
		}
		res.json(new baseResult("success", request));
	} catch (e) {
		res.json(new baseResult("fail", e));
	}

});

/**
 * query accepted requests based on userId
 * @param user token
 * @return status and data
 * @author Xingjing Li
 */
router.get('/my/request', async function (req, res, next) {
	try {
		// let token = req.body.key;
		let { pathname, query } = url.parse(req.url, true);
		let myPostedRequests = await getMyRequests(query.token);
		res.json(new baseResult("success", myPostedRequests));
	} catch (e) {
		res.json(new baseResult("fail", e.message));
	}
});

/**
 * query posted requests based on userId
 * @param user token
 * @return status and data
 * @author Xingjing Li
 */
router.get('/my/posted', async function (req, res, next) {
	try {
		let { pathname, query } = url.parse(req.url, true);
		let myPostedRequests = await getMyPostedRequests(query.token);
		res.json(new baseResult("success", myPostedRequests));
	} catch (e) {
		res.json(new baseResult("fail", e.message));
	}
});

/**
 * create a request
 * @param request name description token and reward
 * @return status and data
 * @author Xingjing Li
 */
router.post('/', async function (req, res, next) {
	try {
		let request = req.body.request;
		let description = req.body.description;
		let publisher = req.body.token;
		let reward = req.body.reward;
		await createRequest(request, description, publisher, reward);
		res.json(new baseResult("success", "success"));
	} catch (e) {
		res.json(new baseResult("fail", e.message));
	}
});

/**
 * add a reward to a request
 * @param request id token and reward
 * @return status and data
 * @author Xingjing Li
 */
router.post('/addreward', async function (req, res, next) {
	try {
		let requestId = req.body.requestId;
		let key = req.body.token;
		let reward = req.body.reward;
		let request = await addReward(requestId, key, reward);
		res.json(new baseResult("success", "Add reward successfully"));
	} catch (e) {
		res.json(new baseResult("fail", e.message));
	}
});

/**
 * delete a reward from a request
 * @param user token
 * @return status and data
 * @author Xingjing Li
 */
router.delete('/deletereward', async function (req, res, next) {
	try {
		// let requestId = req.body.requestId;
		// let token = req.body.token;
		let { pathname, query } = url.parse(req.url, true);
		let request = await deleteReward(query.requestId, query.token);
		res.json(new baseResult("success", "Remove successfully"));
	} catch (e) {
		res.json(new baseResult("fail", e.message));
	}
});

/**
 * accept a request
 * @param user token and request id
 * @return status and data
 * @author Xingjing Li
 */
router.patch('/acceptrequest', async function (req, res, next) {
	try {
		let requestId = req.body.requestId;
		let token = req.body.token;
		await acceptRequest(requestId, token);
		res.json(new baseResult("success", "Accept successfully! Finish the task to claim reward!"));
	} catch (e) {
		res.json(new baseResult("fail", e.message));
	}
});

/**
 * finish a request
 * @param user token and request id
 * @return status and data
 * @author Xingjing Li
 */
router.post('/finishrequest', async function (req, res, next) {
	try {
		let requestId = req.body.requestId;
		let token = req.body.token;

		res.json(new baseResult("success", "Congratulations!"));
	} catch (e) {
		res.json(new baseResult("fail", e.message));
	}
});




module.exports = router;

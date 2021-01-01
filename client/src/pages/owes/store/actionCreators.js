import axios from 'axios';

const changeOwesData = (result) => ({
	type: 'CHANGE_OWES_DATA',
	oweList: result,
});

const changeOwedData = (result) => ({
	type: 'CHANGE_OWED_DATA',
	owedList: result
});

const changeRecordData = (result) => ({
	type: 'CHANGE_RECORD_DATA',
	recordList: result
})

const changeRewardData = (result) => ({
	type: "CHANGE_REWARD_DATA",
	rewardList: result.reward,
})

const changeUserData = (result) => ({
	type: "CHANGE_USER_DATA",
	userList: result,
})

const completeFavor = (index, oweType) => ({
	type: "COMPLETE_FAVOR",
	index,
	oweType
})


export const getOwesData = ({ username, iscomplete }) => {
	return (dispatch) => {
		//Header
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

		const body = JSON.stringify({
			username, iscomplete
		})
		axios.post('/api/favors/owe', body, config).then((res) => {
			const result = res.data.data
			console.log(body)
			dispatch(changeOwesData(result));
		})
	}
}

export const getOwedData = ({ username, iscomplete }) => {
	return (dispatch) => {
		//Header
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

		const body = JSON.stringify({
			username, iscomplete
		})
		axios.post('/api/favors/owed', body, config).then((res) => {
			const result = res.data.data
			dispatch(changeOwedData(result));
		})
	}
};

export const getRecordData = ({ username, iscomplete }) => {
	return (dispatch) => {
		//Header
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

		const body = JSON.stringify({
			username, iscomplete
		})
		axios.post('/api/favors/record', body, config).then((res) => {
			const result = res.data.data
			dispatch(changeRecordData(result));
		})
	}
}

export const getRewards = () => {
	return (dispatch) => {
		axios.get('/api/reward.json').then((res) => {
			const result = res.data.data;
			dispatch(changeRewardData(result));
		})
	}
}

export const getUsers = () => {
	return (dispatch) => {
		axios.get('/api/users/user').then((res) => {
			const result = res.data;
			dispatch(changeUserData(result));
		})
	}
}

export const owePeopleChange = (value) => ({
	type: 'OWE_PEOPLE_CHANGE',
	value: value
})

export const rewardChange = (value) => ({
	type: 'REWARD_CHANGE',
	value: value
});

export const amountChange = (value) => ({
	type: 'AMOUNT_CHANGE',
	value: value
});

export const addReward = (value) => ({
	type: 'ADD_REWARD',
	value: value
}
);

export const deleteReward = (index) => ({
	type: 'DELETE_REWARD',
	index: index
});

export const addPicture = (fileList) => ({
	type: 'ADD_PICTURE',
	value: fileList
})

const addFav = (result) => ({
	type: 'ADD_FAVOR',
	message: result
});

export const addFavor = ({ owepeoplename, ownername, reward, proof, iscomplete }) => {
	return (dispatch) => {
		//Header
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

		// Request Body
		const body = JSON.stringify({ owepeoplename, ownername, reward, proof, iscomplete })
		console.log(body)
		axios.post('/api/favors/addfavor', body, config).then((res) => {
			const result = res.data.message;
			console.log(body)
			console.log(result);
			dispatch(addFav(result));
			window.location.reload();
		}).catch(err => {
			console.log(err)
			alert(err)
		})
	}

}

export const handleComplete = (id, { iscomplete, proof }, index, oweType) => {
	return (dispatch) => {
		//Header
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

		// Request Body
		const body = JSON.stringify({ iscomplete, proof })
		console.log(body)
		axios.post('/api/favors/update/' + id, body, config).then((res) => {
			const result = res.data;
			console.log(result)
			dispatch(completeFavor(index, oweType));
			window.location.reload();
		}).catch(err => {
			console.log(err)
		})
	}
}

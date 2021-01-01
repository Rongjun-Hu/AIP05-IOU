import { ProfileOutlined } from "@ant-design/icons";


const defaultState = {
	owepeople: null,
	rewardname: '',
	rewardamount: 0,
	oweList: [''],
	owedList: [''],
	recordList: [''],
	rewardList: [''],
	userList: [''],
	addrewardList: [],
	fileList: [],
	imgList: [],
	picUrl: '',
	isUpload: false
};

export default (state = defaultState, action) => {
	if (action.type === 'CHANGE_OWES_DATA') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.oweList = action.oweList;
		return newState;
	} else if (action.type === 'CHANGE_OWED_DATA') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.owedList = action.owedList;
		return newState;
	} else if (action.type === 'CHANGE_RECORD_DATA') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.recordList = action.recordList;
		return newState;
	}
	else if (action.type === 'CHANGE_REWARD_DATA') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.rewardList = action.rewardList;
		return newState
	} else if (action.type === 'CHANGE_USER_DATA') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.userList = action.userList;
		return newState;
	} else if (action.type === 'OWE_PEOPLE_CHANGE') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.owepeople = action.value;
		return newState
	} else if (action.type === 'REWARD_CHANGE') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.rewardname = action.value;
		return newState
	} else if (action.type === 'AMOUNT_CHANGE') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.rewardamount = action.value;
		return newState
	} else if (action.type === 'ADD_REWARD') {
		const newState = JSON.parse(JSON.stringify(state));
		if (newState.rewardname === '') {
			alert("please enter activity");
		}
		else {
			newState.addrewardList.push(action.value);
		}
		newState.rewardname = ''
		newState.rewardamount = 1
		return newState;
	} else if (action.type === 'DELETE_REWARD') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.addrewardList.splice(action.index, 1);
		return newState
	} else if (action.type === 'ADD_FAVOR') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.owepeople = ''
		newState.rewardname = ''
		newState.rewardamount = 1
		newState.addrewardList = []
		console.log(action.message)
		return newState
	} else if (action.type === 'ADD_FAVOR_FAIL') {
		console.log(action.message)
	} else if (action.type === 'COMPLETE_FAVOR') {
		const newState = JSON.parse(JSON.stringify(state));
		if (action.oweType === 'owe') {
			newState.oweList.splice(action.index, 1)
		} else if (action.oweType === 'owed') {
			newState.owedList.splice(action.index, 1)
		}
		newState.fileList = []
		newState.picUrl = ''
		return newState;
	} else if (action.type === 'REMOVE_IMAGE') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.imgList = ['']
		return newState;
	} else if (action.type === 'FILE_UPLOAD') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.imgList.push(action.value)
		return newState;
	} else if (action.type === 'GET_URL') {
		const newState = JSON.parse(JSON.stringify(state))
		if (action.originProof === null) {
			newState.fileList = [action.url]
		} else {
			newState.fileList = action.originProof
			newState.fileList.push(action.url)
		}
		newState.imgList = []
		newState.isUpload = true
		alert("Upload successfully")
		return newState;
	}
	else
		return state;
}

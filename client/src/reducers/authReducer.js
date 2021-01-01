import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from '../actions/types'

const defaultState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: false,
	user: '',
}

export default function (state = defaultState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			}
		case USER_LOADED:
			const newState = JSON.parse(JSON.stringify(state));
			newState.isAuthenticated = true;
			newState.isLoading = false
			newState.user = action.payload
			return  newState
		
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
			}
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			}
		default:
			return state
	}
}
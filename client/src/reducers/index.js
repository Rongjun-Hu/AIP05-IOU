import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import { reducer as favorReducer} from '../pages/owes/store'

export default combineReducers({
	auth: authReducer,
	error: errorReducer,
	owes: favorReducer
})
import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import tweets from './questions'

export default combineReducers({
  authedUser,
  users,
  tweets,
})

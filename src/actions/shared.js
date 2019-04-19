import { receiveUsers } from './users'
import { receiveTweets } from './tweets'
import { getInitialData } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData ()
      .then(({users, tweets}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(hideLoading())
      })
  }
}

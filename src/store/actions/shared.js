import { getInitialData } from '../../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

// // Using a fake logged user for now
const AUTHED_ID = null

export function handleInitialData() {
  return async (dispatch) => {
    dispatch(showLoading())
    const { users, questions } = await getInitialData()
    dispatch(setAuthedUser(AUTHED_ID))
    dispatch(receiveUsers(users))
    dispatch(receiveQuestions(questions))
    dispatch(hideLoading())
  }
}

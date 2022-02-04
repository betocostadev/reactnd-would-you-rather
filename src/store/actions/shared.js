import { getInitialData } from '../../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData() {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const { users, questions } = await getInitialData()
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
    } catch (error) {
      console.log(error)
      throw new Error('Error loading data')
    } finally {
      dispatch(hideLoading())
    }
  }
}

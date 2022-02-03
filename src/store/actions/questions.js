import { saveQuestion } from '../../utils/api'
import { saveQuestionAnswer } from '../../utils/api'
import { addUserQuestion, addUserQuestionVote } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_VOTE = 'ADD_VOTE'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addVote({ authedUser, qid, answer }) {
  return {
    type: ADD_VOTE,
    authedUser,
    qid,
    answer,
  }
}

export function handleAddVote(info) {
  return async (dispatch) => {
    try {
      await saveQuestionAnswer(info)
      dispatch(addVote(info))
      dispatch(addUserQuestionVote(info))
    } catch (error) {
      console.warn('error in handleAddVote: ', error)
      throw new Error('There was an error.')
    }
  }
}

export function addNewQuestion(question) {
  return {
    type: ADD_NEW_QUESTION,
    question,
  }
}

export function handleAddNewQuestion(info) {
  return async (dispatch, getState) => {
    try {
      const { authedUser } = getState()
      dispatch(showLoading())

      const question = await saveQuestion({
        optionOneText: info.optionOneText,
        optionTwoText: info.optionTwoText,
        author: authedUser,
      })

      dispatch(addNewQuestion(question))
      dispatch(addUserQuestion(question))
    } catch (error) {
      console.warn('error in handleAddNewQuestion: ', error)
      throw new Error('There was an error.')
    } finally {
      dispatch(hideLoading())
    }
  }
}

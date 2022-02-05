import { saveQuestion } from '../../utils/api'
import { saveQuestionAnswer } from '../../utils/api'
import { addUserQuestion, addUserQuestionVote } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { handleToggleNotify } from './notify'

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
      dispatch(showLoading())
      await saveQuestionAnswer(info)
      dispatch(addVote(info))
      dispatch(addUserQuestionVote(info))
      dispatch(
        handleToggleNotify({
          open: true,
          severity: 'success',
          message: 'Vote added Successfully!',
        })
      )
    } catch (error) {
      console.warn('error in handleAddVote: ', error)
      dispatch(
        handleToggleNotify({
          open: true,
          severity: 'error',
          message: 'Error adding your vote, try again.',
        })
      )
      throw new Error('There was an error.')
    } finally {
      dispatch(hideLoading())
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
      dispatch(
        handleToggleNotify({
          open: true,
          severity: 'success',
          message: 'Question added Successfully!',
        })
      )
    } catch (error) {
      console.warn('error in handleAddNewQuestion: ', error)
      dispatch(
        handleToggleNotify({
          open: true,
          severity: 'error',
          message: 'Error adding question, try again.',
        })
      )
      throw new Error('There was an error.')
    } finally {
      dispatch(hideLoading())
    }
  }
}

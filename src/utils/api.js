import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export async function getInitialData() {
  const [users, questions] = await Promise.all([_getUsers(), _getQuestions()])
  return {
    users,
    questions,
  }
}

export async function saveQuestion(info) {
  return await _saveQuestion(info)
}

export async function saveQuestionAnswer(info) {
  return await _saveQuestionAnswer(info)
}

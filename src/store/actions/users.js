export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_QUESTION_VOTE = 'ADD_USER_QUESTION_VOTE'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addUserQuestionVote({ authedUser, qid, answer }) {
  return {
    type: ADD_USER_QUESTION_VOTE,
    authedUser,
    qid,
    answer,
  }
}

export function addUserQuestion(question) {
  return {
    type: ADD_USER_QUESTION,
    question,
  }
}

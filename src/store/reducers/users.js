import {
  RECEIVE_USERS,
  ADD_USER_QUESTION_VOTE,
  ADD_USER_QUESTION,
} from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }

    case ADD_USER_QUESTION_VOTE:
      const { authedUser, qid, answer } = action

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      }

    case ADD_USER_QUESTION:
      const { question } = action
      const user = question.author

      return {
        ...state,
        [user]: {
          ...state[user],
          questions: state[user].questions.concat([question.id]),
        },
      }

    default:
      return state
  }
}

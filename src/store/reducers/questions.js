import {
  ADD_NEW_QUESTION,
  ADD_VOTE,
  RECEIVE_QUESTIONS,
} from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }
    case ADD_VOTE:
      const { authedUser, qid, answer } = action

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      }

    case ADD_NEW_QUESTION:
      const { question } = action

      return {
        ...state,
        [question.id]: question,
      }

    default:
      return state
  }
}

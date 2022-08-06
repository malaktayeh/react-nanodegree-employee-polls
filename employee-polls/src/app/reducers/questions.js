import { GET_QUESTIONS } from '../actions/questions';

export default function questions(action, state = {}) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    default:
      return state;
  }
}

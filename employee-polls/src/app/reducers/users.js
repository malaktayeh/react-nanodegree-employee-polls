import { GET_USERS } from '../actions/users';

export default function users(action, state = {}) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
      };
    default:
      return state;
  }
}

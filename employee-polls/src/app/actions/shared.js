// import { _getUsers } from '../../../../_DATA';
import { getUsers } from './users';
import { getQuestions } from './questions';
import { setAuthedUser } from './authedUser';

// TODO: removed hard-coded user later
const AUTHED_ID = 'tylermcginnis';

export default function handleInitialData() {
  return (dispatch) => {
    return handleInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}

/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { _getUsers } from '../../_DATA';

export const initialState = {
  loading: false,
  hasErrors: false,
  users: {}
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      console.log(payload);
      state.users = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getUsersFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

// ACTIONS
export const { getUsers, getUsersSuccess, getUsersFailure } = usersSlice.actions;

// SELECTORS
export const usersSelector = (state) => state.users;

// REDUCER
export default usersSlice.reducer;

// Asynchronous thunk action
export function fetchUsers() {
  return async (dispatch) => {
    dispatch(getUsers());

    try {
      const response = await _getUsers();
      dispatch(getUsersSuccess(response));
    } catch (error) {
      dispatch(getUsersFailure());
    }
  };
}

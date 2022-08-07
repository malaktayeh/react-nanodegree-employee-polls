/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// import { _getUsers } from '../../_DATA';

export const initialState = {
  loading: false,
  hasErrors: false,
  authedUser: {}
};

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState,
  reducers: {
    getAuthedUser: (state) => {
      state.loading = true;
    },
    getAuthedUserSuccess: (state, { payload }) => {
      state.authedUser = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getAuthedUserFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    setAuthedUser: (state, { payload }) => {
      state.authedUser = payload;
      state.loading = false;
      state.hasErrors = false;
    }
  }
});

// ACTIONS
export const { getAuthedUser, getAuthedUserSuccess, getAuthedUserFailure, setAuthedUser } =
  authedUserSlice.actions;

// SELECTORS
export const authedUserSelector = (state) => state.authedUser;

// Reducer
export default authedUserSlice.reducer;

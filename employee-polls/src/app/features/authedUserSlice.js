/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  status: 'idle',
  errors: false,
  authedUser: {}
};

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState,
  reducers: {
    getAuthedUser: (state) => {
      state.status = 'loading';
    },
    getAuthedUserSuccess: (state, { payload }) => {
      state.authedUser = payload;
      state.status = 'succeeded';
      state.errors = null;
    },
    getAuthedUserFailure: (state) => {
      state.status = 'failed';
      state.hasErrors = 'An error has occured while getting the authed users.';
    },
    setAuthedUser: (state, { payload }) => {
      state.authedUser = payload;
      state.status = 'succeeded';
      state.error = null;
    },
    removeAuthedUser: (state) => {
      state.authedUser = {};
      state.status = 'succeeded';
      state.errors = null;
    }
  }
});

// ACTIONS
export const {
  getAuthedUser,
  getAuthedUserSuccess,
  getAuthedUserFailure,
  setAuthedUser,
  removeAuthedUser
} = authedUserSlice.actions;

// SELECTORS
export const authedUserSelector = (state) => state.authedUser;

// Reducer
export default authedUserSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { _getQuestions } from '../../_DATA';

export const initialState = {
  loading: false,
  hasErrors: false,
  questions: []
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    getQuestions: (state) => {
      state.loading = true;
    },
    getQuestionsSuccess: (state, { payload }) => {
      // eslint-disable-next-line no-console
      console.log(payload);
      state.questions = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getQuestionsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

// ACTIONS
export const { getQuestions, getQuestionsSuccess, getQuestionsFailure } = questionsSlice.actions;

// SELECTORS
export const questionsSelector = (state) => state.questions;

// REDUCER
export default questionsSlice.reducer;

// Asynchronous thunk action
export function fetchQuestions() {
  return async (dispatch) => {
    dispatch(getQuestions());

    try {
      const response = await _getQuestions();
      dispatch(getQuestionsSuccess(response));
    } catch (error) {
      dispatch(getQuestionsFailure());
    }
  };
}

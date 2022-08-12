/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion } from '../../_DATA';

export const initialState = {
  loading: false,
  hasErrors: false,
  questions: {}
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    getQuestions: (state) => {
      state.loading = true;
    },
    getQuestionsSuccess: (state, { payload }) => {
      state.questions = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getQuestionsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    postQuestion: (state) => {
      state.loading = true;
    },
    postQuestionSuccess: (state, { payload }) => {
      state.questions = { ...state.questions, [payload.id]: payload };
      state.loading = false;
      state.hasErrors = false;
    },
    postQuestionFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

// ACTIONS
export const {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsFailure,
  postQuestion,
  postQuestionFailure,
  postQuestionSuccess
} = questionsSlice.actions;

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

// Asynchronous thunk action
export function addQuestion(question) {
  return async (dispatch) => {
    dispatch(postQuestion());

    try {
      const response = await _saveQuestion(question);
      dispatch(postQuestionSuccess(response));
    } catch (error) {
      dispatch(postQuestionFailure());
    }
  };
}

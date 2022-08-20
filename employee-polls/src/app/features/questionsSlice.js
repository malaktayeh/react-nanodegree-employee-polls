/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../_DATA';

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
      // MAKE COPY OF CURRENT STATE
      const newState = { ...state };

      try {
        newState.questions[payload.id] = payload;
      } catch (err) {
        console.log(err);
      }

      state.questions = { ...state.questions, ...newState.questions };
      state.loading = false;
      state.hasErrors = false;
    },
    postQuestionFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    postQuestionAnswer: (state) => {
      state.loading = true;
    },
    postQuestionAnswerSuccess: (state, { payload }) => {
      // MAKE COPY OF CURRENT STATE
      const newState = { ...state };
      // COPY CURRENT VOTES ARRAY, ADD ID OF USER WHO VOTES
      const newVotesArr = [
        ...newState.questions[payload.qid][payload.answer].votes,
        payload.authedUser
      ];
      // REPLACE OLD STATE VOTE ARRAY WITH NEW ARRAY
      try {
        newState.questions[payload.qid][payload.answer].votes = newVotesArr;
      } catch (err) {
        console.log(err);
      }
      state.questions = { ...state.questions, ...newState.questions };
      state.loading = false;
      state.hasErrors = false;
    },
    postQuestionAnswerFailure: (state) => {
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
  postQuestionSuccess,
  postQuestionAnswer,
  postQuestionAnswerSuccess,
  postQuestionAnswerFailure
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

// Asynchronous thunk action
export function vote(submission) {
  return async (dispatch) => {
    dispatch(postQuestionAnswer());

    try {
      await _saveQuestionAnswer(submission);
      dispatch(postQuestionAnswerSuccess(submission));
    } catch (error) {
      dispatch(postQuestionAnswerFailure());
    }
  };
}

/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../_DATA';

const questionsAdapter = createEntityAdapter();

const initialState = questionsAdapter.getInitialState({
  status: 'idle',
  error: null
});

// Asynchronous thunk action
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await _getQuestions();
  return response;
});

export const addQuestion = createAsyncThunk('questions/addQuestion', async () => {
  const response = await _saveQuestion();
  return response;
});

export const vote = createAsyncThunk('questions/saveAnswer', async () => {
  const response = await _saveQuestionAnswer();
  return response;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      questionsAdapter.setAll(state, payload);
    });
    builder.addCase(fetchQuestions.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Failed to fetch questions.';
    });
    builder.addCase(addQuestion.fulfilled, (state, { payload }) => {
      // MAKE COPY OF CURRENT STATE
      const newState = { ...state };

      try {
        newState.questions[payload.id] = payload;
      } catch (err) {
        console.log(err);
      }
      state.questions = { ...state.questions, ...newState.questions };
      state.status = 'succeeded';
    });
    builder.addCase(addQuestion.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addQuestion.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Failed to add new question.';
    });
    builder.addCase(vote.fulfilled, (state, { payload }) => {
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
    });
    builder.addCase(vote.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(vote.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Failed to save answer.';
    });
  }
});

// SELECTORS
export const { selectEntities, selectAll, selectIds, selectTotal, selectById } =
  questionsAdapter.getSelectors((state) => state.questions);

// REDUCER
export default questionsSlice.reducer;

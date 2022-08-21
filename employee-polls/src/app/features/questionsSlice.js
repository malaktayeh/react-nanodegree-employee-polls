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
  reducers: {
    setAllQuestions: questionsAdapter.setAll,
    addNewQuestion: questionsAdapter.addOne,
    updateQuestion: questionsAdapter.updateOne
  },
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
      state.status = 'succeeded';
      questionsAdapter.addOne(state, payload.id);
    });
    builder.addCase(addQuestion.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addQuestion.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Failed to add new question.';
    });
    builder.addCase(vote.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      questionsAdapter.updateOne(state, {
        id: payload.id,
        questions: payload.questions
      });
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
export const {
  setAllQuestions,
  selectAll: selectAllQuestions,
  selectIds,
  selectTotal,
  selectById,
  selectEntities: selectQuestionsEntities,
  addNewQuestion,
  updateQuestion
} = questionsAdapter.getSelectors((state) => state.questions);

// // SELECTORS
// export const questionsStatus = questionsAdapter.getSelectors((state) => state.questions.status);

// REDUCER
export default questionsSlice.reducer;

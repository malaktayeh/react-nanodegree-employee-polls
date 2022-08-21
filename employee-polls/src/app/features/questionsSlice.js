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

export const addQuestion = createAsyncThunk('questions/addQuestion', async (payload) => {
  const response = await _saveQuestion(payload);
  return response;
});

export const vote = createAsyncThunk('questions/saveAnswer', async (payload) => {
  const response = await _saveQuestionAnswer(payload);
  return response;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setAllQuestions: questionsAdapter.setAll,
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
      questionsAdapter.addOne(state, payload);
    });
    builder.addCase(addQuestion.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addQuestion.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Failed to add new question.';
    });
    builder.addCase(vote.fulfilled, (state, payload) => {
      const questionId = payload.meta.arg.qid;
      const selectedOption = payload.meta.arg.answer;
      const user = payload.meta.arg.authedUser;

      // make shallow copy of question that needs to get updated in questions slice
      const copyObj = questionsAdapter.getSelectors().selectById(state, questionId);

      const updatedQuestion = {
        ...copyObj,
        id: copyObj.id,
        author: copyObj.author,
        optionOne: {
          ...copyObj.optionOne,
          text: copyObj.optionOne.text,
          votes: [...copyObj.optionOne.votes]
        },
        optionTwo: {
          ...copyObj.optionTwo,
          text: copyObj.optionTwo.text,
          votes: [...copyObj.optionTwo.votes]
        },
        timestamp: copyObj.timestamp
      };

      // add current user to votes array
      updatedQuestion[selectedOption].votes.push(user);

      // update state
      state.status = 'succeeded';
      questionsAdapter.updateOne(state, {
        id: questionId,
        changes: {
          ...updatedQuestion
        }
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

// REDUCER
export default questionsSlice.reducer;

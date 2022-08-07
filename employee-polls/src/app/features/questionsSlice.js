import { createSlice } from '@reduxjs/toolkit';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: [],
  reducers: {
    getQuestions(state, action) {
      state.push({
        questions: action.questions,
        completed: false
      });
    }
  }
});

export const { getQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;

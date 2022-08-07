import { createSlice } from '@reduxjs/toolkit';

const authedUserSlice = createSlice({
  name: 'authedUser',
  initialState: [],
  reducers: {
    getAuthedUser(state, action) {
      state.push({
        authedUser: action.user.id,
        completed: false
      });
    }
  }
});

export const { getAuthedUser } = authedUserSlice.actions;
export default authedUserSlice.reducer;

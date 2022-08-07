import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getUsers(state, action) {
      state.push({
        users: action.users,
        completed: false
      });
    }
  }
});

export const { getUsers } = usersSlice.actions;
export default usersSlice.reducer;

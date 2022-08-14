/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../../_DATA';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null
});

// Asynchronous thunk action
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await _getUsers();
  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      usersAdapter.setAll(state, payload);
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Failed to fetch users.';
    });
  }
});

// REDUCER
export default usersSlice.reducer;

// SELECTORS
export const { selectEntities, selectAll, selectIds, selectTotal, selectById } =
  usersAdapter.getSelectors((state) => state.users);

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import usersReducer from './features/usersSlice';
import authedUserReducer from './features/authedUserSlice';
import questionsReducer from './features/questionsSlice';

const reducer = combineReducers({
  users: usersReducer,
  authedUser: authedUserReducer,
  questions: questionsReducer
});

const store = configureStore({
  reducer
});

export default store;

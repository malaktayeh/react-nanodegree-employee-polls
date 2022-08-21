import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './app/components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './app/views/Login';
import AddPoll from './app/views/AddPoll';
// import UserPollList from './app/components/UserPollList';
import Poll from './app/components/Poll';
import Leaderboard from './app/views/Leaderboard';
import Dashboard from './app/views/Dashboard';
import { authedUserSelector } from './app/features/authedUserSlice';

function App() {
  const { authedUser } = useSelector(authedUserSelector);

  return (
    <div id="App">
      <Routes>
        <Route path="/login" element={<Login user={authedUser} />} />
        <Route
          path="/add"
          exact
          element={
            <PrivateRoute>
              <AddPoll />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-polls"
          exact
          element={
            <PrivateRoute>
              <div>hehe</div>
              {/* <UserPollList /> */}
            </PrivateRoute>
          }
        />
        <Route
          path="/poll/:id"
          element={
            <PrivateRoute>
              <Poll />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<div>404!</div>} />
      </Routes>
    </div>
  );
}

export default connect()(App);

import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './app/components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './app/views/Login';
import AddPoll from './app/views/AddPoll';
import MyPolls from './app/views/MyPolls';
import Poll from './app/views/Poll';
import Leaderboard from './app/views/Leaderboard';
import Dashboard from './app/views/Dashboard';
import { authedUserSelector } from './app/features/authedUserSlice';

function App() {
  const { authedUser } = useSelector(authedUserSelector);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login user={authedUser} />} />
        <Route
          path="/add-poll"
          element={
            <PrivateRoute>
              <AddPoll />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-polls"
          element={
            <PrivateRoute>
              <MyPolls />
            </PrivateRoute>
          }
        />
        <Route
          path="/poll"
          element={
            <PrivateRoute>
              <Poll />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
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
      </Routes>
    </div>
  );
}

export default connect()(App);

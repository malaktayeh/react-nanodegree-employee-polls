import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './app/components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './app/views/Login';
import AddPoll from './app/views/AddPoll';
import MyPolls from './app/views/MyPolls';
import Poll from './app/components/Poll';
import Leaderboard from './app/views/Leaderboard';
import Dashboard from './app/views/Dashboard';
import Error404 from './app/views/Error404';

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/login" element={<Login />} />
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
              <MyPolls />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
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
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Error404 />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default connect()(App);

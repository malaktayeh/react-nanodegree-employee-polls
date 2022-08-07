import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
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
        <Route path="/add-poll" element={<AddPoll />} />
        <Route path="/my-polls" element={<MyPolls />} />
        <Route path="/poll" element={<Poll />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default connect()(App);

import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './app/views/Login';
import AddPoll from './app/views/AddPoll';
import MyPolls from './app/views/MyPolls';
import Poll from './app/views/Poll';
import Leaderboard from './app/views/Leaderboard';
import Dashboard from './app/views/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add-poll" element={<AddPoll />} />
        <Route path="/my-polls" element={<MyPolls />} />
        <Route path="/poll" element={<Poll />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default connect()(App);

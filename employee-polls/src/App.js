import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './app/views/Login';
import AddPoll from './app/views/AddPoll';
import MyPolls from './app/views/MyPolls';
import Poll from './app/views/Poll';
import Leaderboard from './app/views/Leaderboard';
import Dashboard from './app/views/Dashboard';

function App() {
  // useEffect(() => {
  //   dispatch(handleInitialData());
  // }, []);

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

// App.propTypes = {
//   dispatch: PropTypes.func.isRequired
// };

export default connect()(App);

/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

function LeaderboardTable({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Num of polls answered</th>
          <th>Num of polls created</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(data).map((user, index) => (
          <tr key={user.user}>
            <td>{index + 1}</td>
            <td>@{user.user}</td>
            <td>{user.pollsAnswers}</td>
            <td>{user.pollsCreated}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

LeaderboardTable.propTypes = {
  data: PropTypes.object.isRequired
};

export default LeaderboardTable;

/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

function LeaderboardTable({ data }) {
  const sortData = data.sort(
    (user1, user2) =>
      user2.pollsAnswered + user2.pollsCreated - (user1.pollsAnswered + user1.pollsCreated)
  );

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ textAlign: 'center', verticalAlign: 'middle', minWidth: '50px' }}>#</th>
          <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Avatar</th>
          <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>User</th>
          <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Name</th>
          <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Num of polls answered</th>
          <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Num of polls created</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(sortData).map((user, index) => (
          <tr key={user.id}>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{index + 1}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <img src={user.avatarURL} style={{ maxWidth: '100px' }} alt={`${user.id}'s avatar`} />
            </td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>@{user.id}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{user.name}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{user.pollsAnswered}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{user.pollsCreated}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

LeaderboardTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default LeaderboardTable;

import React from 'react';
import Table from 'react-bootstrap/Table';

function LeaderboardTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Num of polls created</th>
          <th>Num of polls answered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>@Mark</td>
          <td>10</td>
          <td>3</td>
        </tr>
        <tr>
          <td>2</td>
          <td>@Sarah</td>
          <td>5</td>
          <td>6</td>
        </tr>
        <tr>
          <td>3</td>
          <td>@birdy</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default LeaderboardTable;

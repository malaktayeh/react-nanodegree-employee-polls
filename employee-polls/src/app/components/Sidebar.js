import React from 'react';

function Sidebar() {
  return (
    <div id="sidebar" className="mx-2">
      <h1 className="py-5">Welcome!</h1>
      <h3 style={{ textAlign: 'left' }}>
        This is my submission for the Udacity{' '}
        <a
          href="https://github.com/udacity/nd0191-c2-React-Redux-project-starter"
          target="_blank"
          rel="noreferrer">
          Employee Polls Project
        </a>
        .
      </h3>
      <div className="py-5">
        <p style={{ textAlign: 'left' }}>Feel free to use the following credentials to test:</p>
        <p style={{ textAlign: 'left' }}>Username:&emsp;sarahedo</p>
        <p style={{ textAlign: 'left' }}>Password:&emsp;password123</p>
      </div>
    </div>
  );
}

export default Sidebar;

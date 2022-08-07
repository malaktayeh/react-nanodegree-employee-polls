/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authedUserSelector } from '../features/authedUserSlice';

function PrivateRoute({ children }) {
  const { authedUser } = useSelector(authedUserSelector);
  console.log(authedUser);
  return Object.keys(authedUser).length > 0 ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

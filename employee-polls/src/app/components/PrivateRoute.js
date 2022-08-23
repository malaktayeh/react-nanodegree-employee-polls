/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { authedUserSelector } from '../features/authedUserSlice';

function PrivateRoute({ children }) {
  const { authedUser } = useSelector(authedUserSelector);
  const location = useLocation();

  return Object.keys(authedUser).length > 0 ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;

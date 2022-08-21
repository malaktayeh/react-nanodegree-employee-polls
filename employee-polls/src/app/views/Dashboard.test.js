import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import Dashboard from './Dashboard';
// import { authedUserSelector } from '../features/authedUserSlice';

test('dashboard receives authed user', () => {
  const { authedAppUser } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </MemoryRouter>
  );
  expect(authedAppUser);
  screen.debug();
});

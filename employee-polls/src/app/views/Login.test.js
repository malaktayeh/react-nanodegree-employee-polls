import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import Login from './Login';

const server = setupServer(
  rest.get('/users', (req, res, ctx) => {
    return res(
      ctx.json({
        sarahedo: {
          id: 'sarahedo',
          password: 'password123',
          name: 'Sarah Edo',
          avatarURL:
            'https://raw.githubusercontent.com/malaktayeh/react-nanodegree-employee-polls/main/employee-polls/src/app/assets/png/user-252494.png',
          answers: {
            '8xf0y6ziyjabvozdd253nd': 'optionOne',
            '6ni6ok3ym7mf1p33lnez': 'optionOne',
            am8ehyc8byjqgar0jgpub9: 'optionTwo',
            loxhs1bqm25b708cmbf3g: 'optionTwo'
          },
          questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          password: 'abc321',
          name: 'Tyler McGinnis',
          avatarURL:
            'https://raw.githubusercontent.com/malaktayeh/react-nanodegree-employee-polls/main/employee-polls/src/app/assets/png/user-252480.png',
          answers: {
            vthrdm985a262al8qx3do: 'optionOne',
            xj352vofupe1dqz9emx13r: 'optionTwo'
          },
          questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
        },
        mtsamis: {
          id: 'mtsamis',
          password: 'xyz123',
          name: 'Mike Tsamis',
          avatarURL:
            'https://raw.githubusercontent.com/malaktayeh/react-nanodegree-employee-polls/main/employee-polls/src/app/assets/png/user-252479.png',
          answers: {
            xj352vofupe1dqz9emx13r: 'optionOne',
            vthrdm985a262al8qx3do: 'optionTwo',
            '6ni6ok3ym7mf1p33lnez': 'optionOne'
          },
          questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
        },
        zoshikanlu: {
          id: 'zoshikanlu',
          password: 'pass246',
          name: 'Zenobia Oshikanlu',
          avatarURL:
            'https://raw.githubusercontent.com/malaktayeh/react-nanodegree-employee-polls/main/employee-polls/src/app/assets/png/user-252489.png',
          answers: {
            xj352vofupe1dqz9emx13r: 'optionOne'
          },
          questions: []
        }
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays greeting', async () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Login url="/login" />
      </Provider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Welcome!'));

  await waitFor(() => screen.getByTestId('appHeader'));

  expect(screen.getByText('Welcome!')).toHaveTextContent('Welcome');
  expect(screen.getByTestId('submit-button')).not.toBeDisabled();
});

test('handles server error', async () => {
  server.use(
    rest.get('/users', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(
    <MemoryRouter>
      <Provider store={store}>
        <Login url="/login" />
      </Provider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => screen.getByText(/Wrong/));

  expect(screen.getByText(/ error /)).toBeInTheDocument();
  expect(screen.getByTestId('submit-button')).not.toBeDisabled();
});

/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import Dashboard from './Dashboard';
import questionsReducer, { setAllQuestions } from '../features/questionsSlice';

// const dispatch = useDispatch();

// jest.mock(setAllQuestions, () => ({
//   ids: ['8xf0y6ziyjabvozdd253nd', '6ni6ok3ym7mf1p33lnez'],
//   entities: {
//     '8xf0y6ziyjabvozdd253nd': {
//       id: '8xf0y6ziyjabvozdd253nd',
//       author: 'sarahedo',
//       timestamp: 1467166872634
//     },
//     '6ni6ok3ym7mf1p33lnez': {
//       id: '6ni6ok3ym7mf1p33lnez',
//       author: 'mtsamis',
//       timestamp: 1468479767190
//     }
//   },
//   status: 'succeeded',
//   error: null
// }));

// // const initialState = {
// //   ids: [],
// //   entities: [],
// //   status: 'idle',
// //   error: null
// // };

// const appReducer = combineReducers({
//   questions: questionsReducer
// });

// const store = configureStore({
//   appReducer
// });

// function PageWrapper({ children }) {
//   return <Provider store={store}>{children}</Provider>;
// }

// describe('Dashboard Page', () => {
//   it('should fetch app polls', async () => {
//     render(<Dashboard />, { wrapper: PageWrapper });
//     const questions = screen.queryAllByText('Poll created by');
//     expect(questions).not.toEqual(0);
//   });
// });
// test('dashboard receives authed user', () => {
//     const { authedAppUser } = render(
//       <MemoryRouter>
//         <Provider store={store}>
//           <Dashboard />
//         </Provider>
//       </MemoryRouter>
//     );
//     expect(authedAppUser);
//     screen.debug();
//   });
// });

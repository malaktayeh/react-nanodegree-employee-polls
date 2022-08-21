import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import Error404 from './Error404';

describe('404 Page', () => {
  it('will match snapshot', () => {
    const view = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <Error404 />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(view).toMatchSnapshot();
  });
});

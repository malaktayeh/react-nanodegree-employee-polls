import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import reducer from '../features/authedUserSlice';
import store from '../store';
import Error404 from './Error404';

describe('404 Page', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      authedUser: {},
      errors: false,
      status: 'idle'
    });
  });
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
    expect(view).toMatchInlineSnapshot(`
      <div
        className="mt-5 mb-2 container"
      >
        <div
          className="mt-5"
        >
          <h2
            className="mt-3"
          >
             4 0 4 !
          </h2>
        </div>
        <button
          className="mt-5 btn btn-light"
          disabled={false}
          type="button"
        >
          <a
            href="/"
            onClick={[Function]}
            style={
              Object {
                "color": "black",
                "textDecoration": "none",
              }
            }
          >
             
            ⬅️ Return
             
          </a>
        </button>
      </div>
    `);
  });
});

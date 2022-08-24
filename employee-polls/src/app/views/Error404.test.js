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
      Array [
        <nav
          className="navbar navbar-expand-md navbar-light bg-light sticky-top fixed-top"
        >
          <div
            className="container"
          >
            <a
              className="active navbar-brand"
              href="/"
              onClick={[Function]}
              style={Object {}}
            >
              Employee Polls
            </a>
            <button
              aria-controls="basic-navbar-nav"
              aria-label="Toggle navigation"
              className="navbar-toggler collapsed"
              onClick={[Function]}
              type="button"
            >
              <span
                className="navbar-toggler-icon"
              />
            </button>
            <div
              aria-expanded={null}
              className="navbar-collapse collapse"
              id="basic-navbar-nav"
            >
              <div
                className="me-auto navbar-nav"
                onKeyDown={[Function]}
              >
                <a
                  className="nav-link"
                  data-rr-ui-event-key="/leaderboard"
                  disabled={false}
                  href="/leaderboard"
                  onClick={[Function]}
                  style={null}
                >
                  Leaderboard
                </a>
                <div
                  className="nav-item dropdown"
                >
                  <a
                    aria-expanded={false}
                    className="dropdown-toggle nav-link"
                    data-rr-ui-event-key={null}
                    href="#"
                    onClick={[Function]}
                    onKeyDown={[Function]}
                    role="button"
                    tabIndex={0}
                  >
                    Polls
                  </a>
                </div>
              </div>
              <img
                alt="User Icon"
                src="undefined"
                style={
                  Object {
                    "height": "50px",
                    "paddingRight": "25px",
                  }
                }
              />
              <div
                className="justify-content-end nav-item dropdown"
              >
                <a
                  aria-expanded={false}
                  className="dropdown-toggle nav-link"
                  href="#"
                  onClick={[Function]}
                  onKeyDown={[Function]}
                  role="button"
                  tabIndex={0}
                />
              </div>
              <div
                className="justify-content-end navbar-nav"
                onKeyDown={[Function]}
              />
            </div>
          </div>
        </nav>,
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
        </div>,
      ]
    `);
  });
});

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

// If app is wrapped in React.StrictMode, Redux DevTools broswer extensionw will show every
// action fired twice, see:
// https://www.reddit.com/r/reactjs/comments/fynb6w/usereducer_cases_called_twice_from_single/

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

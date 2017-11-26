import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import 'todomvc-app-css/index.css';
import Router from './router';
import reducer from './reducers';
import './index.css';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root'),
);

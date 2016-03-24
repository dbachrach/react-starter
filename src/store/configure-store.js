import { compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware                           from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducer/root-reducer.js';

export default ({ history, storageMiddleware, initialState }) => {
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(history)
  ];

  if (storageMiddleware) {
    middlewares.push(storageMiddleware);
  }

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  if (process.env.NODE_ENV === 'development') {
    const DevTools = require('../components/dev-tools.jsx').Tools;
    enhancers.push(DevTools.instrument());
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));
  const enhancedHistory = syncHistoryWithStore(history, store);

  return { store, history: enhancedHistory };
};

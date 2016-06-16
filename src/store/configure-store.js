import { compose, applyMiddleware, createStore }  from 'redux';
import thunkMiddleware                            from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import window                                     from 'global/window';

import rootReducer from '../reducer/root-reducer.js';

export default ({ history, storageMiddleware, initialState, enhanceHistory }) => {
  const middlewares = [
    thunkMiddleware,
    routerMiddleware(history),
    ...(storageMiddleware ? [storageMiddleware] : [])
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ];

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  return {
    store,
    history: enhanceHistory ? history : syncHistoryWithStore(history, store)
  };
};

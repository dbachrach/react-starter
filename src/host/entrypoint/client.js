import 'babel-polyfill';

import React                from 'react';
import { render }           from 'react-dom';
import { useRouterHistory } from 'react-router';
import createHistory        from 'history/lib/createBrowserHistory';

import configureStore from '../store/configure-store.js';

import Host from '../components/host.jsx';
import { initialStateName } from '../util/constants.js';
import { storageLoad, storageMiddleware } from '../storage/storage.js';

const { store, history } = configureStore({
  history: useRouterHistory(createHistory)({ basename: '' }),
  initialState: window[initialStateName],
  storageMiddleware,
  enhanceHistory: true
});

// Load saved state from Storage
storageLoad(store)
  .then(() => {
    const host = (
      <Host store={store}
            history={history} />
    );
    render(host, document.getElementById('root'));
  });

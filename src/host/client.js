import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { useRouterHistory } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import { storageLoad, storageMiddleware } from '../storage/storage.js';

import configureStore from '../store/configure-store.js';

import Host from './host.jsx';
import { initialStateName } from './constants.js';

const initialState = window[initialStateName];

const { store, history } = configureStore({
  history: useRouterHistory(useScroll(createHistory))({
    shouldUpdateScroll: (oldLoc, newLoc) => {

      if (newLoc.hash && newLoc.hash.length > 0) {
        // There's a hash fragment so we want to scroll to that anchor.
        // We return false so that 'scroll-behavior' does nothing.
        // Then we explicitly scroll the target element into view.
        setTimeout(() => {
          const scrollPadding = 40;
          const id = newLoc.hash.substring(1);
          const el = document.getElementById(id);
          window.scrollTo(0, el.offsetTop - scrollPadding);
        }, 0);
        return false;
      }

      // As a catchall, we want to scroll to the top on normal navigation updates.
      return true;
    }
  }),
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

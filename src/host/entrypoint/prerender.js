import 'babel-polyfill';

import React                                         from 'react';
import { renderToString }                            from 'react-dom/server';
import { Provider }                                  from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import Helmet                                        from 'react-helmet';
import { readFile, writeFile }                       from 'fs-promise';
import { resolve, join }                             from 'path';
import serialize                                     from 'serialize-javascript';

import configureStore       from '../store/configure-store.js';
import { initialStateName } from '../util/constants.js';
import routes               from '../routes/routes.jsx';

const routeStore = (store, history, url) => {
  return new Promise((pResolve, pReject) => {
    match({ routes, history, location: url }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.error('Router error:', error);
        pReject(error);
      }
      else if (redirectLocation) {
        pResolve(routeStore(store, history, redirectLocation.pathname));
      }
      else if (!renderProps) {
        console.error('Router no state');
        pReject(new Error('No Router state'));
      }
      else {
        const content = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const renderedContent = renderToString(content);
        const head = Helmet.rewind();
        const storeState = serialize(store.getState());
        pResolve({ renderedContent, head, storeState });
      }
    });
  });
};

const prerenderPage = (url, outPage) => {
  const { store, history } = configureStore({
    history: createMemoryHistory(url),
    enhanceHistory: false
  });

  return routeStore(store, history, url)
    .then(({ renderedContent, head, storeState }) => {

      readFile(resolve(__dirname, '../html', 'index.html'), 'utf-8')
        .then(html => {
          const initialStateScript = `<script>window.${initialStateName} = ${storeState};</script>`;

          const finalHtml = html
            .replace('<!-- PRERENDER:MOUNT -->', renderedContent)
            .replace('<!-- PRERENDER:STATE -->', initialStateScript)
            .replace('<!-- PRERENDER:META -->', `${head.title.toString()}${head.meta.toString()}`);

          return writeFile(outPage, finalHtml);
        });
    });
};

export default (outDir) => {
  return prerenderPage('/', join(outDir, 'index.html'));
  // You can render more pages like this:
  // .then(() => {
  //   return prerenderPage('/privacy', join(outDir, 'privacy.html'));
  // });
};

import React from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';

import routes from '../routes/routes.jsx';

const Host = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}
              render={applyRouterMiddleware(useScroll())}>
        {routes}
      </Router>
    </Provider>
  );
};

Host.propTypes = {
  history: React.PropTypes.object,
  store: React.PropTypes.object
};

export default Host;

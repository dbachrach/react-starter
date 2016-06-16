import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../routes/routes.jsx';

const Host = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
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

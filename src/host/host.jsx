import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../routes/routes.jsx';

const Host = ({ store, history }) => {
  let debugElement;

  // For dev builds, add the Redux DevTools
  if (process.env.NODE_ENV === 'development') {
    const DevTools = require('../components/dev-tools.jsx').default;
    debugElement = <DevTools />;
  }

  return (
    <Provider store={store}>
      <div>
        <Router history={history}>
          {routes}
        </Router>
        {debugElement}
      </div>
    </Provider>
  );
};

Host.propTypes = {
  history: React.PropTypes.object,
  store: React.PropTypes.object
};

export default Host;

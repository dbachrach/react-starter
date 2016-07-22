import React, { PropTypes } from 'react';
import Helmet               from 'react-helmet';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.object
  };

  render() {
    return (
      <div>
        <Helmet title="React Starter" />
        {this.props.children}
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Error extends Component {
  componentDidMount() {}

  render() {
    console.log(this.props);
    if (this.props.app.error) {
      return (
        <main className="container container--no-padding">
          <h1>ERROR</h1>
          <h3>{this.props.app.errorMessage}</h3>
        </main>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

Error.propTypes = {
  app: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default Error;

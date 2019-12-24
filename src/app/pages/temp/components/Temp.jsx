import React, { Component } from 'react';

// Import common components
import { PageTitle, RequirementWrapper } from '../../../common';

class Temp extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <RequirementWrapper>
        <main className="container container--temp">
          <PageTitle title="Temp" isAdmin isBeta />
          <div className="temp-box temp-1" />
          <div className="temp-box temp-2" />
          <div className="temp-box temp-3" />
          <div className="temp-box temp-4" />
          <div className="temp-box temp-5" />
          <div className="temp-box temp-6" />
          <div className="temp-box temp-7" />
          <div className="temp-box temp-8" />
          <div className="temp-box temp-9" />
        </main>
      </RequirementWrapper>
    );
  }
}

Temp.propTypes = {};

Temp.defaultProps = {};

export default Temp;

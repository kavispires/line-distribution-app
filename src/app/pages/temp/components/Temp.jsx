import React, { Component } from 'react';

// Import common components
import { PageTitle, RequirementWrapper, LoadingIcon } from '../../../common';

class Temp extends Component {
  componentDidMount() {
    this.props.db.test.read(null, this);
    // console.log();
  }

  componentDidUpdate() {}

  render() {
    const { db } = this.props;
    return (
      // <RequirementWrapper>
      <main className="container container--temp">
        <PageTitle title="Temp" isAdmin isBeta />

        {db.test.isLoading && <LoadingIcon />}
        {db.test.isSuccessful && (
          <>
            <h2>Success</h2> {JSON.stringify(db.test.typeahead)}
            {console.log(db.test.typeahead)}{' '}
          </>
        )}
        {db.test.isFailure && <h2>Failure: {db.test.errorMessage}</h2>}
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
      // </RequirementWrapper>
    );
  }
}

Temp.propTypes = {};

Temp.defaultProps = {};

export default Temp;

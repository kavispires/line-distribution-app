import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Import components
import AdminAction from './AdminAction';
// Import common components
import { RequirementWrapper } from '../../../common';

const NOOP = () => {};

class AdminActions extends Component {
  componentDidMount() {
    //
  }

  render() {
    const {
      app: { pending },
      handleResyncDB,
    } = this.props;

    return (
      <RequirementWrapper requirements={['admin']}>
        <main className="container container--admin-actions">
          <h1>Administrator Actions</h1>
          <p>
            Here you can manipulate the database by performing preset actions.<br />
            You must type the for letter code to enable the button.
          </p>

          <div className="actions-group">
            <AdminAction
              pending={pending.RESYNC_DATABASE}
              title="Resync Database"
              action={handleResyncDB}
              actionName="Resync Database"
            >
              <Fragment>
                <p className="description">
                  Performs resync of non-critical data in the database.
                </p>
                <ul className="description-list">
                  <li className="description-item">
                    Adds artistsId to artists from Units
                  </li>
                  <li className="description-item">
                    Adds member ids and names to artists
                  </li>
                  <li className="description-item">Recounts colors usage</li>
                  <li className="description-item">
                    Adds positions to members
                  </li>
                  <li className="description-item">
                    Keeps only unique positions for each members
                  </li>
                  <li className="description-item">
                    Resyncs unitIds for artists sorted by debut year
                  </li>
                </ul>
              </Fragment>
            </AdminAction>

            <AdminAction
              pending={false}
              title="Random Users"
              action={NOOP}
              actionName="Generate Random Users"
            >
              <Fragment>
                <p className="description">Not implelemented yet.</p>
              </Fragment>
            </AdminAction>

            <AdminAction
              pending={false}
              title="Another Action"
              action={NOOP}
              actionName="Perform Action"
            >
              <Fragment>
                <p className="description">Not implelemented yet.</p>
              </Fragment>
            </AdminAction>
          </div>
        </main>
      </RequirementWrapper>
    );
  }
}

AdminActions.propTypes = {
  app: PropTypes.object.isRequired,
  handleResyncDB: PropTypes.func.isRequired,
};

AdminActions.defaultProps = {};

export default AdminActions;

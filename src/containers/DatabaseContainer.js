import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Database from '../components/Database';

import {
  handleDisplay,
  toggleIncludeDependencies,
  toggleTab,
} from '../reducers/database';

const mapStateToProps = state => ({
  admin: state.admon,
  auth: state.auth,
  database: state.database,
  db: state.db,
});

const mapDispatchToProps = {
  handleDisplay,
  toggleIncludeDependencies,
  toggleTab,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Database)
);

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ColorSheet from '../components/ColorSheet';

import { initColorSheet, toggleColorSheetTab } from '../reducers/admin';

const mapStateToProps = state => ({
  admin: state.admin,
  app: state.app,
  auth: state.auth,
  database: state.database,
  db: state.db,
});

const mapDispatchToProps = {
  initColorSheet,
  toggleColorSheetTab,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColorSheet)
);

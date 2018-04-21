import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';

import { loadLocalStorage } from '../utils';

import {
  init,
} from '../reducers/app';

import {
  initDB,
} from '../reducers/db';

import {
  handleParser,
} from '../reducers/lyrics';

import {
  handleReset,
} from '../reducers/distribute';

const mapStateToProps = state => ({
  app: state.app,
  db: state.db,
  database: state.database,
});

const mapDispatchToProps = {
  initDB,
  init,
  handleParser,
  handleReset,
  loadLocalStorage,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

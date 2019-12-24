import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

// Import components
import ColorSheet from './ColorSheet';
import ComponentSheet from './ComponentsSheet';
import IconSheet from './IconSheet';
// Import common components
import {
  LoadingWrapper,
  PageTitle,
  RequirementWrapper,
  Tabs,
} from '../../../common';
// Import utility functions
import utils from '../../../../utils';

class UIReference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'Colors',
    };

    this.getActiveTab = this.getActiveTab.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  componentDidMount() {
    if (this.props.location) {
      const qp = queryString.parse(this.props.location.search);
      const tabName = utils.capitalizeWord(qp.tab || '');
      if (tabName && this.state.tab !== tabName) {
        this.setActiveTab(tabName);
      }
    }

    if (this.props.auth.isAuthenticated) {
      this.props.loadColors();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
      this.props.loadColors();
    }
  }

  getActiveTab() {
    let tabContent = null;
    switch (this.state.tab) {
      case 'Components':
        tabContent = <ComponentSheet />;
        break;
      case 'Icons':
        tabContent = <IconSheet />;
        break;
      default:
        tabContent = <ColorSheet colors={this.props.db.colors} />;
    }

    return tabContent;
  }

  setActiveTab(e) {
    const tab = typeof e === 'string' ? e : e.target.id;

    if (tab) {
      this.props.history.push(`/admin/ui-reference?tab=${tab}`);
      this.setState({
        tab,
      });
    }
  }

  render() {
    const { app } = this.props;

    const isPending =
      this.state.tab === 'Colors' &&
      (app.pending.REQUEST_COLORS || app.pending.INITIALIZER);

    return (
      <RequirementWrapper requirements={['admin']}>
        <main className="container container--artists">
          <PageTitle title="UI Reference" isAdmin />
          <Tabs
            tabs={['Colors', 'Components', 'Icons']}
            action={this.setActiveTab}
            active={this.state.tab}
          >
            <LoadingWrapper pending={isPending}>
              {this.getActiveTab()}
            </LoadingWrapper>
          </Tabs>
        </main>
      </RequirementWrapper>
    );
  }
}

UIReference.propTypes = {
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadColors: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

UIReference.defaultProps = {};

export default UIReference;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import ColorSheet from './ColorSheet';
import ComponentSheet from './ComponentsSheet';
import IconSheet from './IconSheet';
// Import common components
import { RequirementWrapper, Tabs, LoadingWrapper } from '../../../common';

class UIReference extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.loadColors();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
      this.props.loadColors();
    }
  }

  render() {
    const {
      admin: { uiReferenceTab },
      app,
      db: { colors },
    } = this.props;

    const TABS = ['Colors', 'Components', 'Icons'];

    let tabContent = null;
    switch (uiReferenceTab) {
      case 'Components':
        tabContent = <ComponentSheet />;
        break;
      case 'Icons':
        tabContent = <IconSheet />;
        break;
      default:
        tabContent = <ColorSheet colors={colors} />;
    }

    return (
      <RequirementWrapper requirements={['admin']}>
        <main className="container container--artists">
          <h1>UI Reference</h1>
          <Tabs
            tabs={TABS}
            action={this.props.switchUIReferenceTab}
            active={uiReferenceTab}
          >
            <LoadingWrapper pending={app.pending.REQUEST_COLORS}>
              {tabContent}
            </LoadingWrapper>
          </Tabs>
        </main>
      </RequirementWrapper>
    );
  }
}

UIReference.propTypes = {
  admin: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  loadColors: PropTypes.func.isRequired,
  switchUIReferenceTab: PropTypes.func.isRequired,
};

UIReference.defaultProps = {};

export default UIReference;

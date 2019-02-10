import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components
import ColorSheet from './ColorSheet';
// Import common components
import { RequirementWrapper, Tabs, LoadingIcon } from '../../../common';

class UIReference extends Component {
  componentDidMount() {
    this.props.loadColors();
  }

  render() {
    const { admin, app } = this.props;
    const { colors, uiReferenceTab } = admin;

    const TABS = ['Colors', 'Components', 'Icons'];

    let tabContent = null;
    switch (uiReferenceTab) {
      case 'Components':
        tabContent = <div>Content comes here {uiReferenceTab}</div>;
        break;
      case 'Icons':
        tabContent = <div>Content comes here {uiReferenceTab}</div>;
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
            {app.isPending ? <LoadingIcon size="medium" /> : tabContent}
          </Tabs>
        </main>
      </RequirementWrapper>
    );
  }
}

UIReference.propTypes = {
  admin: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  loadColors: PropTypes.func.isRequired,
  switchUIReferenceTab: PropTypes.func.isRequired,
};

UIReference.defaultProps = {};

export default UIReference;

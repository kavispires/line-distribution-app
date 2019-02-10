import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components

// Import common components
import { RequirementWrapper, Tabs, LoadingIcon } from '../../../common';
// Import images
import managePlus from '../../../../images/manage-plus.svg';

class UIReference extends Component {
  componentDidMount() {
    // this.props.loadArtists();
    this.props.loadColors();
    // this.props.loadMembers();
  }

  render() {
    const { admin, app } = this.props;
    const { colors, uiReferenceTab } = admin;

    return (
      <RequirementWrapper requirements={['manage']}>
        <main className="container container--artists">
          <h1>Manage</h1>
          <p>
            A complete group is required to save with ONE Artist, ONE Unit, and
            at least TWO members (no solo artists)
          </p>
          <div className="manage-group">
            <section className="manage-section__artist">
              <h3 className="manage-section__button-title">Artist</h3>
              <button className="manage-section__button-add">
                <img
                  className="manage-section__button-add-image"
                  src={managePlus}
                  alt="Add Artist"
                />
              </button>
              <div className="manage-section__button-typeahead">Typeahead</div>
            </section>
            <section className="manage-section__unit">
              <h3 className="manage-section__button-title">Unit</h3>
              <button className="manage-section__button-add">
                <img
                  className="manage-section__button-add-image"
                  src={managePlus}
                  alt="Add Artist"
                />
              </button>
              <div className="manage-section__button-typeahead">Typeahead</div>
            </section>
            <section className="manage-section__members">
              <h3 className="manage-section__button-title">Members</h3>
              <button className="manage-section__button-add">
                <img
                  className="manage-section__button-add-image"
                  src={managePlus}
                  alt="Add Artist"
                />
              </button>
              <div className="manage-section__button-typeahead">Typeahead</div>
            </section>
          </div>
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

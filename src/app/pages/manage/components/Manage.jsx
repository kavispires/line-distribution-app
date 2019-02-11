import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components

// Import common components
import { RequirementWrapper, Typeahead } from '../../../common';
// Import images
import managePlus from '../../../../images/manage-plus.svg';

class UIReference extends Component {
  componentDidMount() {
    this.props.loadArtists();
    this.props.loadColors();
    this.props.loadMembers();
  }

  render() {
    const { admin, app } = this.props;

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
              <Typeahead
                action={e => console.log(e.target.value)}
                name="artists"
                placeholder="Search existing artist..."
                suggestions={[
                  'Alligator',
                  'Bask',
                  'Crocodilian',
                  'Death Roll',
                  'Eggs',
                  'Jaws',
                  'Reptile',
                  'Solitary',
                  'Tail',
                  'Wetlands',
                ]}
              />
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
              <Typeahead
                action={e => console.log(e.target.value)}
                name="members"
                placeholder="Search existing member..."
                suggestions={[
                  'Alligator',
                  'Bask',
                  'Crocodilian',
                  'Death Roll',
                  'Eggs',
                  'Jaws',
                  'Reptile',
                  'Solitary',
                  'Tail',
                  'Wetlands',
                ]}
              />
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
  loadArtists: PropTypes.func.isRequired,
  loadColors: PropTypes.func.isRequired,
  loadMembers: PropTypes.func.isRequired,
};

UIReference.defaultProps = {};

export default UIReference;

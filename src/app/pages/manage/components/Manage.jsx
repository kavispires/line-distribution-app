import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import components

// Import common components
import { RequirementWrapper, Typeahead, Icon } from '../../../common';
// Import images
import managePlus from '../../../../images/manage-plus.svg';
import EditArtist from './EditArtist';
import OpenArtist from './OpenArtist';

class UIReference extends Component {
  constructor() {
    super();
    this.state = {
      artistId: null,
      validArtist: false,
    };
  }

  componentDidMount() {
    this.props.loadArtists();
    this.props.loadColors();
    this.props.loadMembers();
  }

  validateArtist(event) {
    const { value } = event.target;
    const dict = this.props.admin.artistsTypeaheadDict;
    if (dict[value]) {
      this.setState({ artistId: dict[value], validArtist: true });
    } else {
      this.setState({ artistId: null, validArtist: false });
    }
  }

  render() {
    const {
      admin: {
        artistsTypeahead,
        artistsTypeaheadDict,
        editingArtist,
        membersTypeahead,
      },
      app,
      handleEditArtist,
      updateEditArtistForm,
    } = this.props;

    let artistComponent = null;
    switch (editingArtist.state) {
      case 'edit':
        artistComponent = (
          <EditArtist
            artist={editingArtist}
            back={() => console.log('BACK')}
            next={() => console.log('NEXT')}
            updateEditArtistForm={updateEditArtistForm}
          />
        );
        break;
      default:
        artistComponent = (
          <OpenArtist
            handleEditArtist={handleEditArtist}
            artistsTypeahead={artistsTypeahead}
            artistsTypeaheadDict={artistsTypeaheadDict}
          />
        );
    }

    let unitComponent = null;

    let membersComponent = null;

    return (
      <RequirementWrapper requirements={['manage']}>
        <main className="container container--artists">
          <h1>Manage</h1>
          <p>
            A complete group is required to save with ONE Artist, ONE Unit, and
            at least TWO members (no solo artists)
          </p>
          <div className="manage-group">
            {artistComponent}
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
                suggestions={membersTypeahead}
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

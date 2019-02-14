import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import common components
import { Typeahead, Icon } from '../../../common';
// Import images
import managePlus from '../../../../images/manage-plus.svg';

class OpenArtist extends Component {
  constructor() {
    super();
    this.state = {
      artistId: null,
      validArtist: false,
    };
  }

  validateArtist(event) {
    const { value } = event.target;
    const dict = this.props.artistsTypeaheadDict;
    if (dict[value]) {
      this.setState({ artistId: dict[value], validArtist: true });
    } else {
      this.setState({ artistId: null, validArtist: false });
    }
  }

  render() {
    const {
      props: { artistsTypeahead, handleEditArtist },
      state: { artistId, validArtist },
    } = this;

    return (
      <section className="manage-section__artist">
        <h3 className="manage-section__button-title">Artist</h3>
        <button
          className="manage-section__button-add"
          onClick={() => handleEditArtist(artistId)}
        >
          <img
            className="manage-section__button-add-image"
            src={managePlus}
            alt="Add Artist"
          />
        </button>
        <Typeahead
          action={e => this.validateArtist(e)}
          name="artists"
          placeholder="Search existing artist..."
          suggestions={artistsTypeahead}
        />
        {validArtist ? (
          <p className="manage-section__valid">
            <Icon type="check" color="green" inline />
            Selected Artist is valid. Click on the plus button to add it.
          </p>
        ) : null}
      </section>
    );
  }
}

OpenArtist.propTypes = {
  artistsTypeahead: PropTypes.array,
  artistsTypeaheadDict: PropTypes.object,
  handleEditArtist: PropTypes.func.isRequired,
};

OpenArtist.defaultProps = {
  artistsTypeahead: [],
  artistsTypeaheadDict: {},
};

export default OpenArtist;

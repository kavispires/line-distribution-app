import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import utils
import constants from '../../../../utils/constants';
import utils from '../../../../utils';

const picturePlaceholder = `${process.env.PUBLIC_URL}${constants.GROUPS_PICTURE_URL}placeholder.jpg`;

class ArtistPicture extends Component {
  constructor() {
    super();
    this.state = {};
    this.fallback = () => {
      this.setState({ fetchPictureFailed: true });
    };
  }

  render() {
    const { artistName } = this.props;

    const parsedName = utils.removeSpecialCharacters(artistName.toLowerCase());

    const pictureUrl = `${process.env.PUBLIC_URL}${constants.GROUPS_PICTURE_URL}${parsedName}.jpg`;

    // If picture is not found
    if (this.state.fetchPictureFailed) {
      console.log(`Missing Artist Picture: ${parsedName}`); // eslint-disable-line
      return (
        <img
          className="artist-page-profile"
          src={picturePlaceholder}
          alt="No Artist"
        />
      );
    }

    return (
      <img
        className="artist-page-profile"
        src={pictureUrl}
        onError={this.fallback}
        alt="Artist Profile"
      />
    );
  }
}

ArtistPicture.propTypes = {
  artistName: PropTypes.string.isRequired,
};

ArtistPicture.defaultProps = {};

export default ArtistPicture;

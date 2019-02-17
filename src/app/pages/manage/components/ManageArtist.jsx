import React from 'react';
import PropTypes from 'prop-types';
import { Text, Checkbox, Select, Option, Scope } from 'informed';

// Import common components
import { Typeahead, Icon } from '../../../common';
// Import images
import manageLock from '../../../../images/manage-lock.svg';
import managePlus from '../../../../images/manage-plus.svg';
// Import constants
import { GENRES } from '../../../../utils/constants';

const ManageArtist = ({
  formState,
  props,
  validateTypeahead,
  isValid,
  artistId,
  defaultValues,
  next,
  back,
}) => {
  const {
    admin: { artistsTypeahead, panels },
    handleEditArtist,
  } = props;

  const isRequired = value => (!value ? 'This field is required' : undefined);

  // Locked Panel
  if (panels.artist === 'locked') {
    return (
      <section className="manage-section__artist">
        <h3 className="manage-section__button-title">Artist</h3>
        <div className="manage-section__button-locked">
          <img
            className="manage-section__button-lock-image"
            src={manageLock}
            alt="Lock Artist"
          />
        </div>
      </section>
    );
  }

  // Open Panel
  if (panels.artist === 'open') {
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
          action={e => validateTypeahead(e)}
          name="artists"
          placeholder="Search existing artist..."
          suggestions={artistsTypeahead}
        />
        {isValid ? (
          <p className="manage-section__valid">
            <Icon type="check" color="green" inline />
            Selected Artist is valid. Click on the plus button to add it.
          </p>
        ) : null}
      </section>
    );
  }

  // Edit Panel
  return (
    <section className="manage-section__artist manage-section__artist-edit">
      <Scope scope="artist">
        <h3>Edit Artist</h3>
        <label className="manage-form__label">
          Name*<Text
            className="manage-form__input"
            field="name"
            validate={isRequired}
            required
            initialValue={defaultValues.name}
          />
        </label>
        <label className="manage-form__label">
          Other Names<Text
            className="manage-form__input"
            field="otherNames"
            initialValue={defaultValues.otherNames}
          />
        </label>
        <label className="manage-form__label">
          Genre*
          <Select
            className="manage-form__input"
            field="genre"
            validate={isRequired}
            initialValue={defaultValues.genre}
          >
            <Option value="" disabled>
              Select One...
            </Option>
            {Object.entries(GENRES).map(genre => (
              <Option key={genre[0]} value={genre[0]}>
                {genre[1]}
              </Option>
            ))}
          </Select>
        </label>

        <label className="manage-form__label">
          Private{' '}
          <Checkbox field="private" initialValue={defaultValues.private} />
        </label>
        <div className="manage-form__navigation">
          <button className="btn" type="reset" onClick={back}>
            Back
          </button>
          <button className="btn" onClick={() => next(formState)}>
            Next
          </button>
        </div>
      </Scope>
    </section>
  );
};

ManageArtist.propTypes = {
  // artist: PropTypes.object,
  // back: PropTypes.func.isRequired,
  // next: PropTypes.func.isRequired,
  // updateEditArtistForm: PropTypes.func.isRequired,
};

ManageArtist.defaultProps = {
  // artist: {
  //   name: null,
  //   otherNames: null,
  //   genre: null,
  //   private: null,
  // },
};

export default ManageArtist;

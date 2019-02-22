import React from 'react';
import PropTypes from 'prop-types';
import { Text, Checkbox, Select, Option, Scope } from 'informed';

// Import common components
import { Typeahead, Icon } from '../../../common';
// Import images
import manageLock from '../../../../images/manage-lock.svg';
import managePlus from '../../../../images/manage-plus.svg';
// Import constants
import constants from '../../../../utils/constants';

const ManageArtist = ({
  formState,
  props,
  validateTypeahead,
  isValid,
  artistId,
  defaultValues,
  next,
}) => {
  const {
    admin: { artistsTypeahead, panels },
    handleEditArtist,
  } = props;

  // Locked Panel
  if (panels.artist === 'locked') {
    return (
      <section className="manage-form__artist">
        <h3 className="manage-form__button-title">Artist</h3>
        <div className="manage-form__button-locked">
          <img
            className="manage-form__button-lock-image"
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
      <section className="manage-form__artist">
        <h3 className="manage-form__button-title">Artist</h3>
        <button
          className="manage-form__button-add"
          onClick={() => handleEditArtist(artistId)}
        >
          <img
            className="manage-form__button-add-image"
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
          <p className="manage-form__valid">
            <Icon type="check" color="green" inline />
            Selected Artist is valid. Click on the plus button to add it.
          </p>
        ) : null}
      </section>
    );
  }

  // Validation classes
  const isRequired = value => (!value ? 'This field is required' : undefined);

  const isValidName =
    formState.errors.artist && formState.errors.artist.name
      ? 'manage-form__input--invalid'
      : '';

  // Edit Panel
  return (
    <section className="manage-form__artist manage-form__artist-edit">
      <div className="manage-form__form-group">
        <Scope scope="artist">
          <h3>Artist</h3>
          <label className="manage-form__label">
            Name*<Text
              className={`manage-form__input ${isValidName}`}
              field="name"
              validateOnBlur
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
              required
            >
              <Option value="" disabled>
                Select One...
              </Option>
              {Object.entries(constants.GENRES).map(genre => (
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
        </Scope>
      </div>
      <div className="manage-form__navigation">
        <button className="btn" onClick={() => next(formState)}>
          Unlock Unit
        </button>
      </div>
    </section>
  );
};

ManageArtist.propTypes = {
  admin: PropTypes.object,
  artistId: PropTypes.string,
  defaultValues: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  handleEditArtist: PropTypes.func,
  isValid: PropTypes.bool.isRequired,
  next: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired,
  validateTypeahead: PropTypes.func.isRequired,
};

ManageArtist.defaultProps = {
  admin: {},
  artistId: null,
  handleEditArtist: () => {},
};

export default ManageArtist;

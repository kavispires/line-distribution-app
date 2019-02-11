import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Text,
  TextArea,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  Option,
  Scope,
} from 'informed';

// Import constants
import { GENRES } from '../../../../utils/constants';

const EditArtist = ({ artist, updateEditArtistForm, back, next }) => {
  const defaultValues =
    artist && artist.id
      ? {
          name: artist.name,
          otherNames: artist.otherNames,
          genre: artist.genre,
          private: artist.private,
        }
      : undefined;

  const isRequired = value => (!value ? 'This field is required' : undefined);
  const validadeNext = formState => {
    console.log(formState);
  };
  return (
    <section className="manage-section__artist-edit">
      <h3>Edit Artist</h3>
      <Form
        onChange={formState => updateEditArtistForm(formState)}
        className="manage-form"
        initialValues={defaultValues}
      >
        <label className="manage-form__label">
          Name*<Text
            className="manage-form__input"
            field="name"
            validate={isRequired}
            required
          />
        </label>
        <label className="manage-form__label">
          Other Names<Text className="manage-form__input" field="otherNames" />
        </label>
        <label className="manage-form__label">
          Genre*
          <Select
            className="manage-form__input"
            field="genre"
            validate={isRequired}
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
          Private <Checkbox field="private" />
        </label>
        <div className="manage-form__navigation">
          <button className="btn" onClick={back}>
            Back
          </button>
          <button className="btn" onClick={validadeNext}>
            Unlock Unit
          </button>
        </div>
      </Form>
    </section>
  );
};

EditArtist.propTypes = {
  artist: PropTypes.object,
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  updateEditArtistForm: PropTypes.func.isRequired,
};

EditArtist.defaultProps = {
  artist: {
    name: null,
    otherNames: null,
    genre: null,
    private: null,
  },
};

export default EditArtist;

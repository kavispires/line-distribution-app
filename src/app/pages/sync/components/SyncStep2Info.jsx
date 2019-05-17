import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Form, Option, Select, Text } from 'informed';

// Import common components
import { Typeahead } from '../../../common';
// Import contants
import constants from '../../../../utils/constants';

class SyncStep2Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalArtist: '',
    };
  }

  addToOriginalArtistForm(event) {
    const { value } = event.target;
    this.setState({
      originalArtist: value,
    });
  }

  render() {
    return (
      <Form autoComplete="off" className="sync__step sync__step--2">
        {({ formState }) => (
          <Fragment>
            <div className="sync__step--2__container">
              <div className="sync__step--2__group">
                <label className="sync__form__label">
                  Song Title*<Text
                    className="sync__form__input-text"
                    field="title"
                    required
                  />
                </label>

                <label className="sync__form__label">
                  Original Artist*{' '}
                  <Typeahead
                    action={e => this.addToOriginalArtistForm(e)}
                    name="artists"
                    placeholder="Search existing artist..."
                    suggestions={this.props.artistsTypeahead}
                    className="sync__form__typeahead"
                  />
                </label>

                <label className="sync__form__label">
                  Album<Text className="sync__form__input-text" field="album" />
                </label>
              </div>

              <div className="sync__step--2__group">
                <label className="sync__form__label">
                  Original Group Gender*
                  <Select
                    className="sync__form__input-text"
                    field="gender"
                    required
                  >
                    <Option value="" disabled>
                      Select One...
                    </Option>
                    {Object.entries(constants.ARTISTS_GENDERS).map(genre => (
                      <Option key={genre[0]} value={genre[0]}>
                        {genre[1]}
                      </Option>
                    ))}
                  </Select>
                </label>

                <label className="sync__form__label">
                  Original Group Size*<Text
                    className="sync__form__input-number"
                    field="groupSize"
                    required
                    type="number"
                    min="1"
                    max="50"
                    step="1"
                  />
                </label>

                <label className="sync__form__label">
                  Single (Title song){' '}
                  <Checkbox className="sync__form__checkbox" field="single" />
                </label>

                <label className="sync__form__label">
                  Private{' '}
                  <Checkbox className="sync__form__checkbox" field="private" />
                </label>
              </div>

              <button
                className="btn btn-block"
                onClick={() =>
                  this.props.handleFormInfo(
                    formState,
                    this.state.originalArtist
                  )
                }
              >
                Unlock Next Step
              </button>
            </div>
          </Fragment>
        )}
      </Form>
    );
  }
}

SyncStep2Info.propTypes = {
  artistsTypeahead: PropTypes.array.isRequired,
  handleFormInfo: PropTypes.func.isRequired,
};

export default SyncStep2Info;

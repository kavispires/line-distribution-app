import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Form, Text } from 'informed';

// Import common components
import { Typeahead } from '../../../common';

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
            <label className="sync__form__label">
              Song Title*<Text
                className="sync__form__input"
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
              />
            </label>

            <label className="sync__form__label">
              Album<Text className="sync__form__input" field="album" />
            </label>
            <label className="sync__form__label">
              Single (Title song){' '}
              <Checkbox className="sync__form__input" field="single" />
            </label>
            <label className="sync__form__label">
              Original Group Size*<Text
                className="sync__form__input"
                field="groupSize"
                required
                type="number"
                min="1"
                max="50"
                step="1"
              />
            </label>
            <label className="sync__form__label">
              Private <Checkbox className="sync__form__input" field="private" />
            </label>

            <button
              className="btn btn-block"
              onClick={() =>
                this.props.handleFormInfo(formState, this.state.originalArtist)
              }
            >
              Unlock Next Step
            </button>
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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Form components
import { Checkbox, Form, Option, Select, Text } from 'informed';

// Import utils
import enums from '../../../../utils/readable-enums';

const IdolsEdit = ({ isExpanded, editingMember, openPanel, updateMember }) => (
  <aside className={`side-panel ${isExpanded ? 'side-panel--active' : ''}`}>
    <h3>Edit Member</h3>

    {isExpanded && editingMember.id ? (
      <Form autoComplete="off" onSubmit={updateMember}>
        {({ formState, formApi }) => (
          <Fragment>
            <div
              className={`side-panel-color-bar background-color-${editingMember.color}`}
            />
            <label className="input-label required">Name</label>
            <Text
              className="input-text"
              field="name"
              initialValue={editingMember.name}
            />
            <label className="input-label">
              Initials{' '}
              <span className="small">
                (created automatically if left blank)
              </span>
            </label>
            <Text
              className="input-text"
              field="initials"
              initialValue={editingMember.initials}
              maxLength="2"
            />
            <label className="input-label required">Birthdate</label>
            <Text
              className="input-text"
              field="birthdate"
              type="date"
              initialValue={editingMember.birthdate}
            />
            <label className="input-label required">Gender</label>
            <Select
              className="input-select"
              field="gender"
              initialValue={editingMember.gender}
            >
              {Object.entries(enums.GENDERS).map(gender => (
                <Option key={gender[0]} value={gender[0]}>
                  {gender[1]}
                </Option>
              ))}
            </Select>
            <label className="input-label required">Nationality</label>
            <Select
              className="input-select"
              field="nationality"
              initialValue={editingMember.nationality}
            >
              {Object.entries(enums.NATIONALITIES).map(([value, text]) => (
                <Option key={value} value={value}>
                  {text}
                </Option>
              ))}
            </Select>
            <label className="input-label required">Primary Genre</label>
            <Select
              className="input-select"
              field="primaryGenre"
              initialValue={editingMember.primaryGenre}
            >
              {Object.entries(enums.GENRES).map(([value, text]) => (
                <Option key={value} value={value}>
                  {text}
                </Option>
              ))}
            </Select>
            {/* Add Colors */}
            {/* Add Tags */}
            <hr className="side-panel-hr" />
            <label className="input-label input-label--inline">Private</label>
            <Checkbox field="private" initialValue={editingMember.private} />
            <br />
            <label className="input-label input-label--inline">
              Hide from Listing
            </label>
            <Checkbox field="hide" initialValue={editingMember.hide} />
            <hr className="side-panel-hr" />

            <b>Units and Positions</b>
            <p>
              Units and Positions can&apos;t be edited here. You must select the
              unit and edit there as positions and unit ids are compilled
              automatically.
            </p>
            <p className="warn">
              Clicling on a Artist link below will take you to the Artist page
              and you lose any unsaved editing to this Idol.
            </p>
            <ul className="side-panel-list">
              {editingMember.referenceArtists &&
                editingMember.referenceArtists.map(art => (
                  <li key={art}>{art}</li>
                ))}
            </ul>
            <button
              className="btn side-panel-button"
              disabled={Object.keys(formState.touched).length === 0}
              onClick={() => formApi.submitForm()}
            >
              Update Member
            </button>
            <button
              className="btn side-panel-button"
              onClick={() => {
                formApi.reset();
                openPanel(null);
              }}
            >
              Cancel
            </button>
          </Fragment>
        )}
      </Form>
    ) : (
      <Fragment>
        <p>
          Select a member you want to edit by clicing on the Edit icon on the
          top right corner of their picture
        </p>
        <button
          className="btn side-panel-button"
          onClick={() => openPanel(null)}
        >
          Cancel
        </button>
      </Fragment>
    )}
  </aside>
);

IdolsEdit.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  editingMember: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.number,
    initials: PropTypes.string,
    birthdate: PropTypes.string,
    gender: PropTypes.string,
    nationality: PropTypes.string,
    primaryGenre: PropTypes.string,
    private: PropTypes.bool,
    hide: PropTypes.bool,
    referenceArtists: PropTypes.array,
  }),
  updateMember: PropTypes.func.isRequired,
  openPanel: PropTypes.func.isRequired,
};

IdolsEdit.defaultProps = {
  editingMember: {
    id: null,
    name: '',
    color: 0,
    initials: '',
    birthdate: '2019-01-01',
    gender: 'UNKOWN',
    nationality: 'UNKNOWN',
    primaryGenre: 'OTHER',
    private: false,
    hide: false,
    referenceArtists: ['ArtistId'],
  },
};

export default IdolsEdit;

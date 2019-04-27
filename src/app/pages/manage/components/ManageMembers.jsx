import React from 'react';
import PropTypes from 'prop-types';
import { Text, Checkbox, Select, Option, Scope } from 'informed';

// Import common components
import { Typeahead, Icon } from '../../../common';
// Import images
import manageLock from '../../../../images/manage-lock.svg';
import managePlus from '../../../../images/manage-plus.svg';
// Import utils
import utils from '../../../../utils';
// Import constants
import constants from '../../../../utils/constants';

const ManageMembers = ({
  formState,
  props,
  colorsInUse,
  defaultValues,
  handleEditMember,
  isValid,
  memberId,
  validateTypeahead,
}) => {
  const {
    admin: { panels },
    db: { membersTypeahead },
    removeMember,
    updateMemberColor,
    // updateMemberPositions,
  } = props;

  // Locked Panel
  if (panels.members === 'locked') {
    return (
      <section className="manage-form__members">
        <h3 className="manage-form__button-title">Members</h3>
        <div className="manage-form__button-locked">
          <img
            className="manage-form__button-lock-image"
            src={manageLock}
            alt="Locked Unit"
          />
        </div>
      </section>
    );
  }

  // Edit Panel
  return (
    <section className="manage-form__members manage-form__members-edit">
      <div className="manage-form__form-group-member">
        {defaultValues.map((member, index) => {
          const key = index;

          // Validation classes
          const isRequired = value =>
            !value ? 'This field is required' : undefined;
          const isName = value => {
            // isRequired
            if (!value) return 'This field is required';
            // Cannot have spaces
            if (value.match(/(\.|:| |,|;|\?)/g))
              return 'Name cannot contain spaces, commas, ., :, ;, or ?';
            // Max 12 characters
            if (value.length > 12)
              return 'Name cannot be longer than 12 characters';
            return undefined;
          };

          const isValidName =
            formState.errors.members &&
            formState.errors.members[index] &&
            formState.errors.members[index].name
              ? 'manage-form__input--invalid'
              : '';

          if (member) {
            return (
              <Scope scope={`members[${index}]`} key={`member-${key}`}>
                <div className="manage-form__form-member manage-member">
                  <span
                    className={`manage-member__title background-color-${utils.getColorNumber(
                      member.colorId
                    )}`}
                  >
                    Member {index + 1}{' '}
                    <button
                      className="btn-remove-user"
                      onClick={() => removeMember(index)}
                    >
                      ×
                    </button>
                  </span>
                  <div className="manage-form__inline">
                    <label
                      className="manage-form__label"
                      title="Member names must be less than 12 characters without spaces, commas, colors, semicolons, questions marks or periods"
                    >
                      Name*<Text
                        className={`manage-form__input ${isValidName}`}
                        field="name"
                        validateOnBlur
                        validate={isName}
                        required
                        initialValue={member.name}
                      />
                    </label>
                    <label className="manage-form__label manage-form__label--30">
                      Initials<Text
                        className="manage-form__input"
                        field="initials"
                        initialValue={member.initials}
                        maxLength="2"
                      />
                    </label>
                  </div>
                  <div className="manage-form__inline">
                    <label className="manage-form__label manage-form__label--70">
                      Birthdate*<Text
                        className="manage-form__input"
                        field="birthdate"
                        validate={isRequired}
                        required
                        initialValue={member.birthdate}
                        type="date"
                      />
                    </label>
                    <label className="manage-form__label manage-form__label--30">
                      Color*
                      <Select
                        className={`manage-form__input background-color-${utils.getColorNumber(
                          member.colorId
                        )}`}
                        field="colorId"
                        validate={isRequired}
                        initialValue={member.colorId}
                        required
                        onChange={e => updateMemberColor(e.target.value, index)}
                      >
                        <Option value="" disabled>
                          Select One...
                        </Option>
                        {Object.entries(constants.COLORS).map(color => (
                          <Option
                            key={`${key}-${color[0]}`}
                            value={color[0]}
                            disabled={colorsInUse[color[0]]}
                          >
                            {color[1]}
                          </Option>
                        ))}
                      </Select>
                    </label>
                  </div>
                  <div className="manage-form__inline">
                    <label className="manage-form__label manage-form__label--50">
                      Gender*
                      <Select
                        className="manage-form__input"
                        field="gender"
                        validate={isRequired}
                        initialValue={member.gender}
                        required
                      >
                        <Option value="" disabled>
                          Select One...
                        </Option>
                        {Object.entries(constants.GENDERS).map(gender => (
                          <Option key={`${key}-${gender[0]}`} value={gender[0]}>
                            {gender[1]}
                          </Option>
                        ))}
                      </Select>
                    </label>
                    <label className="manage-form__label manage-form__label--50">
                      Nationality*
                      <Select
                        className="manage-form__input"
                        field="nationality"
                        validate={isRequired}
                        initialValue={member.nationality}
                        required
                      >
                        <Option value="" disabled>
                          Select One...
                        </Option>
                        {Object.entries(constants.NATIONALITIES).map(
                          nationality => (
                            <Option
                              key={`${key}-${nationality[0]}`}
                              value={nationality[0]}
                            >
                              {nationality[1]}
                            </Option>
                          )
                        )}
                      </Select>
                    </label>
                  </div>
                  <label className="manage-form__label">Positions* </label>
                  <div className="position-buttons">
                    {constants.POSITIONS_LIST.map(position => (
                      <Checkbox
                        key={`${key}-${position}`}
                        field={position}
                        initialValue={member[utils.spiralCase(position)]}
                        className={`position-checkbox position-checkbox-${utils.spiralCase(
                          position
                        )}`}
                        title={position}
                        // onChange={e =>
                        //   updateMemberPositions(
                        //     e.target.checked,
                        //     position,
                        //     index
                        //   )
                        // }
                      />
                    ))}
                  </div>
                  <label className="manage-form__label">
                    Private{' '}
                    <Checkbox field="private" initialValue={member.private} />
                  </label>
                </div>
              </Scope>
            );
          }
          return null;
        })}
        <div className="manage-form__form-member manage-member-new">
          <h3 className="manage-form__button-title">Add new member</h3>
          <button
            className="manage-form__button-add"
            onClick={() => handleEditMember(memberId, formState)}
          >
            <img
              className="manage-form__button-add-image"
              src={managePlus}
              alt="Add Unit"
            />
          </button>
          <Typeahead
            action={e => validateTypeahead(e)}
            name="members"
            placeholder="Search existing members..."
            suggestions={membersTypeahead}
          />
          {isValid && (
            <p className="manage-form__valid">
              <Icon type="check" color="green" inline />
              Selected Member is valid. Click on the plus button to add it.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

ManageMembers.propTypes = {
  admin: PropTypes.object,
  colorsInUse: PropTypes.object,
  db: PropTypes.object,
  defaultValues: PropTypes.array.isRequired,
  formState: PropTypes.object.isRequired,
  handleEditMember: PropTypes.func,
  isValid: PropTypes.bool.isRequired,
  memberId: PropTypes.string,
  props: PropTypes.object.isRequired,
  removeMember: PropTypes.func,
  updateMemberColor: PropTypes.func,
  // updateMemberPositions: PropTypes.func,
  validateTypeahead: PropTypes.func.isRequired,
};

ManageMembers.defaultProps = {
  admin: {},
  db: {},
  colorsInUse: {},
  handleEditMember: () => {},
  memberId: null,
  removeMember: () => {},
  updateMemberColor: () => {},
  // updateMemberPositions: () => {},
};

export default ManageMembers;

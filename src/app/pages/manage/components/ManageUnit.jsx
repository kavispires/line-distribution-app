import React from 'react';
import PropTypes from 'prop-types';
import { Text, Checkbox, Scope } from 'informed';

// Import common components
import { Typeahead, Icon } from '../../../common';
// Import images
import manageLock from '../../../../images/manage-lock.svg';
import managePlus from '../../../../images/manage-plus.svg';

const ManageUnit = ({
  formState,
  props,
  validateTypeahead,
  isValid,
  unitId,
  defaultValues,
  next,
}) => {
  const {
    admin: { unitsTypeahead, panels },
    handleEditUnit,
  } = props;

  // Locked Panel
  if (panels.unit === 'locked') {
    return (
      <section className="manage-form__unit">
        <h3 className="manage-form__button-title">Unit</h3>
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

  // Open Panel
  if (panels.unit === 'open') {
    return (
      <section className="manage-form__unit">
        <h3 className="manage-form__button-title">Unit</h3>
        <button
          className="manage-form__button-add"
          onClick={() => handleEditUnit(unitId)}
        >
          <img
            className="manage-form__button-add-image"
            src={managePlus}
            alt="Add Unit"
          />
        </button>
        {unitsTypeahead.length ? (
          <Typeahead
            action={e => validateTypeahead(e)}
            name="units"
            placeholder="Search existing unit..."
            suggestions={unitsTypeahead}
          />
        ) : null}
        {isValid ? (
          <p className="manage-form__valid">
            <Icon type="check" color="green" inline />
            Selected Unit is valid. Click on the plus button to add it.
          </p>
        ) : null}
      </section>
    );
  }

  // Validation classes
  const isRequired = value => (!value ? 'This field is required' : undefined);
  const isYear = value =>
    value < 1900 || value > new Date().getFullYear()
      ? 'Value must be a four digit year'
      : undefined;

  const isValidName =
    formState.errors.unit && formState.errors.unit.name
      ? 'manage-form__input--invalid'
      : '';

  const isValidDebutYear =
    formState.errors.unit && formState.errors.unit.debutYear
      ? 'manage-form__input--invalid'
      : '';

  // Edit Panel
  return (
    <section className="manage-form__unit manage-form__unit-edit">
      <div className="manage-form__form-group">
        <Scope scope="unit">
          <h3>Unit</h3>
          <label className="manage-form__label">
            Unit Name* (e.g. OT4)<Text
              className={`manage-form__input ${isValidName}`}
              field="name"
              validateOnBlur
              validate={isRequired}
              required
              initialValue={defaultValues.name}
            />
          </label>
          <label className="manage-form__label">
            Debut Year*<Text
              className={`manage-form__input ${isValidDebutYear}`}
              field="debutYear"
              validateOnBlur
              validate={isYear}
              required
              initialValue={defaultValues.debutYear}
              type="number"
            />
          </label>
          <label className="manage-form__label">
            Official{' '}
            <Checkbox field="official" initialValue={defaultValues.official} />
          </label>
          <label className="manage-form__label">
            Sub-unit{' '}
            <Checkbox field="subUnit" initialValue={defaultValues.subUnit} />
          </label>
          <label className="manage-form__label">
            Private{' '}
            <Checkbox field="private" initialValue={defaultValues.private} />
          </label>
        </Scope>
      </div>
      <div className="manage-form__navigation">
        <button className="btn" onClick={() => next(formState)}>
          Unlock Members
        </button>
      </div>
    </section>
  );
};

ManageUnit.propTypes = {
  admin: PropTypes.object,
  defaultValues: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  handleEditUnit: PropTypes.func,
  isValid: PropTypes.bool.isRequired,
  next: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired,
  validateTypeahead: PropTypes.func.isRequired,
  unitId: PropTypes.string,
};

ManageUnit.defaultProps = {
  admin: {},
  handleEditUnit: () => {},
  unitId: null,
};

export default ManageUnit;

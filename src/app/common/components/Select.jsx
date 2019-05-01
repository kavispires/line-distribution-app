import React from 'react';
import PropTypes from 'prop-types';

let selectKey = 0;

/**
 * Select
 * @param {action} action onChange action
 * @param {string} label label for the select
 * @param {array|object} options arrays or objects of objects
 * @param {string} optionValue key on values to be used as an option value
 * @param {string} optionName key on values to be used as an option name
 * @param {string} optionPrefix string to come before optionName
 * @param {string} placeholder string for the first placeholder option name
 * @param {bool} disablePlaceholder makes label unselectable
 * @param {string} type 'normal' or 'slim'
 */
const Select = ({
  action,
  options,
  optionValue,
  optionName,
  optionPrefix,
  label,
  placeholder,
  disablePlaceholder,
  type,
}) => {
  // Transform options object into array
  if (!Array.isArray(options)) {
    options = Object.values(options);
  }

  const classNameModifier = type === 'slim' ? '--slim' : '';

  return (
    <div className="ld-select-group">
      {label ? <label className="ld-select__label">{label}</label> : null}
      <div className={`ld-select${classNameModifier}`}>
        <select onChange={action}>
          {placeholder && (
            <option value="" disabled={disablePlaceholder}>
              {placeholder}
            </option>
          )}
          {options.map(option => {
            const key = `select-${selectKey++}`;
            return (
              <option key={key} value={option[optionValue]}>
                {optionPrefix}
                {option[optionName]}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

Select.propTypes = {
  action: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  optionValue: PropTypes.string,
  optionName: PropTypes.string,
  optionPrefix: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disablePlaceholder: PropTypes.bool,
  type: PropTypes.oneOf(['slim', undefined]),
};

Select.defaultProps = {
  options: [],
  optionValue: '',
  optionName: '',
  optionPrefix: '',
  label: '',
  placeholder: '',
  disablePlaceholder: false,
  type: '',
};

export default Select;

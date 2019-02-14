import React from 'react';
import PropTypes from 'prop-types';

const Typeahead = ({ action, className, name, placeholder, suggestions }) => (
  <div className={`typeahead ${className}`}>
    <input
      className="typeahead-input"
      list={`list-${name}`}
      onChange={action}
      placeholder={placeholder}
    />
    <datalist className="typeahead-datalist" id={`list-${name}`}>
      {suggestions.map(suggestion => (
        <option
          key={suggestion}
          className="typeahead-option"
          value={suggestion}
        />
      ))}
    </datalist>
  </div>
);

Typeahead.propTypes = {
  action: PropTypes.func.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  suggestions: PropTypes.array,
};

Typeahead.defaultProps = {
  className: '',
  placeholder: 'Search...',
  suggestions: [],
};

export default Typeahead;

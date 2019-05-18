import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '..';

const SortingButton = ({ action, active }) => {
  return (
    <button className="sorting-button" onClick={action}>
      <Icon type="sorting-arrows" color={active ? 'black' : 'gray'} />
    </button>
  );
};

SortingButton.propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default SortingButton;

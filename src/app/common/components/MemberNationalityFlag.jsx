import React from 'react';
import PropTypes from 'prop-types';

// Import utilities
import constants from '../../../utils/constants';
import { bem } from '../../../utils';

const MemberNationalityFlag = ({ nationality, className }) => {
  const flag = constants.FLAGS_LIST_ICON[nationality] || 'unknown';
  const baseClasses = bem('member-nationality-flag', [flag]);

  return <span className={`${baseClasses} ${className}`} title={nationality} />;
};

MemberNationalityFlag.propTypes = {
  nationality: PropTypes.string,
  className: PropTypes.string,
};

MemberNationalityFlag.defaultProps = {
  nationality: 'UNKNOWN',
  className: '',
};

export default MemberNationalityFlag;

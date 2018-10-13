import React from 'react';
import PropTypes from 'prop-types';
import { FLAGS_LIST, NATIONALITY_FLAG_URL } from '../constants';

const MemberNationalty = ({ nationality }) => {
  const flag = FLAGS_LIST[nationality];

  let flagUrl = `${process.env.PUBLIC_URL}${NATIONALITY_FLAG_URL}unknown.jpg`;

  if (flag) {
    flagUrl = `${process.env.PUBLIC_URL}${NATIONALITY_FLAG_URL}${flag}.jpg`;
  }

  return (
    <img className="member-nationality-flag" src={flagUrl} alt={nationality} />
  );
};

MemberNationalty.propTypes = {
  nationality: PropTypes.string,
};

MemberNationalty.defaultProps = {
  nationality: 'unknown',
};

export default MemberNationalty;

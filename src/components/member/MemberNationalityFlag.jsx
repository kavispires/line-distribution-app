import React from 'react';
import PropTypes from 'prop-types';
import { FLAGS_LIST, NATIONALITY_FLAG_URL } from '../../constants';

const MemberNationaltyFlag = ({ nationality }) => {
  const flag = FLAGS_LIST[nationality];

  let flagUrl = `${process.env.PUBLIC_URL}${NATIONALITY_FLAG_URL}unknown.jpg`;

  if (flag) {
    flagUrl = `${process.env.PUBLIC_URL}${NATIONALITY_FLAG_URL}${flag}.jpg`;
  }

  return <img className="card__flag" src={flagUrl} alt={nationality} />;
};

MemberNationaltyFlag.propTypes = {
  nationality: PropTypes.string,
};

MemberNationaltyFlag.defaultProps = {
  nationality: 'unknown',
};

export default MemberNationaltyFlag;

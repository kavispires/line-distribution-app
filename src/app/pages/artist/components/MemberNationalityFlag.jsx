import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../../../utils/constants';

const MemberNationaltyFlag = ({ nationality }) => {
  const flag = constants.FLAGS_LIST[nationality];

  let flagUrl = `${process.env.PUBLIC_URL}${
    constants.NATIONALITY_FLAG_URL
  }unknown.jpg`;

  if (flag) {
    flagUrl = `${process.env.PUBLIC_URL}${
      constants.NATIONALITY_FLAG_URL
    }${flag}.jpg`;
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

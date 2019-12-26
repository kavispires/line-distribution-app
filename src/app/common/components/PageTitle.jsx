import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title, isBeta, isAdmin, isWarning }) => {
  useEffect(() => {
    document.title = `Line Distributon | ${title}`;
  });

  return (
    <h1 className={`page-title${isWarning ? ' page-title--warning' : ''}`}>
      {title}
      {isAdmin && (
        <span className="page-title__flag page-title__flag--admin">Admin</span>
      )}
      {isBeta && (
        <span className="page-title__flag page-title__flag--beta">Beta</span>
      )}
    </h1>
  );
};

PageTitle.defaultProps = {
  isAdmin: false,
  isBeta: false,
  isWarning: false,
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isBeta: PropTypes.bool,
  isWarning: PropTypes.bool,
};

export default PageTitle;

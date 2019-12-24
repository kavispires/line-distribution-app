import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title, isBeta, isAdmin }) => {
  useEffect(() => {
    document.title = `Line Distributon | ${title}`;
  });

  return (
    <h1 className="page-title">
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
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isBeta: PropTypes.bool,
};

export default PageTitle;

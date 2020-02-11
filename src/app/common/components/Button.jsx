import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import shared components
import { Icon } from '../../common';
// Import utility functions
import { bem } from '../../../utils';

const Button = ({
  label,
  onClick,
  className,
  icon,
  isBlock,
  isDisabled,
  isVisible,
  size,
  type,
  children,
}) => {
  const blockClass = isBlock ? 'block' : '';
  const visibilityClass = isVisible ? '' : ' hidden';
  const bemClasses = bem('btn', [blockClass, size, type]);

  return (
    <button
      className={`${bemClasses} ${className} ${visibilityClass}`}
      onClick={() => onClick()}
      disabled={isDisabled}
    >
      {children ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Fragment>
          {Boolean(icon) && <Icon type={icon} size="12" inline />}
          {label}
        </Fragment>
      )}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  icon: '',
  isBlock: false,
  isDisabled: false,
  isVisible: true,
  size: 'default',
  type: 'primary',
  children: null,
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string,
  isBlock: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isVisible: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  type: PropTypes.oneOf(['primary', 'secondary', 'terciary', 'danger']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Button;

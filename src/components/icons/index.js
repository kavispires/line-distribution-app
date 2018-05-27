import React from 'react';
import PropTypes from 'prop-types';

import iconBoxChecked from '../../images/icon-box-checked.svg';
import iconBoxInvalid from '../../images/icon-box-invalid.svg';
import iconBoxUnchecked from '../../images/icon-box-unchecked.svg';
import iconDefault from '../../images/icon-default.svg';
import iconNo from '../../images/icon-no.svg';
import iconOfficial from '../../images/icon-official.svg';
import iconYes from '../../images/icon-yes.svg';

const Icon = ({type, size = 'small'}) => {
  let icon;
  let alt;
  let sizeClass = 'icon-medium';

  if (size === 'small') {
    sizeClass = 'icon-small';
  }
  if (size === 'large') {
    sizeClass = 'icon-large';
  }

  switch (type) {
    case 'box-checked':
      icon = iconBoxChecked;
      alt = 'Checked';
      break;

    case 'box-invalid':
      icon = iconBoxInvalid;
      alt = 'Invalid';
      break;

    case 'box-unchecked':
      icon = iconBoxUnchecked;
      alt = 'Unchecked';
      break;

    case 'no':
      icon = iconNo;
      alt = 'No/Unavailable';
      break;

    case 'official':
      icon = iconOfficial;
      alt = 'Official';
      break;

    case 'yes':
      icon = iconYes;
      alt = 'Yes/Available';
      break;


    default:
      icon = iconDefault;
      alt = 'Icon';
  }

  return <img className={`icon ${sizeClass}`} src={icon} alt={alt} />;
};

Icon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Icon;

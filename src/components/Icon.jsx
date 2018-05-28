import React from 'react';
import PropTypes from 'prop-types';

import icons from './icons';

export const ICONS_LIST = ['default', 'archive', 'box-checked', 'box-invalid', 'box-checked', 'clock', 'edit', 'heart', 'hide', 'loading', 'no', 'official', 'reset', 'results', 'save', 'stop', 'trash', 'view', 'yes'];

const Icon = ({ type, size = 'small', styles = {} }) => {
  let icon;

  switch (type) {
    case 'archive':
      icon = icons.archive;
      break;

    case 'box-checked':
      icon = icons.boxChecked;
      break;

    case 'box-invalid':
      icon = icons.boxInvalid;
      break;

    case 'box-unchecked':
      icon = icons.boxUnchecked;
      break;

    case 'clock':
      icon = icons.clock;
      break;

    case 'edit':
      icon = icons.edit;
      break;

    case 'heart':
      icon = icons.heart;
      break;

    case 'hide':
      icon = icons.hide;
      break;

    case 'loading':
      icon = icons.loading;
      break;

    case 'no':
      icon = icons.no;
      break;

    case 'official':
      icon = icons.official;
      break;

    case 'reset':
      icon = icons.reset;
      break;

    case 'results':
      icon = icons.results;
      break;

    case 'save':
      icon = icons.save;
      break;

    case 'stop':
      icon = icons.stop;
      break;

    case 'trash':
      icon = icons.trash;
      break;

    case 'view':
      icon = icons.view;
      break;


    case 'yes':
      icon = icons.yes;
      break;

    default:
      icon = icons.default;
  }

  const mergeStyles = (...args) => Object.assign({}, ...args);

  const style = {};

  return (
    <span className={`icon icon-${size}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        fit
        style={mergeStyles(
          styles,
          style, // This lets the parent pass custom styles
        )}
      >
        { icon }
      </svg>
    </span>

  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  styles: PropTypes.object.isRequired, // eslint-disable-line
};

export default Icon;

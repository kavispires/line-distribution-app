import React from 'react';
import PropTypes from 'prop-types';

import icons from '../icons';

export const ICONS_LIST = [
  'default',
  'archive',
  'box-checked',
  'box-invalid',
  'box-unchecked',
  'chevron-down',
  'chevron-up',
  'clock',
  'connect',
  'edit',
  'heart',
  'hide',
  'loading',
  'lyrics',
  'lyrics-connected',
  'no',
  'official',
  'plug',
  'plug-connected',
  'reset',
  'results',
  'save',
  'sign-in',
  'sign-out',
  'stop',
  'trash',
  'used',
  'video',
  'view',
  'yes',
];

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

    case 'chevron-down':
      icon = icons.chevronDown;
      break;

    case 'chevron-up':
      icon = icons.chevronUp;
      break;

    case 'clock':
      icon = icons.clock;
      break;

    case 'connect':
      icon = icons.connect;
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

    case 'lyrics':
      icon = icons.lyrics;
      break;

    case 'lyrics-connected':
      icon = icons.lyricsConnected;
      break;

    case 'no':
      icon = icons.no;
      break;

    case 'official':
      icon = icons.official;
      break;

    case 'plug':
      icon = icons.plug;
      break;

    case 'plug-connected':
      icon = icons.plugConnected;
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

    case 'sign-in':
      icon = icons.signIn;
      break;

    case 'sign-out':
      icon = icons.signOut;
      break;

    case 'stop':
      icon = icons.stop;
      break;

    case 'trash':
      icon = icons.trash;
      break;

    case 'used':
      icon = icons.used;
      break;

    case 'video':
      icon = icons.video;
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
        style={mergeStyles(
          styles,
          style // This lets the parent pass custom styles
        )}
      >
        {icon}
      </svg>
    </span>
  );
};

Icon.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf([
    'small',
    'small-inline',
    'medium',
    'medium-inline',
    'large',
    'x-large',
  ]),
  styles: PropTypes.object,
};

Icon.defaultProps = {
  type: 'default',
  size: 'small',
  styles: {},
};

export default Icon;

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from '../Icon';

const ExpandableCard = ({
  globalId,
  title,
  icon,
  width,
  ...props,
}) => {
  // Verify if icon is needed
  if (icon) {
    icon = <Icon type={icon} size="medium-inline" />;
  } else {
    icon = null;
  }

  const { global } = props.props.app;
  const isExpanded = global[globalId] === undefined || !global[globalId];
  const expandableIcon = isExpanded ? 'chevron-up' : 'chevron-down';

  return (
    <div className={`shared-expandable-card shared-expandable-card--${width}`}>
      <h2 className="shared-expandable-card__title">
        { icon }
        { title }
      </h2>
      {
        isExpanded ? props.children : null
      }
      <button
        className="shared-expandable-card__button"
        onClick={() => props.props.updateGlobal(globalId)}
      >
        <Icon type={expandableIcon} size="medium" />
      </button>
    </div>
  );
};

ExpandableCard.propTypes = {
  globalId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  width: PropTypes.oneOf(['quarter', 'third', 'half', 'full']),
  children: PropTypes.element.isRequired,
  props: PropTypes.object.isRequired, // eslint-disable-line
};

ExpandableCard.defaultProps = {
  icon: null,
  width: 'half',
};

export default ExpandableCard;

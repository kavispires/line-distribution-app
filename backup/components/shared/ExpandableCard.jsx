import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const ExpandableCard = ({ sessionId, title, icon, width, ...props }) => {
  // Verify if icon is needed
  if (icon) {
    icon = <Icon type={icon} size="medium-inline" />;
  } else {
    icon = null;
  }

  const { session } = props.props.app;
  const isExpanded = session[sessionId] === undefined || !session[sessionId];
  const expandableIcon = isExpanded ? 'chevron-up' : 'chevron-down';

  return (
    <div className={`shared-expandable-card shared-expandable-card--${width}`}>
      <h2 className="shared-expandable-card__title">
        {icon}
        {title}
      </h2>
      {isExpanded ? props.children : null}
      <button
        className="shared-expandable-card__button"
        onClick={() => props.props.updateSession(sessionId)}
      >
        <Icon type={expandableIcon} size="medium" />
      </button>
    </div>
  );
};

ExpandableCard.propTypes = {
  sessionId: PropTypes.string.isRequired,
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

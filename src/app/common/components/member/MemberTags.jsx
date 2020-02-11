import React from 'react';
import PropTypes from 'prop-types';
import enums from '../../../../utils/readable-enums';

const MemberTags = ({ tags, memberId, color }) => (
  <div className="card__tags-group">
    <span>TAGS:</span>
    <ul className="card__tags-list">
      {tags.length ? (
        tags.map(tag => (
          <li
            key={`tag${memberId}-${tag}`}
            className={`pill pill--mini background-color-${color}`}
          >
            {enums.TAGS[tag]}
          </li>
        ))
      ) : (
        <li className="pill pill--mini background-color-31">None</li>
      )}
    </ul>
  </div>
);

MemberTags.propTypes = {
  color: PropTypes.number.isRequired,
  memberId: PropTypes.string.isRequired,
  tags: PropTypes.array,
};

MemberTags.defaultProps = {
  tags: [],
};

export default MemberTags;

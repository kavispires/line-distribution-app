import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import { Icon, PositionIcon } from '../../../common';
// Import utility functions
import utils from '../../../../utils';

const DistributeConnect = ({
  activeMemberPill,
  activateMemberPill,
  distributionLines,
  linkMemberToPart,
  members,
  rates,
}) => (
  <section className="distribute__section distribute__section--connect">
    <div className="distribute__section-left">
      <div className="distribute__content">
        <h3>Instructions</h3>
        <p>
          Assign members to every single part in the lyrics. You can instantly
          see the overall percentage. You can overwrite a member by assigning a
          new one to that part.
        </p>
      </div>
      <div className="distribute__content">
        <h3>Members</h3>
        <p>
          Click on the member pill then in a lyric connection icon on the right.
        </p>
        <ul className="distribute__members">
          {Object.values(members).map(member => (
            <li
              key={member.id}
              className={`pill distribute__member-pill background-color-${utils.getColorNumber(
                member.colorId
              )} ${activeMemberPill === member.id ? 'active' : ''}`}
              onClick={() => activateMemberPill(member.id)}
            >
              <PositionIcon
                position={utils.getMostImportantPosition(member.positions)}
              />{' '}
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="distribute__content">
        <h3>Live Distribution Rates</h3>
        <div className="distribute__rates">
          <div className="distribute__rates__members">
            {Object.values(members).map(member => (
              <li
                key={member.id}
                className={`pill distribute__rates__percentage-pill background-color-${utils.getColorNumber(
                  member.colorId
                )}`}
              >
                {member.name}
              </li>
            ))}
          </div>
          <div className="distribute__rates__percentages">
            {Object.values(members).map(member => {
              const percentage = rates[member.id]
                ? Math.round((100 * rates[member.id]) / rates.total)
                : 0;
              const spanWidth = {
                width: `${percentage}%`,
              };

              return (
                <li
                  key={member.id}
                  className="pill distribute__rates__percentage-bar-group"
                >
                  <span className="distribute__rates__percentage-value">
                    {percentage}%
                  </span>
                  <span
                    style={spanWidth}
                    className={`distribute__rates__percentage-bar background-color-${utils.getColorNumber(
                      member.colorId
                    )}`}
                  />
                </li>
              );
            })}
          </div>
        </div>
        <p>
          Remaining:{' '}
          {rates.remaining === 0 && rates.total === 0 ? '100%' : null}
          {rates.remaining > 0 && rates.total > 0
            ? `${Math.round(
                (100 * rates.remaining) / (rates.total + rates.remaining)
              )}%`
            : null}
          {rates.remaining === 0 && rates.total > 0 ? '0%' : null}
        </p>
      </div>
    </div>
    <div className="distribute__section-right">
      <div className="distribute__content--lyrics">
        {distributionLines.map((line, index) => {
          const key = `line-${index}`;
          return line.length > 0 ? (
            <div className="distribution__lyrics__line" key={key}>
              {line.map((part, partIndex) => {
                const partKey = `${key}-${partIndex}`;

                const colors = part.memberId.map(mId => members[mId].color.hex);

                const lineColors = {};
                if (colors.length === 1) {
                  [lineColors.background] = colors;
                } else if (colors.length > 1) {
                  lineColors.background = `linear-gradient(${colors.join(
                    ', '
                  )})`;
                }

                return (
                  <span
                    role="button"
                    tabIndex={0}
                    className="distribution__lyrics__line--part"
                    style={lineColors}
                    key={`${partKey}-new`}
                    onClick={() => linkMemberToPart(part.id)}
                  >
                    {part.memberId.map(m => {
                      const mKey = `${partKey}-${m}`;
                      return (
                        <span
                          key={mKey}
                          className="distribution__lyrics__line--icon"
                        >
                          <Icon type="plug-connected" size="12" color="black" />
                        </span>
                      );
                    })}
                    <span className="distribution__lyrics__line--icon">
                      <Icon type="plug-available" size="12" color="gray" />
                    </span>
                    <span className="distribution__lyrics__line--content">
                      {part.content}
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="distribution__lyrics" key={key}>
              &nbsp;
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

DistributeConnect.propTypes = {
  activeMemberPill: PropTypes.string,
  activateMemberPill: PropTypes.func.isRequired,
  distributionLines: PropTypes.array.isRequired,
  linkMemberToPart: PropTypes.func.isRequired,
  members: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
};

DistributeConnect.defaultProps = {
  activeMemberPill: '',
};

export default DistributeConnect;

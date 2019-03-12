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
        <h3>Members &amp; Live Distribution Rates</h3>
        <p>
          Click on the member pill then in a lyric connection icon on the right.
        </p>
        <ul className="distribute__rates">
          {Object.values(members).map(member => {
            const colorNumber = utils.getColorNumber(member.colorId);
            const activeClass = activeMemberPill === member.id ? 'active' : '';
            const percentage = rates[member.id]
              ? Math.round((100 * rates[member.id]) / rates.total)
              : 0;
            const spanWidth = {
              width: `${percentage}%`,
            };

            return (
              <li className="distribute__pill-group" key={member.id}>
                <div
                  role="button"
                  tabIndex={0}
                  className={`pill distribute__member-pill background-color-${colorNumber} border-color-${colorNumber} ${activeClass}`}
                  onClick={() => activateMemberPill(member.id)}
                >
                  <PositionIcon
                    position={utils.getMostImportantPosition(member.positions)}
                  />{' '}
                  {member.name}
                </div>
                <div className="pill distribute__rates__percentage-bar-group">
                  <span className="distribute__rates__percentage-value">
                    {percentage}%
                  </span>
                  <span
                    style={spanWidth}
                    className={`distribute__rates__percentage-bar background-color-${utils.getColorNumber(
                      member.colorId
                    )}`}
                  />
                </div>
              </li>
            );
          })}
        </ul>

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
                  if (colors[0] === '#ebebf2') {
                    lineColors.fontStyle = 'italic';
                    lineColors.color = '#7e7e82';
                  }
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

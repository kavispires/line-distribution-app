import React from 'react';
import PropTypes from 'prop-types';

// Import common components
import { Icon } from '../../../common';

const ICON_COLOR_CODE_HASH = {
  '1': 'red',
  '8': 'yellow',
  '12': 'green',
  '20': 'blue',
  '26': 'pink',
};

const SyncStep4Distributions = ({
  activeLine,
  connectSyncLine,
  distributionLines,
  isDistributionComplete,
  unlockSpecificStep,
  unlockNextStep,
}) => (
  <div className="sync__step sync__step--4">
    <p>
      This step begins in the left side of this page. You will create
      syncronizations, then link the pills with each plug in the lyrics here.
    </p>
    <button className="btn btn-block" onClick={() => unlockSpecificStep(3)}>
      <Icon type="back-arrow" inline /> Go Back To Lyrics
    </button>
    <section className="sync__distribution__lyrics">
      {distributionLines.map((line, index) => {
        const key = `line-${index}`;
        return line.length > 0 ? (
          <div className="sync__distribution__line" key={key}>
            {line.map((part, partIndex) => {
              const partKey = `${key}-${partIndex}`;
              const isActive = +activeLine === +part.id ? 'active' : '';
              return (
                <span
                  role="button"
                  tabIndex={0}
                  className={`sync__distribution__line--part sync__distribution__line--part-${isActive}`}
                  key={partKey}
                  onClick={() => connectSyncLine(part.id)}
                >
                  <span className="sync__distribution__line--icon">
                    <Icon
                      type={part.link ? 'plug-connected' : 'plug-available'}
                      size="12"
                      color={
                        part.color ? ICON_COLOR_CODE_HASH[part.color] : 'gray'
                      }
                    />
                  </span>
                  <span className="sync__distribution__line--content">
                    {part.content}
                  </span>
                </span>
              );
            })}
          </div>
        ) : (
          <div className="sync__distribution__line" key={key}>
            &nbsp;
          </div>
        );
      })}
    </section>
    <button
      className="btn btn-block"
      disabled={!isDistributionComplete}
      onClick={() => unlockNextStep()}
    >
      Next Step
    </button>
  </div>
);

SyncStep4Distributions.propTypes = {
  activeLine: PropTypes.object,
  connectSyncLine: PropTypes.func.isRequired,
  distributionLines: PropTypes.array.isRequired,
  isDistributionComplete: PropTypes.bool,
  unlockSpecificStep: PropTypes.func.isRequired,
  unlockNextStep: PropTypes.func.isRequired,
};

SyncStep4Distributions.defaultProps = {
  activeLine: null,
  isDistributionComplete: false,
};

export default SyncStep4Distributions;

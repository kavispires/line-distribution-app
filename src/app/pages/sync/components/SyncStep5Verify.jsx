import React from 'react';
import PropTypes from 'prop-types';

const linesOn = {};

const SyncStep5Verify = ({ currentTime, distributionLines, timestamps }) => {
  const timestampsList = Object.keys(timestamps);
  for (let i = 0; i < timestampsList.length; i++) {
    const key = timestampsList[i];

    // If current time is smaller than the key, stop loop;
    if (currentTime < key) {
      i = timestampsList.length;
    } else if (currentTime >= key) {
      const tsArray = timestamps[key];
      tsArray.forEach(tsObj => {
        if (tsObj.endTime < currentTime) {
          linesOn[tsObj.partId.substring(5)] = false;
        } else {
          linesOn[tsObj.partId.substring(5)] = true;
        }
      });
    }
  }

  return (
    <div className="sync__step sync__step--5">
      <div className="sync__distribution__lyrics">
        {distributionLines.map((line, index) => {
          const key = `line-${index}`;
          return line.length > 0 ? (
            <div className="sync-lyrics-done__line" key={key}>
              {line.map((part, partIndex) => {
                const partKey = `${key}-${partIndex}`;
                const isActive = linesOn[part.id]
                  ? 'sync__distribution__line--part-active'
                  : '';
                return (
                  <span
                    className={`sync__distribution__line--part ${isActive}`}
                    key={partKey}
                  >
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
      </div>
    </div>
  );
};

SyncStep5Verify.propTypes = {
  currentTime: PropTypes.number.isRequired,
  distributionLines: PropTypes.array.isRequired,
  timestamps: PropTypes.object.isRequired,
};

SyncStep5Verify.defaultProps = {};

export default SyncStep5Verify;

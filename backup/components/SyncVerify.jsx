import React from 'react';
import PropTypes from 'prop-types';

const linesOn = {};

class SyncVerify extends React.Component {
  componentDidMount() {
    const { props } = this.props;
    const SYNC = props.sync;

    if (SYNC.finalLyrics === '') {
      props.finalizeLyrics();
    }
  }

  render() {
    const { props, playerHeight, currentTime } = this.props;
    const SYNC = props.sync;

    const videoPlaceholder = {
      height: `${playerHeight}px`,
    };

    const timestampsList = Object.keys(SYNC.timestamps);

    for (let i = 0; i < timestampsList.length; i++) {
      // If current time is smaller than the key, stop loop;
      const key = timestampsList[i];
      if (currentTime < key) {
        i = timestampsList.length;
      } else if (currentTime >= timestampsList[i]) {
        const tsArray = SYNC.timestamps[key];
        tsArray.forEach(tsObj => {
          if (key + tsObj.duration > currentTime) {
            linesOn[tsObj.partId.substring(5)] = true;
          }
        });
      }
    }

    return (
      <div className="sync-grid-section">
        <section
          className="sync-grid-video-placeholder"
          style={videoPlaceholder}
        />
        <section className="sync-grid-form-check">
          <ul className="sync-info">
            <li className="sync-info__item">
              <label className="ld-form__label" htmlFor="title">
                title:
              </label>
              <input
                className="ld-form__input-text"
                type="text"
                name="title"
                disabled
                value={SYNC.form.title}
              />
            </li>
            <li className="sync-info__item">
              <label className="ld-form__label" htmlFor="originalArtist">
                original artist:
              </label>
              <input
                className="ld-form__input-text"
                type="text"
                name="originalArtist"
                disabled
                value={SYNC.form.originalArtist}
              />
            </li>
            <li className="sync-info__item">
              <label className="ld-form__label" htmlFor="album">
                album:
              </label>
              <input
                className="ld-form__input-text"
                type="text"
                name="album"
                disabled
                value={SYNC.form.album}
              />
            </li>
            <li className="sync-info__item">
              <label className="ld-form__label" htmlFor="single">
                title/single:
              </label>
              <input
                className="ld-form__checkbox"
                type="checkbox"
                name="single"
                disabled
                checked={SYNC.form.single}
              />
            </li>
            <li className="sync-info__item">
              <label className="ld-form__label" htmlFor="groupSize">
                group size:
              </label>
              <input
                className="ld-form__input-number"
                type="number"
                name="groupSize"
                disabled
                value={SYNC.form.groupSize}
              />
            </li>
          </ul>
        </section>
        <section className="sync-grid-lyrics">
          <div className="sync-lyrics-done">
            {/* <textarea
              className="sync-grid-lyrics__textarea"
              value={SYNC.finalLyrics}
              disabled
            /> */}
            {SYNC.distributionLines.map((line, index) => {
              const key = `line-${index}`;
              if (line.length > 0) {
                return (
                  <div className="sync-lyrics-done__line" key={key}>
                    {line.map((part, partIndex) => {
                      const partKey = `${key}-${partIndex}`;
                      const isActive = linesOn[part.id]
                        ? 'sync-lyrics-done__part--active'
                        : '';
                      return (
                        <span
                          className={`sync-lyrics-done__part ${isActive}`}
                          key={partKey}
                        >
                          <span className="sync-lyrics-done__content">
                            {part.content}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                );
              }
              return (
                <div className="sync-lyrics-done__line" key={key}>
                  &nbsp;
                </div>
              );
            })}
          </div>
        </section>
        <section className="sync-grid-navigation">
          <button
            className="btn btn-inline btn-fx-150"
            onClick={() => props.updateStep('-1')}
          >
            Back
          </button>
          <button
            className="btn btn-inline btn-fx-150"
            onClick={() => props.saveSong()}
            disabled={!SYNC.isDistributionComplete}
          >
            Save
          </button>
        </section>
      </div>
    );
  }
}

SyncVerify.propTypes = {
  props: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  playerHeight: PropTypes.number.isRequired,
};

export default SyncVerify;

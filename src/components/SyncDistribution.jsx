import React from 'react';

// Import shared components
import Icon from './shared/Icon';

class SyncDistribution extends React.Component {
  componentDidMount() {
    const { props } = this.props;
    const SYNC = props.sync;

    if (SYNC.finalLyrics === '') {
      props.setFinalLyrics('');
    }
  }

  render() {
    const { props, player, playerHeight } = this.props;
    const SYNC = props.sync;

    const videoPlaceholder = {
      height: `${playerHeight}px`,
    };

    const boxes = [
      { color: 'color-1', name: 'Vocal 1', boxId: '1' },
      { color: 'color-10', name: 'Vocal 2', boxId: '2' },
      { color: 'color-22', name: 'AdLibs', boxId: '3' },
      { color: 'color-14', name: 'All', boxId: '4' },
    ];

    const pillColors = {
      1: 'color-1',
      2: 'color-10',
      3: 'color-22',
      4: 'color-14',
    };

    return (
      <div className="sync-grid-section">
        <section
          className="sync-grid-video-placeholder"
          style={videoPlaceholder}
        />
        <section className="sync-grid-boxes">
          {boxes.map((box, index) => (
            <button
              key={box.name}
              className={`box box-25 ${box.color}`}
              onMouseDown={() => props.handleBoxMouseDown(box.boxId, player)}
              onMouseUp={() => props.handleBoxMouseUp(box.boxId, player)}
            >
              <span className="key">{index + 1}</span>
              <span className="member-name">{box.name}</span>
            </button>
          ))}
        </section>
        <section className="sync-grid-distribution">
          <h3>
            Log
            <span
              role="button"
              tabIndex={0}
              className="sync-log__trash"
              onClick={() => props.deletePill()}
            >
              <Icon type="trash" size="medium-inline" />
            </span>
          </h3>
          <div className="sync-log">
            {Object.keys(SYNC.pills).map(key => {
              const item = SYNC.pills[key];
              const isActive = SYNC.activePill == item.pillId ? 'active' : '';
              const iconName = item.link ? 'plug-connected' : 'plug';
              return (
                <span
                  key={item.pillId}
                  role="button"
                  tabIndex={0}
                  className={`${
                    pillColors[item.key]
                  } sync-log__pill ${isActive}`}
                  onClick={() => props.connectPill(item.pillId)}
                >
                  <Icon type={iconName} size="small-inline" />
                  <span className="sync-log__num">
                    :{item.timestamp.toFixed(2)}
                  </span>
                  <span className="sync-log__num">
                    :{item.duration.toFixed(2)}
                  </span>
                </span>
              );
            })}
          </div>
          <div className="sync-log__controls">
            <button className="btn btn-25" onClick={props.resetPillLinks}>
              Reset Links
            </button>
            <button
              className={`btn btn-25 sync-sequence-${SYNC.linkSequenceMode}`}
              onClick={props.linkPillsSequence}
            >
              Link in Sequence
            </button>
          </div>
          <p>Linked Lines/Log Pills: ? {Object.keys(SYNC.pills).length}</p>
        </section>
        <section className="sync-grid-lyrics">
          <div className="sync-lyrics-locked">
            {SYNC.distributionLines.map((line, index) => {
              const key = `line-${index}`;
              if (line.length > 0) {
                return (
                  <div className="sync-lyrics-line" key={key}>
                    {line.map((part, partIndex) => {
                      const partKey = `${key}-${partIndex}`;
                      const isActive =
                        SYNC.activeLine == part.id ? 'active' : '';
                      const iconName = part.link
                        ? 'plug-connected'
                        : 'plug-available';
                      return (
                        <span
                          role="button"
                          tabIndex={0}
                          className={`sync-lyrics-line__part ${isActive}`}
                          key={partKey}
                          onClick={() => props.connectLine(part.id)}
                        >
                          <span className="sync-lyrics-line__icon">
                            <Icon type={iconName} size="small-inline" />
                          </span>
                          <span className="sync-lyrics-line__content">
                            {part.content}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                );
              }
              return (
                <div className="sync-lyrics-line" key={key}>
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
            onClick={() => props.updateStep('+1')}
            disabled={!SYNC.isDistributionComplete}
          >
            Next
          </button>
        </section>
      </div>
    );
  }
}

export default SyncDistribution;

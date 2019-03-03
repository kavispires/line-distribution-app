import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import common components
import { Icon } from '../../../common';

class SyncStep4Buttons extends Component {
  componentDidMount() {
    if (this.props.location.pathname === '/admin/sync') {
      window.addEventListener('keydown', event =>
        this.props.handleSyncKeydown(event, this.props.player)
      );
      window.addEventListener('keyup', event =>
        this.props.handleSyncKeyup(event, this.props.player)
      );
    }
  }

  render() {
    const boxes = [
      { color: '1', name: 'Vocal', boxId: '1' },
      { color: '8', name: 'Sub', boxId: '2' },
      { color: '12', name: 'Rap', boxId: '3' },
      { color: '20', name: 'AdLibs', boxId: '4' },
      { color: '26', name: 'All', boxId: '5' },
    ];

    const pillColors = {
      1: '1',
      2: '8',
      3: '12',
      4: '20',
      5: '26',
    };

    return (
      <div className="sync__step sync__step--4b">
        <p>
          You can only record distributions when the video is playing, so hit
          play!
        </p>
        <div className="sync__distribution__buttons">
          {boxes.map((box, index) => (
            <button
              key={box.name}
              className={`box box-25 background-color-${box.color}`}
              onMouseDown={() =>
                this.props.handleSyncBoxMouseDown(box.boxId, this.props.player)
              }
              onMouseUp={() =>
                this.props.handleSyncBoxMouseUp(
                  box.boxId,
                  this.props.player,
                  box.color
                )
              }
            >
              <span className="key">{index + 1}</span>
              <span className="member-name">{box.name}</span>
            </button>
          ))}
        </div>
        <div className="sync__distribution__pills">
          <h3>
            Log
            <span
              role="button"
              tabIndex={0}
              className="sync__log-trash"
              onClick={() => this.props.deleteSyncPill()}
            >
              <Icon type="trash" size="24" inline />
            </span>
          </h3>
          <p>
            When you have enough pills in the log, you can connect them with the
            lyrics. You will need a pill for each unconnected plug in the
            lyrics.
          </p>
          <div className="sync__log">
            {Object.keys(this.props.pills).map(key => {
              const item = this.props.pills[key];
              const isActive =
                +this.props.activePill === +item.pillId ? 'active' : '';

              return (
                <span
                  key={item.pillId}
                  role="button"
                  tabIndex={0}
                  className={`background-color-${
                    pillColors[item.key]
                  } sync__log__pill sync__log__pill--${isActive}`}
                  onClick={() => this.props.connectSyncPill(item.pillId)}
                >
                  <Icon
                    type={item.link ? 'plug-connected' : 'plug'}
                    size="12"
                    inline
                  />
                  <span className="sync__log__num">
                    :{item.timestamp.toFixed(2)}
                  </span>
                  <span className="sync__log__num">
                    :{item.duration.toFixed(2)}
                  </span>
                </span>
              );
            })}
          </div>
          <div className="sync__log__controls">
            <button className="btn btn-50" onClick={this.props.resetPillLinks}>
              Reset Links
            </button>
            <button
              className={`btn btn-50 sync__sequence--${
                this.props.linkSequenceMode
              }`}
              onClick={this.props.linkPillsSequence}
            >
              Link in Sequence
            </button>
          </div>
          <p>
            Linked Lines/Log Pills: ? / {Object.keys(this.props.pills).length}{' '}
            {/* TO-DO: Linked Lines count */}
          </p>
        </div>
      </div>
    );
  }
}

SyncStep4Buttons.propTypes = {
  activePill: PropTypes.number,
  connectSyncPill: PropTypes.func.isRequired,
  deleteSyncPill: PropTypes.func.isRequired,
  handleSyncBoxMouseDown: PropTypes.func.isRequired,
  handleSyncBoxMouseUp: PropTypes.func.isRequired,
  handleSyncKeydown: PropTypes.func.isRequired,
  handleSyncKeyup: PropTypes.func.isRequired,
  linkPillsSequence: PropTypes.func.isRequired,
  linkSequenceMode: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  pills: PropTypes.object.isRequired,
  player: PropTypes.any,
  resetPillLinks: PropTypes.func.isRequired,
};

SyncStep4Buttons.defaultProps = {
  activePill: null,
  player: null,
};

export default SyncStep4Buttons;

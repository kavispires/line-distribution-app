import React from 'react';

// Import shared components
import Icon from './shared/Icon';
import MemberProfile from './MemberProfile';

// const Test = props => (
//   <main className="container">
//     <h1>Test Page</h1>
//     <div className="content">
//       <p>
//         <Icon type="default" size="medium" color="red" />
//       </p>
//       <button onClick={() => props.testFunction()}>Run test</button>
//       <p>{props.test.test1}</p>
//     </div>
//   </main>
// );

let loadYT;

// https://www.youtube.com/watch?v=i0p1bmr0EmE

class Test extends React.Component {
  componentDidMount() {
    if (!loadYT) {
      loadYT = new Promise(resolve => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }
    loadYT.then(YT => {
      this.player = new YT.Player(this.youtubePlayerAnchor, {
        height: this.props.height || 390,
        width: this.props.width || 640,
        videoId: 'i0p1bmr0EmE',
        events: {
          onStateChange: this.onPlayerStateChange,
        },
      });
    });
  }

  onPlayerStateChange = e => {
    if (typeof this.props.onStateChange === 'function') {
      this.props.onStateChange(e);
    }
  };

  render() {
    const play = () => this.player.playVideo();
    const pause = () => this.player.pauseVideo();
    const stop = () => this.player.stopVideo();
    const getTimestamp = () => {
      const timepstamp = this.player.getCurrentTime();
      console.log(timepstamp);
    };
    console.log(this.player);
    return (
      <section className="container">
        <button onClick={() => this.props.testFunction()}>
          Create New Key
        </button>
        <p>New KEY:</p>
        <h1>{this.props.test.test1}</h1>

        <div
          ref={r => {
            this.youtubePlayerAnchor = r;
          }}
        />
        <br />
        <button onClick={() => play()}>Play</button>
        <br />
        <button onClick={() => pause()}>Pause</button>
        <br />
        <button onClick={() => stop()}>Stop</button>
        <br />
        <button onClick={() => getTimestamp()}>Timestamp!</button>
        <br />
      </section>
    );
  }
}

export default Test;

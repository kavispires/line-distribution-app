import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import Icon from './shared/Icon';

const instructions = {
  1: {
    title: 'Video',
    list: [
      'Start by adding the Youtube link or videoId',
      "You won't be able change this on a later step, but you can always come back to this step",
    ],
  },
  2: {
    title: 'Basic Info',
    list: [
      'Now add the basic information for your song',
      'Only the song title is required, but try to fill as much information you have available',
    ],
  },
  3: {
    title: 'Lyrics',
    list: [
      'Paste the lyrics in the lyrics field',
      'Click on "Prepare Lines" to add brackets in the beginning of each line',
      'Add brackets whenever there is a change of singer or pause in the song',
      'Click on "Lock Lyrics" where you are done, the next button will be enabled',
    ],
  },
  4: {
    title: 'Distribution',
    list: [
      'Hit play and hold the colored boxes (or hit the keyboard) to create distribution pills',
      'Click on each pill in the log and connect with each part in lyrics',
      'When all parts in the lyrics are connected to a unique pill, you can move forward',
    ],
  },
  5: {
    title: 'Verify & Save',
    list: [
      'You can play the song and see how the syncing goes',
      'If everything looks okay, go head and save it',
    ],
  },
};

const SyncInstructions = ({ step }) => (
  <section className="sync-grid-instructions">
    <Icon type={`number-${step}`} size="medium" />
    <h2 className="sync-grid-instructions__title">
      {instructions[step].title}
    </h2>
    <ul className="sync-grid-instructions__list">
      {instructions[step].list.map((item, index) => {
        const key = `${step}-item-${index + 1}`;
        return <li key={key}>{item}</li>;
      })}
    </ul>
  </section>
);

SyncInstructions.propTypes = {
  step: PropTypes.number.isRequired,
};

export default SyncInstructions;

import React from 'react';

import constants from '../../../../utils/constants';

const HomeBackgroundVideo = () => {
  // Randomly choose one video in the playlist
  const youtubeUrl =
    constants.YOUTUBE_URLS[
      Math.floor(Math.random() * constants.YOUTUBE_URLS.length)
    ];

  return (
    <div className="home__video">
      <iframe
        className="home__iframe"
        title="home__video"
        src={`https://www.youtube.com/embed/${youtubeUrl}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=${youtubeUrl}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

HomeBackgroundVideo.propTypes = {};

export default HomeBackgroundVideo;

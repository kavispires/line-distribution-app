import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

// Import lyrics components
import LyricsOutput from './LyricsOutput';
// Import common components
import { Loading, RequirementWrapper } from '../../../common';
// Import lyric parser
import parseLyrics from '../parser';

class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: {
        result: [],
      },
    };
  }

  componentDidMount() {
    this.props.loadColors();
  }

  render() {
    const {
      app: { pending },
      artists: { activeUnit },
      admin: { colors },
    } = this.props;

    if (pending.REQUEST_COLORS) {
      return <Loading message="Fecthing Colors..." />;
    }

    const handleLyricsInput = event => {
      const { value } = event.target;
      this.setState({
        lyrics: parseLyrics(value, activeUnit.members || [], activeUnit.id),
      });
    };

    return (
      <RequirementWrapper requirements={['activeUnit']}>
        <main className="container container--lyrics">
          <h1>Lyrics</h1>
          <ScrollSync>
            <section className="lyrics__group">
              <ScrollSyncPane>
                <textarea
                  name="lyrics"
                  id=""
                  cols="30"
                  rows="10"
                  className="lyrics__input"
                  onChange={handleLyricsInput}
                />
              </ScrollSyncPane>
              <ScrollSyncPane>
                <LyricsOutput
                  lyrics={this.state.lyrics.result}
                  colorsDB={colors}
                />
              </ScrollSyncPane>
            </section>
          </ScrollSync>
        </main>
      </RequirementWrapper>
    );
  }
}

Lyrics.propTypes = {
  admin: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  loadColors: PropTypes.func.isRequired,
};

export default Lyrics;

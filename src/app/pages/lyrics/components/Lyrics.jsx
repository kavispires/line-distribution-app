import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import lyrics components
import LyricsOutput from './LyricsOutput';
// Import common components
import { Loading, RequirementWrapper } from '../../../common';
// Import lyric parser
import parseLyrics from '../parser';

const MEMBERS = {
  '-LVRFeNAc2nf-uZlIurE': {
    colorId: 'col000020',
    color: {
      b: 255,
      count: 8,
      g: 111,
      hex: '#406FFF',
      name: 'blue',
      number: 20,
      r: 64,
      id: 'col000020',
    },
    name: 'Kyle',
    id: '-LVRFeNAc2nf-uZlIurE',
  },
  '-LVRFeOG1HJSZSdHbotB': {
    colorId: 'col000002',
    color: {
      b: 27,
      count: 5,
      g: 49,
      hex: '#CE311B',
      name: 'blood',
      number: 2,
      r: 206,
      id: 'col000002',
    },
    name: 'Anthony',
    modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
    nationality: 'OTHER',
    positions: ['VISUAL', 'VOCALIST'],
    private: true,
    referenceArtist: 'KVS',
    id: '-LVRFeOG1HJSZSdHbotB',
  },
  '-LVRFePJxP4fCWgN_Lqf': {
    colorId: 'col000008',
    color: {
      b: 0,
      count: 8,
      g: 228,
      hex: '#FFE400',
      name: 'yellow',
      number: 8,
      r: 255,
      id: 'col000008',
    },
    name: 'Viktor',
    id: '-LVRFePJxP4fCWgN_Lqf',
  },
  '-LVRFeQMJ5rcbg-U-KRY': {
    colorId: 'col000023',
    color: {
      b: 239,
      count: 9,
      g: 119,
      hex: '#A177EF',
      name: 'violet',
      number: 23,
      r: 161,
      id: 'col000023',
    },
    name: 'Ira',
    id: '-LVRFeQMJ5rcbg-U-KRY',
  },
  '-LVRFeRPTdA6WiOv1CO7': {
    colorId: 'col000012',
    color: {
      b: 23,
      count: 9,
      g: 184,
      hex: '#7FB817',
      name: 'green',
      number: 12,
      r: 127,
      id: 'col000012',
    },
    name: 'Seth',
    modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
    id: '-LVRFeRPTdA6WiOv1CO7',
  },
};

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
      auth: { user },
      admin: { colors },
      updateFavoriteMembers,
    } = this.props;

    if (pending.REQUEST_COLORS) {
      return <Loading message="Fecthing Colors..." />;
    }

    const handleLyricsInput = event => {
      const { value } = event.target;
      const obj = {
        sample: value,
      };

      this.setState({
        lyrics: parseLyrics(value, MEMBERS, '1'),
      });
    };

    return (
      <RequirementWrapper>
        <main className="container container--lyrics">
          <h1>Lyrics</h1>
          <section className="lyrics__group">
            <textarea
              name="lyrics"
              id=""
              cols="30"
              rows="10"
              className="lyrics__input"
              onChange={handleLyricsInput}
            />
            <LyricsOutput lyrics={this.state.lyrics.result} colorsDB={colors} />
          </section>
        </main>
      </RequirementWrapper>
    );
  }
}

Lyrics.propTypes = {
  loadColors: PropTypes.func.isRequired,
};

export default Lyrics;

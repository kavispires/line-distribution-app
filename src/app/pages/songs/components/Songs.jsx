import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Checkbox, Form, Text } from 'informed';

// Import components
import SongsTable from './SongsTable';
// Import common components
import {
  ActiveSong,
  ActiveUnit,
  PageTitle,
  RequirementWrapper,
} from '../../../common';
// Import utils
import localStorage from '../../../../utils/local-storage';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      undone: true,
      matchGender: false,
      sortedBy: 'title',
      order: 'asc',
    };

    this.handleTableClick = this.handleTableClick.bind(this);
    this.filterSongs = this.filterSongs.bind(this);
    this.setSort = this.setSort.bind(this);
    this.sortSongs = this.sortSongs.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.loadSongs();
    }

    this.localStorage();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
      this.props.loadSongs();
    }
  }

  setSort(type) {
    let order = 'asc';
    if (this.state.sortedBy === type) {
      order = this.state.order === 'asc' ? 'desc' : 'asc';
    }

    this.setState({
      order,
      sortedBy: type,
    });

    localStorage.set({
      songsSort: type,
      songsOrder: order === 'desc' ? 'desc' : null,
    });
  }

  localStorage() {
    this.setState({
      undone: localStorage.get('songsUndone') || true,
      matchGender: localStorage.get('songsMatchGender') || true,
      sortedBy: localStorage.get('songsSort') || 'title',
      order: localStorage.get('songsOrder') || 'asc',
    });
  }

  updateFilters(formState) {
    this.setState({
      query: formState.values.query,
      undone: formState.values.undone,
      matchGender: formState.values.matchGender,
    });

    localStorage.set({
      songsUndone: formState.values.undone || null,
      songsMatchGender: formState.values.matchGender || null,
    });
  }

  handleTableClick(e) {
    const { id } = e.target.parentNode;
    if (id) {
      const songId = id.substring(2);
      this.props.activateSong(songId);
      this.props.history.push(`/distribute`);
    }
  }

  filterSongs(songs) {
    const { activeUnit } = this.props.distribute;

    return _.filter(songs, song => {
      const evaluation = [];

      if (this.state.undone) {
        const songDict = activeUnit.songsDict || {};
        if (songDict[song.id]) {
          evaluation.push(!song);
        } else {
          evaluation.push(song);
        }
      }

      if (this.state.matchGender) {
        if (activeUnit.gender === song.gender) {
          evaluation.push(song);
        } else {
          evaluation.push(!song);
        }
      }

      if (this.state.query) {
        const query = this.state.query.toLowerCase();

        if (song.query.includes(query)) {
          evaluation.push(song);
        } else {
          evaluation.push(!song);
        }
      }

      return evaluation.every(e => e);
    });
  }

  sortSongs(songs) {
    const { sortedBy, order } = this.state;
    return _.orderBy(songs, [song => song[sortedBy].toLowerCase()], [order]);
  }

  render() {
    const {
      app: { pending },
      db: { songs },
      distribute: { activeSong, activeUnit },
    } = this.props;

    const filteredSongs = this.sortSongs(this.filterSongs(songs));

    return (
      <RequirementWrapper requirements={['activeUnit']}>
        <main className="container container--songs">
          <PageTitle title="Songs" />
          <section className="active-widget__group">
            <ActiveUnit activeUnit={activeUnit} showMembers />
            <ActiveSong activeSong={activeSong} />
          </section>
          <h2>Filters</h2>
          <Form
            onChange={formState => this.updateFilters(formState)}
            autoComplete="off"
            className="songs-filters-group"
          >
            <div className="songs-filter-group">
              <label className="songs-filter-label">
                Title or Artist contains...
              </label>
              <Text
                className="songs-filter-input-text"
                field="query"
                initialValue={this.state.query}
              />
            </div>
            <div className="songs-filter-group">
              <label className="songs-filter-label">Match Gender</label>
              <Checkbox
                field="matchGender"
                initialValue={this.state.matchGender}
              />
            </div>
            <div className="songs-filter-group">
              <label className="songs-filter-label">
                Display only not previously distributed
              </label>
              <Checkbox field="undone" initialValue={this.state.undone} />
            </div>
          </Form>

          <p>To start a distribution, select a song by clicking on its row.</p>
          <SongsTable
            filteredSongs={filteredSongs}
            hasActiveFilters={Boolean(
              this.state.query || this.state.undone || this.state.matchGender
            )}
            pending={pending.REQUEST_SONGS}
            rowAction={this.handleTableClick}
            previouslyDistributedSongsDict={activeUnit.songsDict}
            sortBy={this.setSort}
            sortedBy={this.state.sortedBy}
          />
        </main>
      </RequirementWrapper>
    );
  }
}

Songs.propTypes = {
  activateSong: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  distribute: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadSongs: PropTypes.func.isRequired,
};

export default Songs;

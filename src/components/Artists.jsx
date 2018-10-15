import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from './Icon';
import CurrentArtist from './CurrentArtist';

class Artists extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.loadArtists();
    this.props.setSearchQuery('');
  }
  render() {
    const { app, artists } = this.props;
    const { artistList, searchQuery, userLatestArtists } = artists;

    let filteredArtists = artistList;
    if (searchQuery) {
      filteredArtists = _.filter(artistList, o =>
        o.query.includes(searchQuery)
      );
    }

    console.log(searchQuery);

    const handleArtistClick = () => {};

    return (
      <main className="container container--artists">
        <h1>Artists</h1>

        <CurrentArtist props={this.props} />

        {userLatestArtists.length > 0 ? (
          <section className="artists__section">
            <h2>
              <Icon type="clock" size="20" color="blue" /> Your Recently Used
              Artists
            </h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Genre</th>
                  <th>Unit</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody onClick={e => handleArtistClick(e)}>
                {userLatestArtists.map(entry => {
                  const unitCount = entry.units ? entry.units.length : 0;
                  return (
                    <tr key={`all-artists-${entry.id}`}>
                      <td>{entry.name}</td>
                      <td>{entry.genre}</td>
                      <td>{unitCount}</td>
                      <td>{entry.memberList.map(m => m.name).join(', ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ) : null}

        <section className="artists__section">
          <h2>All Artists</h2>
          <input
            className="artists__search-bar"
            type="text"
            placeholder="Filter..."
            onChange={e =>
              this.props.setSearchQuery(e.target.value.toUpperCase())
            }
          />
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Units</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody onClick={e => handleArtistClick(e)}>
              {filteredArtists.length > 0 ? (
                filteredArtists.map(entry => {
                  const unitCount = entry.units ? entry.units.length : 0;
                  return (
                    <tr key={`all-artists-${entry.id}`}>
                      <td>{entry.name}</td>
                      <td>{entry.genre}</td>
                      <td>{unitCount}</td>
                      <td>{entry.memberList.map(m => m.name).join(', ')}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No artists available within your search</td>
                  <td />
                  <td />
                  <td />
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    );
  }
}

Artists.propTypes = {};

Artists.defaultProps = {};

export default Artists;

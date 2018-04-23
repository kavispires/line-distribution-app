import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Member from './Member';
import iconOfficial from '../images/icon-official.svg';
import ArtistSongsTable from './ArtistSongsTable';
import LoadingIcon from './LoadingIcon';

class Artist extends Component {
  componentWillMount() {
    if (this.props.db.loaded) {
      const { artistId } = this.props.match.params;
      if (artistId) {
        this.props.updateSelectedArtist(artistId);
      }
      console.log('AND THE ARTIST ID IS', artistId);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      const { artistId } = this.props.match.params;
      if (artistId) {
        this.props.updateSelectedArtist(artistId);
      }
    }
  }

  render() {
    const APP = this.props.app;
    const ARTISTS = this.props.artists;

    const {
      selectedArtist,
      selectedUnits,
      selectedUnit,
      selectedUnitSongs,
    } = ARTISTS;

    if (selectedArtist === undefined) {
      return (
        <section className="container">
          <h1>Artist Page</h1>
          <p>No artist has been selected. Go to the <Link to="/artists">Artists Page</Link> and select a group.</p>
        </section>
      );
    }

    const setArtistUnit = (path, shouldReset = true) => {
      // this.props.toggleIsLoading(true);
      // setTimeout(() => {
        this.props.history.push(`/${path}`);
        this.props.updateShouldReset(shouldReset);
        this.props.updateCurrentUnit(selectedUnit, selectedArtist);
        this.props.updateLatestUnits(selectedUnit.id);
        // this.props.toggleIsLoading(false);
      // }, 1000);
    };

    const handleSongClick = (e) => {
      // Get id of the closest tr element
      const selectedSong = selectedUnit.songs[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))];
      // Set unit, push history and update latest
      setArtistUnit('distribute', false);
      setTimeout(() => {
        this.props.toggleIsLoading(true);
        this.props.updateCurrentSong(selectedSong);
      }, 1200);
    };

    return (
      <section className="container">
        <h1>Artist Page: {selectedArtist.name}</h1>
        <p><b>Genre:</b> {selectedArtist.genre}</p>
        <p><b>Members:</b>
          {
            selectedArtist.id && selectedArtist.memberList.map((member) => {
              const key = `member-${member.name}`;
              return (
                <span key={key} className={`member-list-item ${member.color.class}`}>
                  {member.name}
                </span>
              );
            })
          }
        </p>
        <ul className="tabs" onClick={this.props.switchUnitsTab}>
          {
            Object.keys(selectedUnits).map((unit) => {
              const { name, id, official } = selectedUnits[unit];
              return (
                <li
                  key={`tab-${name}`}
                  className={`tab ${+APP.artistPageTab === id ? 'selected' : ''}`}
                  id={id}
                  onClick={() => this.props.updateSelectedUnit(id)}
                >
                  {name} {official ? <img className="icon icon-tab" src={iconOfficial} alt="Official" /> : null }
                </li>
              );
            })
          }
        </ul>
        {
          selectedUnit && selectedUnit.id ? (
            <section className="unit-content">
              <h3>Debut: {selectedUnit.debutYear}</h3>
              <h3>
                <button className="btn btn-inline" onClick={() => setArtistUnit('distribute')}>Distribute</button>
                <button className="btn btn-inline" onClick={() => setArtistUnit('lyrics')}>Lyrics</button>
                <button className="btn btn-inline" onClick={() => setArtistUnit('songs')}>Load Song Lyrics</button>
              </h3>
              <h3>Members:</h3>
              <div className="unit-members">
                {
                  selectedUnit.members.map(member => (
                    <Member
                      key={member.id}
                      member={member}
                      props={this.props}
                    />
                  ))
                }
              </div>
              <h3>Songs:</h3>
              {
                <ArtistSongsTable
                  songs={selectedUnit.songs}
                  members={selectedUnit.members}
                  handleSongClick={handleSongClick}
                />
              }

            </section>
          ) : (
            <div>
              {
                APP.isLoading ? (
                  <LoadingIcon />
                ) : (
                  <p className="tab-padding">Select a unit tab above.</p>
                )
              }
            </div>
          )
        }
      </section>
    );
  }
};

export default Artist;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Member from './Member';
import iconOfficial from '../images/icon-official.svg';
import iconYes from '../images/icon-yes.svg';
import iconNo from '../images/icon-no.svg';

class Artist extends Component {
  componentDidMount() {
    const artistId = this.props.match.params.artistId;
    if (artistId) {
      this.props.updateSelectedArtist(artistId);
    }
  }

  render() {
    const { app, database } = this.props;
    const ARTIST = database.artists[app.selectedArtist];
    const { selectedUnits, selectedUnit } = app;

    const setArtistUnit = (path, shouldReset = true) => {
      this.props.updateCurrentUnit();
      this.props.history.push(`/${path}`);
      this.props.updateLatestUnits();
      this.props.updateShouldReset(shouldReset);
    };

    if (ARTIST === undefined) {
      return (
        <section className="container">
          <h1>Artist Page</h1>
          <p>No artist has been selected. Go to the <Link to="/artists">Artists Page</Link> and select a group.</p>
        </section>
      );
    }

    let unitSongs;
    if (selectedUnit && app.songsPerUnit[selectedUnit.id]) {
      unitSongs = app.songsPerUnit[selectedUnit.id];
    }

    const handleSongClick = (e) => {
      // Get id of the closest tr element
      const songId = unitSongs[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))];
      console.log(songId);
      // Set unit, push history and update latest
      setArtistUnit('distribute', false);

      // props.history.push(`/distribute`);
    };

    return (
      <section className="container">
        <h1>Artist Page: {ARTIST.name}</h1>
        <p><b>Genre:</b> {ARTIST.genre}</p>
        <p><b>Members:</b>
          {
            ARTIST.allMembersId.map((memberId) => {
              const member = database.members[memberId];
              const key = `member-${member.name}`;
              return (
                <span key={key} className={`member-list-item color-${member.colorId}`}>
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
                  className={`tab ${+app.artistPageTab === id ? 'selected' : ''}`}
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
              </h3>
              <h3>Members:</h3>
              <div className="unit-members">
                {
                  selectedUnit.members.map(memberId => (
                    <Member
                      key={memberId}
                      memberId={memberId}
                      props={this.props}
                    />
                  ))
                }
              </div>
              <h3>Songs:</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Lyrics</th>
                    <th>Distribution</th>
                  </tr>
                </thead>
                <tbody onClick={(e) => handleSongClick(e)}>
                  {
                    unitSongs && unitSongs.map((songId) => {
                      const song = database.songs[songId];
                      let type = 'Official';
                      if (song.type === 'would') {
                        type = `Originally by ${song.originalArtist}`;
                      } else if (song.type === 'should') {
                        type = "How it should've been";
                      }

                      return (
                        <tr key={songId}>
                          <td>{song.title}</td>
                          <td>{type}</td>
                          <td>
                            {
                              song.lyrics ?
                                <img className="icon icon-tab" src={iconYes} alt="Yes" />
                                :
                                <img className="icon icon-tab" src={iconNo} alt="No" />
                            }
                          </td>
                          <td>
                            {
                              song.distribution ?
                                <img className="icon icon-tab" src={iconYes} alt="Yes" />
                                :
                                <img className="icon icon-tab" src={iconNo} alt="No" />
                            }
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </section>
          ) : (
            <p>Select a unit tab above.</p>
          )
        }
      </section>
    );
  }
};

export default Artist;

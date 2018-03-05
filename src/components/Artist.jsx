import React from 'react';
import { Link } from 'react-router-dom';

import Member from './Member';
import iconOfficial from '../images/icon-official.svg';

const Artist = (props) => {
  const { app, database } = props;
  const ARTIST = database.artists[app.selectedArtist];
  const { selectedUnits, selectedUnit } = app;

  const setArtistUnit = (path) => {
    props.updateCurrentUnit();
    props.history.push(`/${path}`);
    props.updateLatestUnits();
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
      <ul className="tabs" onClick={props.switchUnitsTab}>
        {
          Object.keys(selectedUnits).map((unit) => {
            const { name, id, official } = selectedUnits[unit];
            return (
              <li
                key={`tab-${name}`}
                className={`tab ${+app.artistPageTab === id ? 'selected' : ''}`}
                id={id}
                onClick={() => props.updateSelectedUnit(id)}
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
                    props={props}
                  />
                ))
              }
            </div>
            <h3>Songs:</h3>
            <div className="unit-songs">
              {
                unitSongs && unitSongs.map(songId => (
                  <p key={songId}>{database.songs[songId].title}</p>
                ))
              }
            </div>
          </section>
        ) : (
          <p>Select a unit tab above.</p>
        )
      }
    </section>
  );
};

export default Artist;

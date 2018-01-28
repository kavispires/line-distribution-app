import React from 'react';
import { Link } from 'react-router-dom';

import Member from './Member';
import iconOfficial from '../images/icon-official.svg';

const Artist = (props) => {
  const { app, database } = props;
  const ARTIST = database.artists[app.currentArtist];
  const { currentUnits, currentUnit } = app;
  console.log(ARTIST);
  console.log(currentUnit);
  console.log(props);

  if (ARTIST === undefined) {
    return (
      <section className="container">
        <h1>Artist Page</h1>
        <p>No artist has been selected. Go to the <Link to="/artists">Artists Page</Link> and select a group.</p>
      </section>
    );
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
          Object.keys(currentUnits).map((unit) => {
            const { name, id, official } = currentUnits[unit];
            return (
              <li
                key={`tab-${name}`}
                className={`tab ${app.artistPageTab == id ? 'selected' : ''}`}
                id={id}
                onClick={() => props.updateCurrentUnit(id)}
              >
                {name} <img className="icon icon-tab" src={iconOfficial} alt="Official" />
              </li>
            );
          })
        }
      </ul>
      {
        currentUnit && currentUnit.id ? (
          <section className="unit-content">
            <h3>Debut: {currentUnit.debutYear}</h3>
            <h3>
              Options:
              <button className="btn btn-inline" onClick={() => props.history.push('/distribute')}>Distribute</button>
              <button className="btn btn-inline" onClick={() => props.history.push('/lyrics')}>Lyrics</button>
            </h3>
            <h3>Members:</h3>
            <div className="unit-members">
              {
                currentUnit.members.map(memberId => (
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
                currentUnit.songs.map(song => (
                  <p>Song Title</p>
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

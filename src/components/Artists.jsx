import React from 'react';

import { ARTITST_PLACEHOLDER } from '../constants';

const Artists = (props) => {
  const { app, database } = props;
  const ARTISTS = database.artists;
  const { artistList } = app;
  const currentBand = app.currentBand ? ARTISTS[app.currentBand] : ARTITST_PLACEHOLDER;

  const handleArtistClick = (e) => {
    props.updateSelectedArtist(e);
    props.history.push('/artist');
  }

  return (
    <section className="container">
      <h1>Artists</h1>
      <p>Current Band: {currentBand.name}</p>
      <input className="search-bar" type="text" placeholder="Filter..." onChange={props.filter} />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Units</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody onClick={(e) => handleArtistClick(e)}>
          {
            artistList.length > 0 ?
            artistList.map(index => (
              <tr key={index}>
                <td>{ARTISTS[index].name}</td>
                <td>{ARTISTS[index].genre}</td>
                <td>{ARTISTS[index].units.length}</td>
                <td>{ARTISTS[index].allMembers.join(', ')}</td>
              </tr>
            ))
            :
            <tr><td>No artists available within your search</td></tr>
          }
        </tbody>
      </table>
    </section>
  );
};

export default Artists;

import React from 'react';

import { ARTITST_PLACEHOLDER } from '../constants';

const Artists = (props) => {
  const allArtist = props.app.artists;
  const artistList = props.app.artistList;
  const currentBand = props.app.currentBand ? allArtist[props.app.currentBand] : ARTITST_PLACEHOLDER;

  return (
    <section className="container">
      <h1>Artists</h1>
      <p>Current Band: {currentBand.bandName}</p>
      <input className="search-bar" type="text" placeholder="Filter..." onChange={props.filter} />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Size</th>
            <th>Members</th>
          </tr>
         </thead>
         <tbody onClick={(e) => props.updateCurrentBand(e)}>
        {
          artistList.length > 0 ?
          artistList.map(index => (
            <tr key={index}>
              <td>{allArtist[index].bandName}</td>
              <td>{allArtist[index].genre}</td>
              <td>{`${allArtist[index].members.length} members`}</td>
              <td>{allArtist[index].members.join(', ')}</td>
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

import React from 'react';

const Artists = (props) => {
  const artist = props.app.artists;
  const artistList = props.app.artistList;

  return (
    <section className="container">
      <h1>Artists</h1>
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
              <td>{artist[index].bandName}</td>
              <td>{artist[index].genre}</td>
              <td>{`${artist[index].members.length} members`}</td>
              <td>{artist[index].members.join(', ')}</td>
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

import React from 'react';

const Artists = (props) => {
	const artist = props.app.artists;
	const artistList = props.app.artistList;

  return (
    <div className="container">
      <h1>Artists</h1>
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
			  	artistList.map(index => (
			  		<tr key={index}>
				    	<td>{artist[index].bandName}</td>
				    	<td>{artist[index].genre}</td>
				    	<td>{`${artist[index].members.length} members`}</td>
				    	<td>{artist[index].members.join(', ')}</td>
				  	</tr>
			  	))
			  }
				 </tbody>
      </table>
    </div>
    );
};

export default Artists;

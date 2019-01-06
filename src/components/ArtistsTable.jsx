import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import shared components
import FavoriteIcon from './shared/FavoriteIcon';

class ArtistsTable extends Component {
  componentDidMount() {
    // nothing
  }
  render() {
    console.log(this.props);
    return <h1>Bola</h1>;
  }
}

// const ArtistsTable = props => {
//   const { artists, searchQuery, rowAction } = props;
//   // Filter table rows based on searchQuery
//   let filteredArtists = artists;
//   if (searchQuery && filteredArtists[0].query) {
//     filteredArtists = _.filter(artists, o => o.query.includes(searchQuery));
//   }

//   // Message to be display when table has no rows
//   const emptyTableMessage =
//     searchQuery.length > 0
//       ? 'No artists available within your search'
//       : 'No artists available';

//   const user = { favoriteArtists: {} };
//   console.log(props);

//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th />
//           <th>Name</th>
//           <th>Genre</th>
//           <th>Units</th>
//           <th>Members</th>
//         </tr>
//       </thead>
//       <tbody onClick={rowAction}>
//         {filteredArtists.length > 0 ? (
//           filteredArtists.map(entry => {
//             return (
//               <tr key={`all-artists-${entry.id}`} id={`a-${entry.id}`}>
//                 <td className="favorite">
//                   <FavoriteIcon
//                     action={props.updateFavoriteArtists}
//                     id={entry.id}
//                     size="12"
//                     state={
//                       user.favoriteArtists && user.favoriteArtists[entry.id]
//                     }
//                   />
//                 </td>
//                 <td>{entry.name}</td>
//                 <td>{entry.genre}</td>
//                 <td>{entry.units ? entry.units.length : 0}</td>
//                 <td>{entry.memberList.join(', ')}</td>
//               </tr>
//             );
//           })
//         ) : (
//           <tr>
//             <td colSpan="5">{emptyTableMessage}</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

ArtistsTable.propTypes = {
  artists: PropTypes.array.isRequired,
  searchQuery: PropTypes.string,
  rowAction: PropTypes.func.isRequired,
};

ArtistsTable.defaultProps = {
  searchQuery: '',
};

export default ArtistsTable;

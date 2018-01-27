import BANDS from './bands';
import COLORS from './colors';
import MEMBERS from './members';
import POSITIONS from './positions';
import SONGS from './songs';
import UNITS from './units';

/* SCHEMA
 * Band.hasMany(Unit)
 * Unit.hasMany(Member)
 * Member.hasOne(Color)
 * Member.hasMany(Position)
 * Unit.hasMany(Song)
 * Song.hasOne(Unit)
*/

const DB = {
  BANDS,
  COLORS,
  MEMBERS,
  POSITIONS,
  SONGS,
  UNITS,
};

export default DB;

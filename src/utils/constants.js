const COLORS = {
  col000001: 'red',
  col000002: 'blood',
  col000003: 'coral',
  col000004: 'peach',
  col000005: 'brown',
  col000006: 'orange',
  col000007: 'gold',
  col000008: 'yellow',
  col000009: 'olive',
  col000010: 'lemon',
  col000011: 'lime',
  col000012: 'green',
  col000013: 'basil',
  col000014: 'forest',
  col000015: 'jade',
  col000016: 'teal',
  col000017: 'cyan',
  col000018: 'turquoise',
  col000019: 'navy',
  col000020: 'blue',
  col000021: 'sky',
  col000022: 'purple',
  col000023: 'violet',
  col000024: 'rose',
  col000025: 'mauve',
  col000026: 'magenta',
  col000027: 'jam',
  col000028: 'pink',
  col000029: 'burgundy',
  col000030: 'salmon',
};

const DEFAULT_COLORS = {
  default: '#000000',
  black: '#000000',
  blue: '#598ffd',
  gray: '#707070',
  green: '#49d156',
  orange: '#fea245',
  pink: '#fb9cf0',
  purple: '#9e8ef0',
  red: '#d14949',
  teal: '#34ac9e',
  white: 'FFFFFF',
  yellow: '#ffd700',
};

const FLAGS_LIST = {
  american: 'usa',
  brazilian: 'brazil',
  canadian: 'canada',
  chinese: 'china',
  japanese: 'japan',
  korean: 'korea',
  taiwanese: 'taiwan',
  thai: 'thailand',
};

const GENDERS = {
  FEMALE: 'Female',
  MALE: 'Male',
  UNKOWN: 'Unknown',
};

const GENRES = {
  CPOP: 'C-Pop',
  JPOP: 'J-Pop',
  KPOP: 'K-Pop',
  OTHER: 'Other',
  POP: 'Pop',
};

const GENRES_DB = {
  'C-Pop': 'CPOP',
  'J-Pop': 'JPOP',
  'K-Pop': 'KPOP',
  Other: 'OTHER',
  Pop: 'POP',
};

const POSITIONS_LIST = [
  'MAIN_VOCALIST',
  'MAIN_RAPPER',
  'MAIN_DANCER',
  'LEAD_VOCALIST',
  'LEAD_RAPPER',
  'LEAD_DANCER',
  'VOCALIST',
  'RAPPER',
  'DANCER',
  'LEADER',
  'CENTER',
  'VISUAL',
];

const POSITIONS_LIST_OBJ = {
  MAIN_VOCALIST: 'Main Vocalist',
  LEAD_VOCALIST: 'Lead Vocalist',
  VOCALIST: 'Vocalist',
  MAIN_RAPPER: 'Main Rapper',
  LEAD_RAPPER: 'Lead Rapper',
  RAPPER: 'Rapper',
  MAIN_DANCER: 'Main Dancer',
  LEAD_DANCER: 'Lead Dancer',
  DANCER: 'Dancer',
  LEADER: 'Leader',
  CENTER: 'Center',
  VISUAL: 'Visual',
};

const NATIONALITIES = {
  AMERICAN: 'American',
  BRAZILIAN: 'Brazilian',
  BRITISH: 'British',
  CHINESE: 'Chinese',
  JAPANESE: 'Japanese',
  KOREAN: 'Korean',
  OTHER: 'Other',
  THAI: 'Thai',
  VIETNAMISE: 'Vietnamise',
};

const NATIONALITY_FLAG_URL = '/images/flags/';

const PROFILE_PICTURE_URL = '/images/profiles/';

const YOUTUBE_URLS = ['cudssvDuOpc'];

export default {
  COLORS,
  DEFAULT_COLORS,
  FLAGS_LIST,
  GENDERS,
  GENRES,
  GENRES_DB,
  POSITIONS_LIST,
  POSITIONS_LIST_OBJ,
  NATIONALITIES,
  NATIONALITY_FLAG_URL,
  PROFILE_PICTURE_URL,
  YOUTUBE_URLS,
};

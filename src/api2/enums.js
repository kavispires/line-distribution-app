export const CATEGORY = {
  OFFICIAL: 'OFFICIAL',
  SHOULD: 'SHOULD',
  WOULD: 'WOULD',
};

export const GENDERS = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
  UNKNOWN: 'UNKNOWN',
};

export const GENRES = {
  CPOP: 'C-POP',
  JPOP: 'J-POP',
  KPOP: 'K-POP',
  'C-POP': 'C-POP',
  'J-POP': 'J-POP',
  'K-POP': 'K-POP',
  OTHER: 'OTHER',
  POP: 'POP',
};

export const NATIONALITIES = {
  AMERICAN: 'AMERICAN',
  BRAZILIAN: 'BRAZILIAN',
  BRITISH: 'BrBRITISHitish',
  CANADIAN: 'CANADIAN',
  CHINESE: 'CHINESE',
  INDIAN: 'INDIAN',
  INDONESIAN: 'INDONESIAN',
  FILIPINO: 'FILIPINO',
  JAPANESE: 'JAPANESE',
  KOREAN: 'KOREAN',
  OTHER: 'OTHER',
  TAIWANESE: 'TAIWANESE',
  THAI: 'THAI',
  VIETNAMISE: 'VIETNAMISE',
};

export const POSITIONS = {
  LEADER: 'LEADER',
  MAIN_VOCALIST: 'MAIN_VOCALIST',
  MAIN_RAPPER: 'MAIN_RAPPER',
  MAIN_DANCER: 'MAIN_DANCER',
  LEAD_VOCALIST: 'LEAD_VOCALIST',
  LEAD_RAPPER: 'LEAD_RAPPER',
  LEAD_DANCER: 'LEAD_DANCER',
  VOCALIST: 'VOCALIST',
  RAPPER: 'RAPPER',
  DANCER: 'DANCER',
  CENTER: 'CENTER',
  FACE: 'FACE',
  VISUAL: 'VISUAL',
  MAKNAE: 'MAKNAE',
};

export const UNKNOWN = 'UNKNOWN';

const getEnum = (value = '', library = '') => {
  let result;

  if (value === UNKNOWN) return UNKNOWN;

  switch (library) {
    case 'CATEGORY':
      result = CATEGORY[value];
      break;
    case 'GENDER':
      result = GENDERS[value];
      break;
    case 'GENRE':
      result = GENRES[value];
      break;
    case 'NATIONALITY':
      result = NATIONALITIES[value];
      break;
    case 'POSITIONS':
      result = POSITIONS[value];
      break;
    default:
      throw new Error(`Invalid enum library: ${library}`);
  }

  if (result) {
    return result;
  }
  return UNKNOWN;
};

export default getEnum;

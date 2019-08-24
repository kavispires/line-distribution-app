export const GENDERS = {
  FEMALE: 'Female',
  MALE: 'Male',
  UNKOWN: 'Unknown',
};

export const GENRES = {
  CPOP: 'C-Pop',
  JPOP: 'J-Pop',
  KPOP: 'K-Pop',
  OTHER: 'Other',
  POP: 'Pop',
};

export const ETHNICITIES = {
  AMERICAN: 'American',
  BRAZILIAN: 'Brazilian',
  BRITISH: 'British',
  CANADIAN: 'Canadian',
  CHINESE: 'Chinese',
  INDIAN: 'Indian',
  JAPANESE: 'Japanese',
  KOREAN: 'Korean',
  OTHER: 'Other',
  TAIWANESE: 'Taiwanese',
  THAI: 'Thai',
  VIETNAMISE: 'Vietnamise',
};

export const POSITIONS = {
  LEADER: 'Leader',
  MAIN_VOCALIST: 'Main Vocalist',
  MAIN_RAPPER: 'Main Rapper',
  MAIN_DANCER: 'Main Dancer',
  LEAD_VOCALIST: 'Lead Vocalist',
  LEAD_RAPPER: 'Lead Rapper',
  LEAD_DANCER: 'Lead Dancer',
  VOCALIST: 'Vocalist',
  RAPPER: 'Rapper',
  DANCER: 'Dancer',
  CENTER: 'Center',
  FACE: 'Face of the Group',
  VISUAL: 'Visual',
  MAKNAE: 'Maknae',
};

export const UNKNOWN = 'UNKNOWN';

const getEnum = (value = '', library = '') => {
  let result;

  if (value === UNKNOWN) return UNKNOWN;

  switch (library) {
    case 'GENDER':
      result = GENDERS[value];
      break;
    case 'GENRE':
      result = GENRES[value];
      break;
    case 'ETHNICITY':
      result = ETHNICITIES[value];
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

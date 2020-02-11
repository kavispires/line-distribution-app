/* eslint wrap-iife: 0 */
/* eslint func-names: 0 */

import _ from 'lodash';

/**
 * Parses bem classes accepting two or more arguments
 * @param {String} block
 * @param {String} modifiers
 * @param {String} element
 * @param {Array} extras
 * @returns {string} bem-class
 */
export const bem = (...args) => {
  const block = args[0];
  let modifiers = args[1] || '';
  let element = args[2];
  let extras = args[3] || [];

  const hasBlock = block !== undefined && block !== null && block !== '';
  const hasModifiers =
    modifiers !== undefined &&
    modifiers !== null &&
    modifiers !== '' &&
    modifiers.length > 0;
  const hasElement =
    element !== undefined && element !== null && element !== '';
  const hasExtras =
    extras !== undefined &&
    extras !== null &&
    extras !== '' &&
    extras.length > 0;

  // Prepare modifiers
  if (hasModifiers) {
    if (typeof modifiers === 'string') {
      modifiers = [modifiers];
    }
    modifiers = modifiers.reduce((acc, m) => {
      if (m) {
        acc.push(`--${m}`);
      }
      return acc;
    }, []);
  }
  // Prepare element
  if (hasElement) {
    element = `__${element}`;
  }
  // Prepare Extras
  if (hasExtras) {
    if (typeof extras === 'string') {
      extras = [extras];
    }
  }

  // No Block
  if (!hasBlock) {
    throw new Error('Block string missing');
  }

  let classes = block;

  // Only Modifiers
  if (hasModifiers && !hasElement) {
    modifiers.forEach(m => {
      classes += ` ${block}${m}`;
    });
    classes = classes.trim();
  }

  // Only Element
  if (hasElement && !hasModifiers) {
    classes = ` ${block}${element}`;
    classes = classes.trim();
  }

  // Modifiers and Element
  if (hasElement && hasModifiers) {
    classes += `${element}`;
    modifiers.forEach(m => {
      classes += ` ${block}${element}${m}`;
    });
    classes = classes.trim();
  }

  if (extras.length > 0) {
    classes += ` ${extras.join(' ')}`;
  }

  return classes.trim();
};

/**
 * Loops through members and reassign colors if they are duplicated
 * @param {Array} members
 * @returns {Array} members with unique colors
 */
const ensureColorUniqueness = members => {
  const membersList = _.cloneDeep(members);
  const dict = {};
  const refactoredMembers = [];
  // Loop through members and make color dict
  membersList.forEach(member => {
    const colorId = member.color.id;
    if (dict[colorId] === undefined) {
      dict[colorId] = 1;
    } else {
      dict[colorId] += 1;
    }
  });

  // Loop again and check for uniqueness, unique stays
  membersList.forEach(member => {
    const colorId = member.color.id;
    const altColorId = member.altColor.id;
    if (dict[colorId] > 1) {
      if (dict[altColorId] === undefined) {
        const oldColor = member.color;
        member.color = member.altColor;
        member.altColor = oldColor;
      } else {
        console.warn(`Duplicated color for member ${member.id}`);
      }
    }
    refactoredMembers.push(member);
  });
  return refactoredMembers;
};

const capitalizeWord = (str, separator = ' ') =>
  str
    .toString()
    .split(separator)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(separator);

const spinalCaseWord = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-');

const parseBirthDate = d => {
  const date = `${d}`;
  if (date.length < 5) {
    return date;
  }
  if (date.length === 8) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${month}/${day}/${year}`;
  }
  return '?';
};

const parseBirthdateToInput = (d = 20000101) => {
  const bd = `${d}`;
  return `${bd.substring(0, 4)}-${bd.substring(4, 6)}-${bd.substring(6, 8)}`;
};

const parseResponse = response => {
  function responseParser(obj) {
    return {
      id: obj.id,
      ...obj.attributes,
    };
  }

  // Response has a single object instance without the "data" object
  if (response && response.id && response.attributes) {
    return responseParser(response);
  }

  // Response has a "data" object
  if (response && response.data) {
    response = response.data;

    // If response.data is not an array
    if (response && response.id && response.attributes) {
      return responseParser(response);
    }

    if (Array.isArray(response)) {
      const result = [];
      for (let i = 0; i < response.length; i++) {
        result.push(responseParser(response[i]));
      }
      return result;
    }
  }

  throw new Error('parserResponse failed. Object is not a response');
};

const parseResponseToObject = response => {
  if (response && response.data) {
    response = response.data;

    if (Array.isArray(response)) {
      const result = {};
      for (let i = 0; i < response.length; i++) {
        const instance = response[i];
        result[instance.id] = {
          id: instance.id,
          ...instance.attributes,
        };
      }
      return result;
    }
  }

  throw new Error(
    'parserResponseToObject failed. Object is not an array response'
  );
};

const parseArrayToObject = response => {
  if (response && response.data) {
    response = response.data;

    if (Array.isArray(response)) {
      const result = {};
      for (let i = 0; i < response.length; i++) {
        const instance = response[i];
        result[instance.id] = instance;
      }
      return result;
    }
  }

  throw new Error(
    'parserResponseToObject failed. Object is not an array response'
  );
};

const parseQueryParams = query => {
  if (!query) return null;

  if (query[0] === '?') {
    query = query.substring(1);
  }

  const params = {};
  query.split('&').forEach(item => {
    const pair = item.split('=');
    const key = pair[0];
    if (key) {
      params[key] = pair[1] || null;
    }
  });

  return params;
};

const humanize = (string, option = 'Sentence') => {
  if (typeof string !== 'string') {
    throw new Error('String used in humanize is not a string');
  }

  string = string.toLowerCase();

  // Remove _ or -
  string = string.replace(/([\-|\_])/g, ' '); // eslint-disable-line

  function captalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.substring(1);
  }

  switch (option) {
    case 'Sentence':
      return captalizeFirstLetter(string);
    case 'Capital':
      return string
        .split(' ')
        .map(word => captalizeFirstLetter(word))
        .join(' ');
    default:
      return string;
  }
};

const camelCase = string => {
  if (typeof string !== 'string') {
    throw new Error('String used in humanize is not a string');
  }

  string = string.toLowerCase();

  // Remove _ or -
  string = string.replace(/([\-|\_])/g, ' '); // eslint-disable-line

  return string
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word;
      return word[0].toUpperCase() + word.substring(1);
    })
    .join('');
};

const spiralCase = string => {
  if (typeof string !== 'string') {
    throw new Error('String used in humanize is not a string');
  }

  string = string.toLowerCase();

  // Remove _ or ' ' or :
  return string.replace(/([\-\_\ \:])/g, '-'); // eslint-disable-line
};

const generateAdminCode = (numDigits = 4) => {
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < numDigits; i++) {
    code += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return code;
};

const getColorNumber = (colorId = 'col000000') => Number(colorId.substring(7));

const spiralBirthdate = date => {
  const dateStr = date.toString();
  return `${dateStr.substring(0, 4)}-${dateStr.substring(
    4,
    6
  )}-${dateStr.substring(6)}`;
};

const makePositionsEditable = positions => {
  const result = {};
  positions.forEach(position => {
    const pos = spiralCase(position);
    result[pos] = pos;
  });
  return result;
};

const insertAtCursor = (field, valueToInsert) => {
  if (
    (field.selectionStart || field.selectionStart === 0) &&
    field.selectionStart === field.selectionEnd
  ) {
    const startPos = field.selectionStart;
    const endPos = field.selectionEnd;
    field.value =
      field.value.substring(0, startPos) +
      valueToInsert +
      field.value.substring(endPos, field.value.length);
  }
  return field.value;
};

const getMostImportantPosition = positions => {
  const POSITIONS_IMPORTANT_ORDER = [
    'ALL',
    'NONE',
    'MAIN_VOCALIST',
    'MAIN_RAPPER',
    'MAIN_DANCER',
    'LEAD_VOCALIST',
    'LEAD_RAPPER',
    'LEAD_DANCER',
    'VOCALIST',
    'RAPPER',
    'DANCER',
  ];

  for (let i = 0; i < POSITIONS_IMPORTANT_ORDER.length; i++) {
    if (positions.includes(POSITIONS_IMPORTANT_ORDER[i])) {
      return POSITIONS_IMPORTANT_ORDER[i];
    }
  }

  return 'VOCALIST';
};

const removeSpecialCharacters = str =>
  str.replace(/(\*|★|&| |-|\(|\)|%|\.|')+/g, '');

export default {
  bem,
  camelCase,
  capitalizeWord,
  ensureColorUniqueness,
  generateAdminCode,
  getColorNumber,
  getMostImportantPosition,
  humanize,
  insertAtCursor,
  makePositionsEditable,
  parseBirthDate,
  parseBirthdateToInput,
  parseQueryParams,
  parseArrayToObject,
  parseResponse,
  parseResponseToObject,
  removeSpecialCharacters,
  spiralBirthdate,
  spiralCase,
  spinalCaseWord,
};

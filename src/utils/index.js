/* eslint wrap-iife: 0 */
/* eslint func-names: 0 */

import _ from 'lodash';

/**
 * Parsers bem classes accepting two or more arguments
 * @param {String} block
 * @param {String} modifiers
 * @param {String} element
 * @param {extra} extras
 * @returns {string} bem-class
 */
const bem = (...args) => {
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
    modifiers = modifiers.map(m => `--${m}`);
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
  }

  // Only Element
  if (hasElement && !hasModifiers) {
    classes = ` ${block}${element}`;
  }

  // Modifiers and Element
  if (hasElement && hasModifiers) {
    classes += `${element}`;
    modifiers.forEach(m => {
      classes += ` ${block}${element}${m}`;
    });
  }

  return `${classes} ${extras.join(' ')}`.trim();
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
    const day = date.substring(6);
    return `${month}/${day}/${year}`;
  }
  return '?';
};

const parseResponse = response => {
  const responseParser = obj => {
    return {
      id: obj.id,
      ...obj.attributes,
    };
  };

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

export default {
  bem,
  ensureColorUniqueness,
  capitalizeWord,
  parseBirthDate,
  parseQueryParams,
  parseArrayToObject,
  parseResponse,
  parseResponseToObject,
  spinalCaseWord,
};

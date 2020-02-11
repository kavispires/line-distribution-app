/* eslint arrow-body-style: 0 */

import utils from './utils';

const deserializers = {
  member: {
    put: (data, uid) => {
      // Remove any falsy value
      utils.removeFalsyValues(data);
      // Add user
      data.modifiedBy = uid;
      // Remove id
      delete data.id;
      // Convert birthdate into number
      const year = data.birthdate.substring(0, 4);
      const mouth = data.birthdate.substring(5, 7);
      const day = data.birthdate.substring(8, 10);
      data.birthdate = Number(`${year}${mouth}${day}`);

      return data;
    },
  },

  user: {
    put: (data, _, subRoute) => {
      // Remove any falsy value
      utils.removeFalsyValues(data);

      if (subRoute) {
        return {
          [subRoute]: data,
        };
      }

      return data;
    },
  },
};

/**
 * Deserializes a single entry
 * @category Function
 * @param {object} entity the data entity from the database
 * @param {string} type the deserializer type
 * @param {string} method the method being triggered (post or put)
 * @param {string} subRoute if present, result will be wrapped in this subroute as an object key
 * @returns {object} a deerialized data object
 */
export const deserialize = (
  entity,
  type,
  method = 'post',
  uid = null,
  subRoute = null
) => {
  return deserializers[type][method](entity, uid, subRoute);
};

export default deserialize;

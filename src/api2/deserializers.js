/* eslint arrow-body-style: 0 */

const deserializers = {
  user: {
    put: (data, subRoute) => {
      // Remove any falsy value
      Object.entries(data).forEach(([key, value]) => {
        if (!value) {
          delete data[key];
        }
      });

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
export const deserialize = (entity, type, method = 'post', subRoute = null) => {
  return deserializers[type][method](entity, subRoute);
};

export default deserialize;

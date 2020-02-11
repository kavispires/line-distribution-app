const logCache = {};

/**
 * Logs strings in console only once, caching previously printed strings
 * @param {String} str
 * @returns {undefined}
 */
export const print = str => {
  if (logCache[str] === undefined) {
    console.log(str); // eslint-disable-line
    logCache[str] = true;
  }
};

/**
 * Logs warning strings in console only once, caching previously printed strings
 * @param {String} str
 * @returns {undefined}
 */
export const printWarning = str => {
  if (logCache[str] === undefined) {
    console.warn(str); // eslint-disable-line
    logCache[str] = true;
  }
};

export default {
  print,
  printWarning,
};

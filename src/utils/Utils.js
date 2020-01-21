// import uuid from "uuid";

/* eslint-disable prefer-rest-params */
/* eslint-disable no-undef */
const Utils = {
  title: "task-master-utils",
  STORAGE_URL: "http://storage.basketaway.com"
};

Utils.isProd = function isProd() {
  // check if it production server
  return window.location.hostname.indexOf("basketaway.com") > -1;
};

Utils.isObject = x => x !== null && typeof x === "object";
Utils.isObjEmpty = obj => Utils.isObject(obj) && Object.keys(obj).length === 0;
Utils.isObjValuesEmpty = obj =>
  // eslint-disable-next-line
  !Utils.isObjEmpty(obj) &&
  Object.keys(obj)
    .map(k => obj[k])
    .some(s => s);

Utils.isArray = Array.isArray || (x => x && typeof x.length === "number");

Utils.getIndex = function getIndex(key, value, list) {
  if (!key || !value || !list) return -1;
  if (!Array.isArray(list)) throw new Error("list should be array!");
  for (let i = 0; i < list.length; i += 1) {
    if (list[i][key] && list[i][key] === value) {
      return i;
    }
  }
  return -1;
};

Utils.makeFormFields = function makeFormFields(formFields, file) {
  const formData = new FormData();
  Object.keys(formFields).forEach(key => formData.append(key, formFields[key]));
  formData.append("file", file);

  return formData;
};

Utils.makeQueryString = function makeQueryString(params) {
  let queryString = "";

  Object.keys(params).forEach(key => {
    if (
      params[key] !== null &&
      params[key] !== "" &&
      params[key] !== undefined
    ) {
      let value = params[key];
      if (typeof value === "string") {
        value = encodeURI(value);
      }
      queryString = `${queryString + key}=${value}&`;
    }
  });
  queryString = queryString.slice(0, -1);
  queryString = queryString ? `?${queryString}` : queryString;

  return queryString;
};

Utils.uuid = function uuid() {
  const uniqueId = uuid();
  return uniqueId;
};

Utils.nthOccurOfStr = function nthOccurOfStr(str, pat, nth) {
  if (!str) return -1;
  let i = -1;
  const L = str.length;
  while (i < L && nth > 0) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
    i += 1;
    // eslint-disable-next-line no-param-reassign
    nth -= 1;
  }

  return i;
};

Utils.bytesToSize = function bytesToSize(bytes = 0, unit = "Bytes") {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (sizes.includes(unit)) {
    if (bytes === 0) return `0 ${unit}`;
    // How many times "bytes" should be divided from "unit"
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    // Increased unit index
    const j = i + sizes.indexOf(unit);
    return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[j]}`;
  }
  throw new Error("Unit not matched");
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
Utils.debounce = function debounce(func, wait, immediate) {
  let timeout;

  return function db() {
    const context = this;
    const args = arguments;
    const later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
Utils.throttle = function throttle(func, wait, optionsArg) {
  let options = optionsArg;
  let context;
  let args;
  let result;
  let timeout = null;
  let previous = 0;

  if (!options) options = {};
  const later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      // eslint-disable-next-line no-multi-assign
      context = args = null;
    }
  };

  return function thr() {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      // eslint-disable-next-line no-multi-assign
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

Utils.throttleAsync = function throttleAsync(fn, wait) {
  let lastRun = 0;

  async function throttled(...args) {
    const currentWait = lastRun + wait - Date.now();
    const shouldRun = currentWait <= 0;

    if (shouldRun) {
      lastRun = Date.now();
      return fn(...args);
    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(throttled());
      }, currentWait);
    });
  }

  return throttled;
};

/**
 * Takes an array of functions and composes (inside out)
 * functions taking an output of one function and
 * putting it into another as a input
 * @param {*} funcArr
 */
Utils.compose = (...funcArr) => initVal =>
  funcArr.reduceRight((val, func) => func(val), initVal);

/**
 * Takes array of functions and pipes (sequential)
 * output of one function into another as a input
 * @param {*} funcArr
 */
Utils.pipe = (...funcArr) => initVal =>
  funcArr.reduce((val, func) => func(val), initVal);

Utils.waitFor = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @param {string} str
 * @returns {Boolean}
 */
Utils.isString = function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
};

Utils.sortKeys = function sortKeys(obj, compare) {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.sort(compare);

  keys.forEach(key => {
    newObj[key] = obj[key];
  });
  return newObj;
};

Utils.pick = (obj, props) => {
  const result = {};
  props.forEach(prop => {
    if (obj[prop]) {
      result[prop] = obj[prop];
    }
  });
  return result;
};

/**
 *    NATIVE OVERRIDES
 * */

/* eslint-disable no-extend-native */

Number.prototype.pad = function pad(size) {
  let s = String(this);
  while (s.length < (size || 2)) {
    s = `0${s}`;
  }
  return s;
};

/**
 * returns index of the item whose id is equal to the given id
 * @param { key} - given value
 * @param { value } - given value
 */
Array.prototype.getIndexById = function getIndexById(id) {
  return this.getIndexOf("id", id);
};

/**
 * returns item whose id is equal to the given id
 * @param { key} - given value
 * @param { value } - given value
 */
Array.prototype.getItemById = function getItemById(id) {
  return this.getItemOf("id", id);
};

/**
 * returns item whose value of the key is equal to the given value
 * @param { key} - given value
 * @param { value } - given value
 */
Array.prototype.getItemOf = function getItemOf(key, value) {
  const index = this.getIndexOf(key, value);
  if (index > -1) {
    return this[index];
  }
  return null;
};

/**
 * returns index of the item whose value of the key is equal to the given value
 * @param { key} - given value
 * @param { value } - given value
 */
Array.prototype.getIndexOf = function getIndexOf(key, value) {
  for (let i = 0; i < this.length; i += 1) {
    if (this[i][key] === value) {
      return i;
    }
  }
  return -1;
};

String.prototype.regexIndexOf = function regexIndexOf(regex, startpos) {
  const indexOf = this.substring(startpos || 0).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
};

String.prototype.replaceAt = function replaceAt(index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};
/* eslint-enable no-extend-native */

export default Utils;

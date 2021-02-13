import stores from './index';

let _storesCache = {};

/**
 * Returns the store instance for any model.
 *
 * @param {String} storeName
 */
function getStore (storeName) {
  // unknown store
  if (!stores[storeName]) {
    throw new Error(`Could not get store for ${storeName}. Store not defined.`);
  }

  // if a store is already on the lookup cache return the store
  if (_storesCache[storeName]) {
    return _storesCache[storeName];
  }

  // this is the first time a store is requested
  // create the store
  let Store = stores[storeName],
    storeInstance = new Store();

  // add the store instance to the cache
  _storesCache[storeName] = storeInstance;

  return storeInstance;
}

export { getStore };

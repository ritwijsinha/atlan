import stores from './index';

var app = window.app;

/**
 * Initializes a stores list on `window.app` for lookup.
 *
 * @returns {Object}
 */
function initializeStoreCache () {
  app = app || {};

  // attach stores to pm
  app.stores = {};

  return app.stores;
}

/**
 * Returns the store instance for any model.
 *
 * @param {String} storeName
 */
function getStore (storeName) {
  let _storesCache = app.stores || initializeStoreCache();

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